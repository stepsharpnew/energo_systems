// Логика лендинга ГНБ: опрос, счётчики, ленты, всплывающее окно.
// Запускается из pages/services/hdd.vue после монтирования; cleanup снимает
// слушатели окна и таймеры, чтобы ничего не осталось при уходе со страницы.
export function initHddPage() {
  var ac = new AbortController();
  var timers = [];
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Фоновое видео hero: если автоплей заблокирован — остаётся poster
  var video = document.querySelector('.hero__media video');
  if (video) {
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  /* ============ ЖИВОЙ СТАТУС «НА СВЯЗИ» ============ */
  // рабочие часы с сайта заказчика: Пн–Пт 09:00–18:00 по Москве
  var statusBox = document.querySelector('[data-status-box]');
  if (statusBox) {
    var setStatus = function () {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Moscow', weekday: 'short', hour: '2-digit', hour12: false
      }).formatToParts(new Date());
      var get = function (type) {
        var found = parts.filter(function (x) { return x.type === type; })[0];
        return found ? found.value : '';
      };
      var workday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(get('weekday')) !== -1;
      var hour = parseInt(get('hour'), 10);
      var open = workday && hour >= 9 && hour < 18;
      statusBox.classList.toggle('is-off', !open);
      statusBox.querySelector('[data-status]').textContent =
        open ? 'На связи — ответим за 30 минут' : 'Ответим утром, с 9:00';
    };
    setStatus();
    timers.push(setInterval(setStatus, 60000));
  }

  /* ============ ЛИПКАЯ КНОПКА НА ТЕЛЕФОНЕ ============ */
  var sticky = document.querySelector('[data-sticky]');
  if (sticky) {
    // панель нужна там, где своей кнопки на экране нет
    var ctas = [].slice.call(document.querySelectorAll('.btn-pill, .quiz__nav, .contacts__submit'));
    var ticking = false;
    var syncSticky = function () {
      ticking = false;
      var ctaOnScreen = ctas.some(function (el) {
        var r = el.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && el.offsetParent !== null;
      });
      // на самом верху не выскакиваем: человек только увидел первый экран
      sticky.classList.toggle('is-on', window.scrollY > 300 && !ctaOnScreen);
    };
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(syncSticky);
    };
    window.addEventListener('scroll', onScroll, { passive: true, signal: ac.signal });
    window.addEventListener('resize', onScroll, { signal: ac.signal });
    syncSticky();
  }

  /* ============ КВИЗ ============ */
  var quiz = document.querySelector('[data-quiz]');
  if (quiz) initQuiz(quiz);

  function initQuiz(root) {
    var form = root.querySelector('form');
    var steps = [].slice.call(root.querySelectorAll('[data-step]'));
    var result = root.querySelector('[data-result]');
    var bar = root.querySelector('.quiz__bar');
    var progress = root.querySelector('.quiz__progress');
    var cur = root.querySelector('[data-cur]');
    var back = root.querySelector('[data-back]');
    var next = root.querySelector('[data-next]');
    var nextLabel = root.querySelector('[data-next-label]');
    var msgOut = root.querySelector('[data-msg-out]');
    var total = steps.length;
    var index = 0;
    var typingTimer;

    root.querySelector('[data-total]').textContent = total;

    function say(text) {
      clearTimeout(typingTimer);
      if (reduced) { msgOut.textContent = text; return; }
      msgOut.classList.add('is-typing');
      msgOut.textContent = '';
      var dots = root.querySelector('[data-typing-tpl]').cloneNode(true);
      dots.hidden = false;
      dots.removeAttribute('data-typing-tpl');
      msgOut.appendChild(dots);
      typingTimer = setTimeout(function () {
        msgOut.classList.remove('is-typing');
        msgOut.textContent = text;
      }, 600);
    }

    function setProgress(pct) {
      bar.style.width = pct + '%';
      progress.setAttribute('aria-valuenow', pct);
    }

    function stepValid(step) {
      var type = step.dataset.type;
      if (type === 'form') return true; // форма проверяется при отправке
      return !!step.querySelector('input:checked');
    }

    function show(i, focus) {
      steps.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
      result.classList.remove('is-active');
      root.classList.remove('is-done');
      index = i;
      cur.textContent = i + 1;
      back.hidden = i === 0;
      nextLabel.textContent = i === total - 1 ? 'Получить расчёт' : 'Далее';
      next.disabled = !stepValid(steps[i]);
      setProgress(Math.round((i + 1) / total * 100));
      say(steps[i].dataset.msg);
      if (focus) steps[i].querySelector('.quiz__q').focus({ preventScroll: true });
    }

    // проколы короче 50 м заказчику невыгодны: предупреждаем, но опрос не прерываем
    var isSmall = false;
    form.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === 'length') {
        isSmall = t.hasAttribute('data-small');
        if (isSmall) say('Минимальный заказ у нас — от 50 метров. Заявку оставляйте: если объём вырастет или рядом есть ещё участки, посчитаем вместе.');
      }
      if (index < total) next.disabled = !stepValid(steps[index]);
    });

    back.addEventListener('click', function () {
      if (index > 0) show(index - 1, true);
    });

    // Переход по кнопке, а не через submit: в изолированных рамках (sandbox без allow-forms)
    // браузер блокирует отправку формы и событие submit не приходит
    form.addEventListener('submit', function (e) { e.preventDefault(); goNext(); });
    next.addEventListener('click', goNext);
    form.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || e.target.tagName === 'BUTTON' || e.target.tagName === 'A') return;
      e.preventDefault();
      if (!next.disabled) goNext();
    });

    function goNext() {
      if (root.classList.contains('is-done') || next.disabled) return;
      if (!stepValid(steps[index])) return;
      if (index < total - 1) { show(index + 1, true); return; }
      if (!validateContacts()) return;

      var payload = collect();
      next.disabled = true;
      submitLead(payload).then(function () { showResult(payload); })
        .catch(function () { next.disabled = false; say('Не получилось отправить заявку. Попробуйте ещё раз или позвоните нам.'); });
    }

    root.querySelector('[data-restart]').addEventListener('click', function () {
      form.reset();
      show(0, true);
    });

    /* --- контакты --- */
    var phone = form.elements.phone;
    phone.addEventListener('input', function () {
      phone.value = maskPhone(phone.value);
      phone.removeAttribute('aria-invalid');
    });
    form.elements.name.addEventListener('input', function () { this.removeAttribute('aria-invalid'); });
    form.elements.address.addEventListener('input', function () { this.removeAttribute('aria-invalid'); });
    form.elements.email.addEventListener('input', function () { this.removeAttribute('aria-invalid'); });
    // оба документа обязательны: согласие на обработку данных и политика
    [form.elements.consent, form.elements.privacy].forEach(function (box) {
      box.addEventListener('change', function () {
        form.querySelector('.field__err--consent').classList.remove('is-shown');
      });
    });

    function validateContacts() {
      var ok = true;
      var name = form.elements.name;
      if (name.value.trim().length < 2) { name.setAttribute('aria-invalid', 'true'); ok = false; }
      if (!validPhone(phone.value)) { phone.setAttribute('aria-invalid', 'true'); ok = false; }
      var address = form.elements.address;
      if (address.value.trim().length < 5) { address.setAttribute('aria-invalid', 'true'); ok = false; }
      // почта необязательная: придираемся, только если её всё-таки ввели
      var mail = form.elements.email;
      if (mail.value.trim() && !validMail(mail.value.trim())) { mail.setAttribute('aria-invalid', 'true'); ok = false; }
      if (!form.elements.consent.checked || !form.elements.privacy.checked) {
        form.querySelector('.field__err--consent').classList.add('is-shown');
        ok = false;
      }
      if (!ok) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
      }
      return ok;
    }

    /* --- сбор ответов --- */
    function collect() {
      var f = form.elements;
      return {
        purpose: [].slice.call(form.querySelectorAll('input[name="purpose"]:checked')).map(function (c) {
          return c.value;
        }),
        length: form.querySelector('input[name="length"]:checked').value,
        diameter: form.querySelector('input[name="diameter"]:checked').value,
        pipes: form.querySelector('input[name="pipes"]:checked').value,
        name: f.name.value.trim(),
        phone: f.phone.value,
        email: f.email.value.trim(),
        address: f.address.value.trim(),
        channel: form.querySelector('input[name="channel"]:checked').value,
        small: isSmall,
        type: 'Опрос по ГНБ: прокол под ключ',
        page: location.href
      };
    }

    function showResult(p) {
      steps.forEach(function (s) { s.classList.remove('is-active'); });
      result.classList.add('is-active');
      root.classList.add('is-done');
      // параметры прокола на экране больше не показываем: они уже ушли в заявку
      result.querySelector('[data-small-note]').hidden = !p.small;
      setProgress(100);
      say('Спасибо, ' + p.name + '! Передал ваш объект инженеру — он свяжется и назовёт стоимость.');
      result.querySelector('.quiz__q').focus({ preventScroll: true });
    }

    show(0, false);
  }

  // Заявки уходят в общий приёмник сайта: POST /api/lead → письмо на sales@e-systems.su.
  // Приёмник принимает строго свой набор полей, поэтому здесь payload формы
  // переводится в его формат. Версия согласия должна совпадать с CONSENT_VERSION
  // в tg_bot/src/server.js — при её смене поправить и тут.
  var LEAD_ENDPOINT = '/api/lead';
  var CONSENT_VERSION = '2026-07-13';

  // приёмник ждёт телефон строго как +7 (999)-000-00-00, у нас на странице пробел
  function apiPhone(value) {
    return String(value || '').replace(') ', ')-');
  }

  function toApiLead(p) {
    var answers = [];
    var add = function (label, value) {
      if (value && value.length) answers.push({ label: label, value: value });
    };
    add('Что прокладываем', p.purpose);
    add('Длина прокола', p.length);
    add('Диаметр трубы или футляра', p.diameter);
    add('Количество труб', p.pipes);
    add('Адрес объекта', p.address);
    add('Как удобнее связаться', p.channel);
    if (p.small) answers.push({ label: 'Отметка', value: 'Объём меньше 50 метров' });

    var body = {
      type: 'service',
      name: p.name,
      contact: apiPhone(p.phone),
      // куда смотреть менеджеру: опрос, кнопка расценок, форма в контактах
      service: p.type || 'Опрос по ГНБ',
      consent: true,
      consentVersion: CONSENT_VERSION
    };
    if (p.email) body.email = p.email;
    if (p.task) body.comment = p.task;
    if (answers.length) body.answers = answers;
    return body;
  }

  function submitLead(payload) {
    return fetch(LEAD_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toApiLead(payload))
    }).then(function (r) {
      if (!r.ok) throw new Error('Сервер ответил ' + r.status);
    });
  }

  // маска телефона — общая для квиза и окна «Заказать звонок»
  function maskPhone(v) {
    var d = v.replace(/\D/g, '');
    if (d[0] === '8') d = '7' + d.slice(1);
    if (d[0] !== '7') d = '7' + d;
    d = d.slice(0, 11);
    var out = '+7';
    if (d.length > 1) out += ' (' + d.slice(1, 4);
    if (d.length >= 4) out += ')';
    if (d.length > 4) out += ' ' + d.slice(4, 7);
    if (d.length > 7) out += '-' + d.slice(7, 9);
    if (d.length > 9) out += '-' + d.slice(9, 11);
    return out;
  }

  function validPhone(v) { return v.replace(/\D/g, '').length === 11; }
  function validMail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  /* ============ ОКНО «ЗАКАЗАТЬ ЗВОНОК» ============ */
  var modal = document.querySelector('[data-callback]');
  if (modal) initCallback(modal);

  function initCallback(root) {
    var form = root.querySelector('[data-callback-form]');
    var done = root.querySelector('[data-callback-done]');
    var nameInput = form.elements.cbname;
    var phoneInput = form.elements.cbphone;
    var consent = form.elements.cbconsent;
    var privacy = form.elements.cbprivacy;
    var consentErr = form.querySelector('.field__err--consent');
    var titleEl = root.querySelector('.modal__title');
    var leadEl = root.querySelector('.modal__lead');
    var submitBtn = form.querySelector('.modal__submit');
    var defTitle = titleEl.textContent;
    var defLead = leadEl.textContent;
    var lastFocus = null;
    var source = 'Заказать звонок';

    // одно окно на все кнопки: подписи и источник заявки приходят из атрибутов кнопки
    function open(btn) {
      lastFocus = document.activeElement;
      titleEl.textContent = (btn && btn.getAttribute('data-cb-title')) || defTitle;
      leadEl.textContent = (btn && btn.getAttribute('data-cb-lead')) || defLead;
      source = (btn && btn.getAttribute('data-cb-title')) || defTitle;
      // после отправки форма пряталась насовсем — возвращаем её при каждом открытии
      form.hidden = false;
      done.hidden = true;
      submitBtn.disabled = false;
      root.hidden = false;
      document.body.classList.add('is-locked');
      nameInput.focus();
    }
    function close() {
      root.hidden = true;
      document.body.classList.remove('is-locked');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    [].slice.call(document.querySelectorAll('[data-callback-open]')).forEach(function (btn) {
      btn.addEventListener('click', function () { open(btn); });
    });
    [].slice.call(root.querySelectorAll('[data-callback-close]')).forEach(function (btn) {
      btn.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !root.hidden) close();
    }, { signal: ac.signal });

    phoneInput.addEventListener('input', function () {
      phoneInput.value = maskPhone(phoneInput.value);
      phoneInput.removeAttribute('aria-invalid');
    });
    nameInput.addEventListener('input', function () { this.removeAttribute('aria-invalid'); });
    [consent, privacy].forEach(function (box) {
      box.addEventListener('change', function () { consentErr.classList.remove('is-shown'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      if (nameInput.value.trim().length < 2) { nameInput.setAttribute('aria-invalid', 'true'); ok = false; }
      if (!validPhone(phoneInput.value)) { phoneInput.setAttribute('aria-invalid', 'true'); ok = false; }
      if (!consent.checked || !privacy.checked) { consentErr.classList.add('is-shown'); ok = false; }
      if (!ok) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      submitBtn.disabled = true;
      submitLead({
        type: source,
        name: nameInput.value.trim(),
        phone: phoneInput.value,
        page: location.href
      }).then(function () {
        form.hidden = true;
        done.hidden = false;
      }).catch(function () { submitBtn.disabled = false; });
    });
  }

  /* ============ ФОРМА В КОНТАКТАХ ============ */
  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) initContactForm(contactForm);

  function initContactForm(form) {
    var nameInput = form.elements.ctname;
    var phoneInput = form.elements.ctphone;
    var task = form.elements.cttask;
    var consent = form.elements.ctconsent;
    var privacy = form.elements.ctprivacy;
    var consentErr = form.querySelector('.field__err--consent');
    var submitBtn = form.querySelector('.contacts__submit');
    var done = form.querySelector('[data-contact-done]');

    phoneInput.addEventListener('input', function () {
      phoneInput.value = maskPhone(phoneInput.value);
      phoneInput.removeAttribute('aria-invalid');
    });
    nameInput.addEventListener('input', function () { this.removeAttribute('aria-invalid'); });
    [consent, privacy].forEach(function (box) {
      box.addEventListener('change', function () { consentErr.classList.remove('is-shown'); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      if (nameInput.value.trim().length < 2) { nameInput.setAttribute('aria-invalid', 'true'); ok = false; }
      if (!validPhone(phoneInput.value)) { phoneInput.setAttribute('aria-invalid', 'true'); ok = false; }
      if (!consent.checked || !privacy.checked) { consentErr.classList.add('is-shown'); ok = false; }
      if (!ok) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      submitBtn.disabled = true;
      submitLead({
        type: 'Форма в контактах',
        name: nameInput.value.trim(),
        phone: phoneInput.value,
        task: task.value.trim(),
        page: location.href
      }).then(function () {
        // поля прячем, подтверждение показываем на их месте
        [].slice.call(form.querySelectorAll('.field, .consents, .contacts__submit, .contacts__note'))
          .forEach(function (el) { el.hidden = true; });
        consentErr.classList.remove('is-shown');
        done.hidden = false;
      }).catch(function () { submitBtn.disabled = false; });
    });
  }

  /* ============ ЛЕНТА КЕЙСОВ НА ТЕЛЕФОНЕ ============ */
  var projRow = document.querySelector('.projects');
  var projDots = document.querySelector('[data-proj-dots]');
  if (projRow && projDots) {
    var dots = [].slice.call(projDots.children);
    var pTicking = false;
    var syncDots = function () {
      pTicking = false;
      var step = projRow.scrollWidth / dots.length;
      var k = Math.min(dots.length - 1, Math.round(projRow.scrollLeft / step));
      dots.forEach(function (d, i) { d.classList.toggle('is-on', i === k); });
    };
    projRow.addEventListener('scroll', function () {
      if (pTicking) return;
      pTicking = true;
      requestAnimationFrame(syncDots);
    }, { passive: true });
  }

  /* ============ ЛЕНТА КАДРОВ СО СТРЕЛКАМИ ============ */
  var shots = document.querySelector('[data-shots]');
  if (shots) {
    var prev = document.querySelector('[data-shots-prev]');
    var next = document.querySelector('[data-shots-next]');
    var sTicking = false;
    var syncShots = function () {
      sTicking = false;
      var max = shots.scrollWidth - shots.clientWidth;
      prev.disabled = shots.scrollLeft < 8;
      next.disabled = shots.scrollLeft > max - 8;
    };
    var stepBy = function (dir) {
      var card = shots.querySelector('.shot');
      if (!card) return;
      // листаем ровно на ширину видимой части: три кадра за раз
      shots.scrollBy({ left: dir * shots.clientWidth, behavior: reduced ? 'auto' : 'smooth' });
    };
    prev.addEventListener('click', function () { stepBy(-1); });
    next.addEventListener('click', function () { stepBy(1); });
    shots.addEventListener('scroll', function () {
      if (sTicking) return;
      sTicking = true;
      requestAnimationFrame(syncShots);
    }, { passive: true });
    window.addEventListener('resize', syncShots, { signal: ac.signal });
    syncShots();
  }

  /* ============ ЭТАПЫ «КАК РЕШАЕМ» ============ */
  var stepsSec = document.querySelector('.steps');
  if (stepsSec) initSteps(stepsSec);

  function initSteps(sec) {
    var line = sec.querySelector('.steps__line');
    var nodes = [].slice.call(sec.querySelectorAll('.steps__line i'));
    var cols = sec.querySelector('.steps__cols');
    var items = [].slice.call(sec.querySelectorAll('.step'));
    var canHover = window.matchMedia('(hover: hover)').matches;

    // подсветить линию до этапа n (1..5); n = 0 — вся линия, без выделения
    function highlight(n) {
      line.style.setProperty('--fill', n ? ((n - 1) / 5 + 0.1).toFixed(3) : 1);
      line.classList.toggle('is-hovering', !!n);
      nodes.forEach(function (node, k) {
        node.classList.toggle('is-on', !n || k < n);
        node.classList.toggle('is-cur', k === n - 1);
      });
    }

    // появление при прокрутке: узлы загораются по очереди вслед за линией
    if (!reduced && 'IntersectionObserver' in window) {
      var stage = sec.querySelector('.steps__stage');
      sec.classList.add('is-armed');
      nodes.forEach(function (n) { n.classList.remove('is-on'); });

      var revealed = false;
      var reveal = function () {
        if (revealed) return;
        revealed = true;
        sec.classList.add('is-in');
        nodes.forEach(function (n, k) {
          setTimeout(function () { if (!line.classList.contains('is-hovering')) n.classList.add('is-on'); }, 240 * k);
        });
      };

      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        reveal();
      }, { threshold: 0.3 });
      io.observe(stage);

      // страховка: в фоновых вкладках наблюдатель может не сработать, и тогда
      // линия осталась бы пустой, а подписи этапов — размытыми
      var onScrollSteps = function () {
        var r = stage.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
          reveal();
          window.removeEventListener('scroll', onScrollSteps);
        }
      };
      window.addEventListener('scroll', onScrollSteps, { passive: true, signal: ac.signal });
      onScrollSteps();
    } else {
      highlight(0);
    }

    /* Телефон: этапы подсвечиваются по очереди при прокрутке.
       На узком экране таймлайн вертикальный, наведения нет — без этого пять этапов
       выглядели одинаково мёртвыми. Ведём заливку линии и отмечаем текущий этап. */
    var narrow = window.matchMedia('(max-width: 768px)');
    var vTicking = false;
    function syncVertical() {
      vTicking = false;
      if (!narrow.matches || reduced) {
        sec.classList.remove('is-live');
        items.forEach(function (i) { i.classList.remove('is-cur', 'is-seen'); });
        cols.style.removeProperty('--vfill');
        return;
      }
      var mid = window.innerHeight * 0.45;
      var cur = -1;
      items.forEach(function (item, k) {
        var r = item.getBoundingClientRect();
        if (r.top <= mid) cur = k;
      });
      var box = cols.getBoundingClientRect();
      var live = box.top < window.innerHeight && box.bottom > 0;
      sec.classList.toggle('is-live', live && cur >= 0);
      items.forEach(function (item, k) {
        item.classList.toggle('is-seen', k <= cur);
        item.classList.toggle('is-cur', k === cur);
      });
      cols.style.setProperty('--vfill', cur < 0 ? 0 : ((cur + 1) / items.length).toFixed(3));
    }
    var onScrollV = function () {
      if (vTicking) return;
      vTicking = true;
      requestAnimationFrame(syncVertical);
    };
    window.addEventListener('scroll', onScrollV, { passive: true, signal: ac.signal });
    window.addEventListener('resize', onScrollV, { signal: ac.signal });
    syncVertical();

    items.forEach(function (item, k) {
      if (canHover) {
        item.addEventListener('mouseenter', function () { highlight(k + 1); });
      }
      item.addEventListener('focus', function () { highlight(k + 1); });
      // тач-экраны: подсветка по нажатию, повторное нажатие снимает
      item.addEventListener('click', function () {
        if (canHover) return;
        var on = !item.classList.contains('is-active');
        items.forEach(function (i) { i.classList.remove('is-active'); });
        item.classList.toggle('is-active', on);
        cols.classList.toggle('has-active', on);
        highlight(on ? k + 1 : 0);
      });
    });
    cols.addEventListener('mouseleave', function () { if (canHover) highlight(0); });
    cols.addEventListener('focusout', function (e) {
      if (!cols.contains(e.relatedTarget)) highlight(0);
    });
  }

  /* ============ ЛЕНТА КЛИЕНТОВ ============ */
  var track = document.querySelector('.marquee__track');
  if (track && !reduced) {
    // дублируем содержимое, чтобы translateX(-50%) → 0 шёл без стыка
    [].slice.call(track.children).forEach(function (li) {
      var clone = li.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    // постоянная скорость ~50px/с независимо от количества плиток
    var setDur = function () {
      track.style.setProperty('--marquee-dur', Math.round(track.scrollWidth / 2 / 50) + 's');
    };
    window.addEventListener('load', setDur, { signal: ac.signal });
    setDur();
  }
  return function cleanup() {
    ac.abort();
    timers.forEach(clearInterval);
  };
}

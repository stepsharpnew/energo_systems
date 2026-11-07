// Логика лендинга ГНБ: опрос, счётчики, ленты, всплывающее окно.
// Запускается из pages/services/hdd.vue после монтирования; cleanup снимает
// слушатели окна и таймеры, чтобы ничего не осталось при уходе со страницы.
import { readCallbackPreferences } from '../../lib/browser/callbackPreferences.js'
import { getLeadAttribution } from '../../utils/attribution.js'

export function initHddPage() {
  var ac = new AbortController();
  var timers = [];
  var timeouts = new Set();
  var frames = new Set();
  var observers = [];
  var marqueeClones = [];
  var cleanupTasks = [];

  function listen(target, event, callback, options) {
    target.addEventListener(event, callback, Object.assign({}, options, { signal: ac.signal }));
  }
  function later(callback, delay) {
    var id = setTimeout(function () {
      timeouts.delete(id);
      if (!ac.signal.aborted) callback();
    }, delay);
    timeouts.add(id);
    return id;
  }
  function cancelLater(id) {
    clearTimeout(id);
    timeouts.delete(id);
  }
  function frame(callback) {
    var id = requestAnimationFrame(function () {
      frames.delete(id);
      if (!ac.signal.aborted) callback();
    });
    frames.add(id);
    return id;
  }
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
      frame(syncSticky);
    };
    listen(window, 'scroll', onScroll, { passive: true, signal: ac.signal });
    listen(window, 'resize', onScroll, { signal: ac.signal });
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
      cancelLater(typingTimer);
      if (reduced) { msgOut.textContent = text; return; }
      msgOut.classList.add('is-typing');
      msgOut.textContent = '';
      var dots = root.querySelector('[data-typing-tpl]').cloneNode(true);
      dots.hidden = false;
      dots.removeAttribute('data-typing-tpl');
      msgOut.appendChild(dots);
      typingTimer = later(function () {
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
    listen(form, 'change', function (e) {
      var t = e.target;
      if (t.name === 'length') {
        isSmall = t.hasAttribute('data-small');
        if (isSmall) say('Минимальный заказ у нас — от 50 метров. Заявку оставляйте: если объём вырастет или рядом есть ещё участки, посчитаем вместе.');
      }
      if (index < total) next.disabled = !stepValid(steps[index]);
    });

    listen(back, 'click', function () {
      if (index > 0) show(index - 1, true);
    });

    // Переход по кнопке, а не через submit: в изолированных рамках (sandbox без allow-forms)
    // браузер блокирует отправку формы и событие submit не приходит
    listen(form, 'submit', function (e) { e.preventDefault(); goNext(); });
    listen(next, 'click', goNext);
    listen(form, 'keydown', function (e) {
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

    listen(root.querySelector('[data-restart]'), 'click', function () {
      form.reset();
      show(0, true);
    });

    /* --- контакты --- */
    var phone = form.elements.phone;
    listen(phone, 'input', function () {
      phone.value = maskPhone(phone.value);
      phone.removeAttribute('aria-invalid');
    });
    listen(form.elements.name, 'input', function () { this.removeAttribute('aria-invalid'); });
    listen(form.elements.address, 'input', function () { this.removeAttribute('aria-invalid'); });
    listen(form.elements.email, 'input', function () { this.removeAttribute('aria-invalid'); });
    // оба документа обязательны: согласие на обработку данных и политика
    [form.elements.consent, form.elements.privacy].forEach(function (box) {
      listen(box, 'change', function () {
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
        callbackPreferences: readCallbackPreferences(form),
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
      attribution: getLeadAttribution(),
      type: 'service',
      name: p.name,
      contact: apiPhone(p.phone),
      callbackPreferences: p.callbackPreferences,
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
      if (!r.ok) {
        var error = new Error('Сервер ответил ' + r.status);
        error.status = r.status;
        throw error;
      }
      return r.json();
    }).then(function (result) {
      if (!result || result.ok !== true) throw new Error('Заявка не подтверждена сервером');
      return result;
    });
  }

  function submitErrorMessage(error) {
    return error.status === 429
      ? 'Слишком много попыток. Попробуйте через 15 минут или позвоните нам. Введённые данные сохранены.'
      : 'Не удалось подтвердить отправку заявки. Попробуйте ещё раз или позвоните нам. Введённые данные сохранены.';
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
    var submitError = form.querySelector('[data-submit-error]');
    var defTitle = titleEl.textContent;
    var defLead = leadEl.textContent;
    var lastFocus = null;
    var source = 'Заказать звонок';
    var previousOverflow = '';
    var previousLock = false;
    var lockActive = false;

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
      submitError.hidden = true;
      root.hidden = false;
      if (!lockActive) {
        previousOverflow = document.body.style.overflow;
        previousLock = document.body.classList.contains('is-locked');
        lockActive = true;
      }
      if (!root.open) root.showModal();
      document.body.style.overflow = 'hidden';
      document.body.classList.add('is-locked');
      nameInput.focus();
    }
    function finishClose() {
      root.hidden = true;
      if (lockActive) {
        document.body.style.overflow = previousOverflow;
        if (!previousLock) document.body.classList.remove('is-locked');
        lockActive = false;
      }
      if (lastFocus && lastFocus.isConnected) lastFocus.focus();
    }
    function close() {
      if (root.open) root.close();
      finishClose();
    }
    cleanupTasks.push(close);
    listen(root, 'cancel', function (event) { event.preventDefault(); close(); });
    listen(root, 'close', function () { if (!root.open) finishClose(); });
    // Native modality makes the page inert. Wrap the keyboard edges explicitly
    // as well, so Tab does not leave the document for browser chrome.
    listen(root, 'keydown', function (event) {
      if (event.key !== 'Tab' || !root.open) return;
      var controls = [].slice.call(root.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(function (element) { return element.getClientRects().length > 0; });
      var first = controls[0];
      var last = controls[controls.length - 1];
      if (!first) return;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === root)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    [].slice.call(document.querySelectorAll('[data-callback-open]')).forEach(function (btn) {
      listen(btn, 'click', function () { open(btn); });
    });
    [].slice.call(root.querySelectorAll('[data-callback-close]')).forEach(function (btn) {
      listen(btn, 'click', close);
    });

    listen(phoneInput, 'input', function () {
      phoneInput.value = maskPhone(phoneInput.value);
      phoneInput.removeAttribute('aria-invalid');
    });
    listen(nameInput, 'input', function () { this.removeAttribute('aria-invalid'); });
    [consent, privacy].forEach(function (box) {
      listen(box, 'change', function () { consentErr.classList.remove('is-shown'); });
    });

    listen(form, 'submit', function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;
      submitError.hidden = true;
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
        callbackPreferences: readCallbackPreferences(form, 'cbphone'),
        name: nameInput.value.trim(),
        phone: phoneInput.value,
        page: location.href
      }).then(function () {
        form.hidden = true;
        done.hidden = false;
        done.focus({ preventScroll: true });
      }).catch(function (error) {
        submitBtn.disabled = false;
        submitError.textContent = submitErrorMessage(error);
        submitError.hidden = false;
      });
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
    var submitError = form.querySelector('[data-submit-error]');
    var done = form.querySelector('[data-contact-done]');

    listen(phoneInput, 'input', function () {
      phoneInput.value = maskPhone(phoneInput.value);
      phoneInput.removeAttribute('aria-invalid');
    });
    listen(nameInput, 'input', function () { this.removeAttribute('aria-invalid'); });
    [consent, privacy].forEach(function (box) {
      listen(box, 'change', function () { consentErr.classList.remove('is-shown'); });
    });

    listen(form, 'submit', function (e) {
      e.preventDefault();
      if (submitBtn.disabled) return;
      submitError.hidden = true;
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
        callbackPreferences: readCallbackPreferences(form, 'ctphone'),
        name: nameInput.value.trim(),
        phone: phoneInput.value,
        task: task.value.trim(),
        page: location.href
      }).then(function () {
        // поля прячем, подтверждение показываем на их месте
        [].slice.call(form.querySelectorAll('.field, .callback-preferences, .consents, .contacts__submit, .contacts__note'))
          .forEach(function (el) { el.hidden = true; });
        consentErr.classList.remove('is-shown');
        done.hidden = false;
      }).catch(function (error) {
        submitBtn.disabled = false;
        submitError.textContent = submitErrorMessage(error);
        submitError.hidden = false;
      });
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
    listen(projRow, 'scroll', function () {
      if (pTicking) return;
      pTicking = true;
      frame(syncDots);
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
    listen(prev, 'click', function () { stepBy(-1); });
    listen(next, 'click', function () { stepBy(1); });
    listen(shots, 'scroll', function () {
      if (sTicking) return;
      sTicking = true;
      frame(syncShots);
    }, { passive: true });
    listen(window, 'resize', syncShots, { signal: ac.signal });
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
        if (io) io.disconnect();
        sec.classList.add('is-in');
        nodes.forEach(function (n, k) {
          later(function () { if (!line.classList.contains('is-hovering')) n.classList.add('is-on'); }, 240 * k);
        });
      };

      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        reveal();
      }, { threshold: 0.3 });
      observers.push(io);
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
      listen(window, 'scroll', onScrollSteps, { passive: true, signal: ac.signal });
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
      frame(syncVertical);
    };
    listen(window, 'scroll', onScrollV, { passive: true, signal: ac.signal });
    listen(window, 'resize', onScrollV, { signal: ac.signal });
    syncVertical();

    items.forEach(function (item, k) {
      if (canHover) {
        listen(item, 'mouseenter', function () { highlight(k + 1); });
      }
      listen(item, 'focus', function () { highlight(k + 1); });
      // тач-экраны: подсветка по нажатию, повторное нажатие снимает
      listen(item, 'click', function () {
        if (canHover) return;
        var on = !item.classList.contains('is-active');
        items.forEach(function (i) { i.classList.remove('is-active'); });
        item.classList.toggle('is-active', on);
        cols.classList.toggle('has-active', on);
        highlight(on ? k + 1 : 0);
      });
    });
    listen(cols, 'mouseleave', function () { if (canHover) highlight(0); });
    listen(cols, 'focusout', function (e) {
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
      marqueeClones.push(clone);
      track.appendChild(clone);
    });
    // постоянная скорость ~50px/с независимо от количества плиток
    var setDur = function () {
      track.style.setProperty('--marquee-dur', Math.round(track.scrollWidth / 2 / 50) + 's');
    };
    listen(window, 'load', setDur, { signal: ac.signal });
    setDur();
  }
  return function cleanup() {
    ac.abort();
    timers.forEach(clearInterval);
    timeouts.forEach(clearTimeout);
    frames.forEach(cancelAnimationFrame);
    observers.forEach(function (observer) { observer.disconnect(); });
    marqueeClones.forEach(function (clone) { clone.remove(); });
    cleanupTasks.forEach(function (cleanup) { cleanup(); });
  };
}

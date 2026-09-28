<template>
  <div class="hdd">
  <!-- ============ ШАПКА ============ -->
  <header class="header">
    <div class="header__inner">
      <a class="logo" href="/" aria-label="На главную">
        <img src="/hdd/logo-dark.png" alt="Энергосистемы — эксперты в сфере энергетики" height="38"
             onerror="this.hidden=true;this.nextElementSibling.hidden=false">
        <span class="logo__fallback" hidden>Энергосистемы</span>
      </a>

      <nav class="nav" aria-label="Основное меню">
        <a href="#directions">Направления</a>
        <a href="#solutions">Как решаем</a>
        <a href="#guarantees">Гарантии</a>
        <a href="#projects">Объекты</a>
        <a href="#contacts">Контакты</a>
      </nav>

      <div class="contact">
        <!-- TODO: реальные ссылки на Max и Telegram -->
        <a class="msg msg--max" href="https://max.ru/" aria-label="Написать в Max" target="_blank" rel="noopener">
          <svg viewBox="0 0 100 100" width="16" height="16" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg>
        </a>
        <a class="msg msg--tg" href="https://t.me/" aria-label="Написать в Telegram" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg>
        </a>
        <div class="phone">
          <a class="phone__num" href="tel:+74951780118">+7 (495) 178-01-18</a>
          <a class="phone__num phone__num--second" href="tel:+79251640560">+7 (925) 164-05-60</a>
          <a class="phone__mail" href="mailto:sales@e-systems.su">sales@e-systems.su</a>
          <span class="phone__note" data-status-box><i class="phone__dot" aria-hidden="true"></i><span data-status>Ответим за 30 минут</span></span>
        </div>
      </div>

      <button class="btn-cta" type="button" data-callback-open>Заказать звонок</button>
    </div>
  </header>

  <main>

  <!-- ============ БЛОК 1 — HERO ============ -->
  <section class="hero-wrap" id="directions">
    <div class="hero">
      <div class="hero__media" aria-hidden="true">
        <img src="/hdd/hero-gnb.jpg" alt="" width="1672" height="941" fetchpriority="high">
        <!-- Для видео-фона:
        <video autoplay muted loop playsinline poster="/hdd/hero-gnb.jpg"><source src="/hdd/hero.mp4" type="video/mp4"></video>
        -->
      </div>

      <!-- Захваты: факты с e-systems.su (компания с 2013 года, 5000+ проектов) -->
      <ul class="hero__badges" aria-label="Коротко о нас">
        <li><b>с 2013 года</b> в инженерных сетях</li>
        <li><b>5000+</b> объектов построено</li>
        <li><b>Свой</b> отдел проектирования</li>
      </ul>

      <!-- польза: главное преимущество метода (формулировки с сайта заказчика) -->
      <div class="hero__callout" aria-hidden="true">
        <span class="hero__pulse"></span>
        <div><b>Дорогу не вскрываем</b><span>Движение не останавливаем</span></div>
      </div>

      <div class="hero__content">
        <h1 class="hero__title">
          <span class="h1-line">ГНБ под ключ:</span>
          <span class="h1-line h1-line--accent">прокол под дорогой <span class="nowrap">110–800 мм.</span></span>
          <span class="h1-line h1-line--sub">Связь, газ и электрика — Москва и область</span>
        </h1>

        <div class="hero__aside">
          <p class="hero__lead">Бурим под дорогами и железной дорогой, в плотной застройке, под реками и в парках.</p>

          <ol class="usp">
            <li>Свой отдел проектирования — проект прокола и согласования делаем сами</li>
            <li>Одиночные трубы и пучки до 10 штук, футляры и гильзы</li>
            <li>Подрядчикам и застройщикам: от обследования участка до сдачи объекта</li>
          </ol>

          <!-- срочность; TODO: подтвердить «30 минут» и «выезд в течение суток» для ниши ГНБ -->
          <div class="hero__offer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v5l3 2M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9Z"/></svg>
            <p><b>Расчёт за 30 минут.</b> Выезд инженера на объект — в течение суток</p>
          </div>

          <a class="btn-pill" href="#quiz">
            <span>Рассчитать стоимость прокола</span>
            <span class="btn-pill__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </span>
          </a>
          <p class="hero__note">Пришлите диаметр, длину и адрес — посчитаем без обязательств</p>
        </div>
      </div>

      <div class="trust">
        <div class="trust__label">Нам доверяют:</div>
        <div class="trust__item">
          <span class="trust__logo trust__logo--rosseti"><img src="/hdd/partners/rosseti.png" alt="" decoding="async"></span>
          <div class="trust__text">
            <b>РОССЕТИ</b>
            <span>5000+ объектов спроектировано и построено</span>
          </div>
        </div>
        <div class="trust__item">
          <span class="trust__logo trust__logo--avtodor"><img src="/hdd/partners/avtodor.png" alt="" decoding="async"></span>
          <div class="trust__text">
            <b>АВТОДОР</b>
            <span>ЦКАД: переустройство ТП «Васильково»</span>
          </div>
        </div>
        <div class="trust__item">
          <span class="trust__logo trust__logo--misk"><img src="/hdd/partners/misk.png" alt="" decoding="async"></span>
          <div class="trust__text">
            <b>МИСК</b>
            <span>Электрификация развязки на М-10</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ БЛОК 2 — КВИЗ ============ -->
  <section class="section" id="quiz">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">
          <span class="muted">Четыре вопроса о проколе —</span>
          и подготовим расчёт по вашему объекту
        </h2>
      </div>

      <div class="quiz" data-quiz>
        <form class="quiz__main" novalidate>
          <div class="quiz__progress" role="progressbar" aria-label="Прогресс квиза" aria-valuemin="0" aria-valuemax="100" aria-valuenow="20">
            <span class="quiz__bar" style="width:20%"></span>
          </div>

          <!-- Шаг 1 -->
          <fieldset class="quiz__step is-active" data-step data-type="checkbox"
            data-msg="Отметьте всё, что нужно проложить, — от этого зависят диаметр футляра и схема прокладки.">
            <legend class="quiz__q" tabindex="-1">Что прокладываем?</legend>
            <p class="quiz__hint">Можно выбрать несколько вариантов</p>
            <div class="quiz__opts">
              <label class="opt"><input type="checkbox" name="purpose" value="Связь (кабель)"><span class="opt__ind"></span>Связь (кабель)</label>
              <label class="opt"><input type="checkbox" name="purpose" value="Газ"><span class="opt__ind"></span>Газ</label>
              <label class="opt"><input type="checkbox" name="purpose" value="Электрика (кабель)"><span class="opt__ind"></span>Электрика (кабель)</label>
              <label class="opt"><input type="checkbox" name="purpose" value="Водопровод"><span class="opt__ind"></span>Водопровод</label>
              <label class="opt"><input type="checkbox" name="purpose" value="Канализация"><span class="opt__ind"></span>Канализация</label>
              <label class="opt"><input type="checkbox" name="purpose" value="Футляр или гильза"><span class="opt__ind"></span>Футляр или гильза</label>
            </div>
          </fieldset>

          <!-- Шаг 2 — здесь же фильтр мелких заказов -->
          <fieldset class="quiz__step" data-step data-type="radio"
            data-msg="Длина — главный параметр в смете. На проколах свыше 250 метров тариф за метр ниже.">
            <legend class="quiz__q" tabindex="-1">Какая длина прокола?</legend>
            <div class="quiz__opts">
              <!-- TODO: подтвердить минимальный заказ «от 50 м» — на сайте написано «минимальный заказ уточняется» -->
              <label class="opt"><input type="radio" name="length" value="до 50 м" data-small><span class="opt__ind"></span>До 50 м</label>
              <label class="opt"><input type="radio" name="length" value="50–150 м"><span class="opt__ind"></span>50–150 м</label>
              <label class="opt"><input type="radio" name="length" value="150–250 м"><span class="opt__ind"></span>150–250 м</label>
              <label class="opt"><input type="radio" name="length" value="250–500 м"><span class="opt__ind"></span>250–500 м</label>
              <label class="opt"><input type="radio" name="length" value="свыше 500 м"><span class="opt__ind"></span>Свыше 500 м</label>
            </div>
          </fieldset>

          <!-- Шаг 3 -->
          <fieldset class="quiz__step" data-step data-type="radio"
            data-msg="Если диаметр ещё не определён — не страшно, подберём по типу коммуникации.">
            <legend class="quiz__q" tabindex="-1">Диаметр трубы или футляра?</legend>
            <div class="quiz__opts quiz__opts--compact">
              <label class="opt"><input type="radio" name="diameter" value="110 мм"><span class="opt__ind"></span>110 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="160 мм"><span class="opt__ind"></span>160 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="225 мм"><span class="opt__ind"></span>225 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="315 мм"><span class="opt__ind"></span>315 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="400 мм"><span class="opt__ind"></span>400 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="500 мм"><span class="opt__ind"></span>500 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="630 мм"><span class="opt__ind"></span>630 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="710 мм"><span class="opt__ind"></span>710 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="800 мм"><span class="opt__ind"></span>800 мм</label>
              <label class="opt"><input type="radio" name="diameter" value="пока не знаю"><span class="opt__ind"></span>Пока не знаю</label>
            </div>
          </fieldset>

          <!-- Шаг 4 -->
          <fieldset class="quiz__step" data-step data-type="radio"
            data-msg="В один прокол укладываем от 2 до 10 труб. Пучок считаем отдельно.">
            <legend class="quiz__q" tabindex="-1">Одна труба или пучок?</legend>
            <div class="quiz__opts">
              <label class="opt"><input type="radio" name="pipes" value="Одна труба"><span class="opt__ind"></span>Одна труба</label>
              <label class="opt"><input type="radio" name="pipes" value="Пучок 2–4 трубы"><span class="opt__ind"></span>Пучок 2–4 трубы</label>
              <label class="opt"><input type="radio" name="pipes" value="Пучок 5–10 труб"><span class="opt__ind"></span>Пучок 5–10 труб</label>
              <label class="opt"><input type="radio" name="pipes" value="Пока не решили"><span class="opt__ind"></span>Пока не решили</label>
            </div>
          </fieldset>

          <!-- Шаг 5 — контакты -->
          <fieldset class="quiz__step" data-step data-type="form"
            data-msg="Оставьте контакты и адрес объекта — пришлю расчёт и отвечу на вопросы.">
            <legend class="quiz__q" tabindex="-1">Куда прислать расчёт?</legend>
            <div class="quiz__form">
              <label class="field">
                <span class="field__label">Имя</span>
                <input class="field__input" type="text" name="name" autocomplete="given-name" placeholder="Как к вам обращаться">
                <span class="field__err">Укажите имя</span>
              </label>
              <label class="field">
                <span class="field__label">Телефон</span>
                <input class="field__input" type="tel" name="phone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__">
                <span class="field__err">Проверьте номер телефона</span>
              </label>
              <label class="field">
                <span class="field__label">Почта <i class="field__opt">по желанию</i></span>
                <input class="field__input" type="email" name="email" autocomplete="email" placeholder="пришлём расчёт письмом">
                <span class="field__err">Проверьте адрес почты</span>
              </label>
              <label class="field">
                <span class="field__label">Адрес объекта</span>
                <input class="field__input" type="text" name="address" autocomplete="street-address" placeholder="Город, улица или километр трассы">
                <span class="field__err">Укажите адрес объекта</span>
              </label>
              <div class="field field--wide">
                <span class="field__label" id="channel-label">Как удобнее связаться</span>
                <div class="seg" role="radiogroup" aria-labelledby="channel-label">
                  <label><input type="radio" name="channel" value="Звонок" checked><span><svg class="seg__ico seg__ico--call" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>Звонок</span></label>
                  <label><input type="radio" name="channel" value="Max"><span><i class="seg__ico msg--max" aria-hidden="true"><svg viewBox="0 0 100 100" width="12" height="12" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg></i>Max</span></label>
                  <label><input type="radio" name="channel" value="Telegram"><span><i class="seg__ico msg--tg" aria-hidden="true"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg></i>Telegram</span></label>
                </div>
              </div>
              <!-- Документы — настоящие страницы e-systems.su, открываются в новой вкладке -->
              <div class="consents field--wide">
                <label class="consent">
                  <input type="checkbox" name="consent">
                  <span class="opt__ind"></span>
                  <span>Даю <a href="https://e-systems.su/personal-data-consent" target="_blank" rel="noopener">согласие на обработку персональных данных</a></span>
                </label>
                <label class="consent">
                  <input type="checkbox" name="privacy">
                  <span class="opt__ind"></span>
                  <span>Ознакомлен с <a href="https://e-systems.su/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span>
                </label>
              </div>
              <span class="field__err field__err--consent">Отметьте оба пункта — без них не сможем принять заявку</span>
            </div>
          </fieldset>

          <!-- Результат -->
          <div class="quiz__step quiz__result" data-result>
            <h3 class="quiz__q" tabindex="-1">Ваш прокол</h3>
            <dl class="result">
              <div><dt>Назначение</dt><dd data-r="purpose"></dd></div>
              <div><dt>Длина</dt><dd data-r="length"></dd></div>
              <div><dt>Диаметр</dt><dd data-r="diameter"></dd></div>
              <div><dt>Количество труб</dt><dd data-r="pipes"></dd></div>
            </dl>
            <p class="quiz__hint">Расчёт по вашему объекту пришлём в течение 30 минут.</p>
            <p class="quiz__hint quiz__hint--warn" data-small-note hidden>Минимальный заказ — от 50 метров. Менеджер подскажет, как выгоднее объединить работы.</p>
            <button type="button" class="quiz__restart" data-restart>Пройти заново</button>
          </div>

          <div class="quiz__nav">
            <span class="quiz__count">Шаг: <b data-cur>1</b>/<span data-total>5</span></span>
            <div class="quiz__btns">
              <button type="button" class="quiz__back" data-back aria-label="Назад" hidden>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
              </button>
              <button type="button" class="quiz__next" data-next disabled>
                <span data-next-label>Далее</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
          </div>
        </form>

        <aside class="quiz__side" aria-label="Консультант">
          <div class="mgr">
            <div class="mgr__photo">
              <!-- TODO: фото и имя реального менеджера -->
              <img src="/hdd/manager.jpg" alt="Алексей Смирнов" width="72" height="72">
              <span class="mgr__online" aria-hidden="true"></span>
            </div>
            <div class="mgr__bubble">
              <b class="mgr__name">Алексей Смирнов</b>
              <span class="mgr__role">Инженер ГНБ, Энергосистемы</span>
              <!-- образец «печатает…»: скрипт клонирует его, а не собирает разметку строкой —
                   так точки остаются оформленными и при переносе страницы в Nuxt -->
              <span class="typing" data-typing-tpl aria-hidden="true" hidden><i></i><i></i><i></i></span>
              <p class="mgr__msg" aria-live="polite" data-msg-out>Отметьте всё, что нужно проложить, — от этого зависят диаметр футляра и схема прокладки.</p>
            </div>
          </div>
          <div class="quiz__aside-foot">
            <p class="quiz__aside-lead">Четыре вопроса о проколе — и мы соберём исходные данные для расчёта.</p>
            <p class="quiz__aside-note">Никаких обязательств — просто ориентир по вашему объекту.</p>
            <div class="quiz__msgrs">
              <a class="msg msg--max" href="https://max.ru/" aria-label="Написать в Max" target="_blank" rel="noopener">
          <svg viewBox="0 0 100 100" width="16" height="16" fill="#fff" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg>
              </a>
              <a class="msg msg--tg" href="https://t.me/" aria-label="Написать в Telegram" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg>
              </a>
              <span>или напишите в мессенджер</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>


  <!-- ============ БЛОК 3 — ЛЕНТА КЛИЕНТОВ ============ -->
  <section class="section section--clients" id="clients">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">
          <span class="muted">Нам доверяют лидеры отраслей —</span>
          энергетика, транспорт, связь и девелопмент
        </h2>
      </div>
    </div>

    <!-- TODO: все кейсы электромонтажные — запросить у заказчика объекты именно по ГНБ -->
    <div class="marquee" data-marquee>
      <ul class="marquee__track">
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/rosseti-mr.png" alt=""></span><b>ПАО «Россети Московский регион»</b><span>Благодарность за оперативное восстановление электроснабжения</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/avtodor.png" alt=""></span><b>ГК «Автодор»</b><span>Подготовка территории строительства ЦКАД</span></li>
        <li class="client"><span class="client__logo client__logo--text">МИСК</span><b>АО «МИСК»</b><span>Развязка на М-10 для завода Mercedes-Benz</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/monotek.png" alt=""></span><b>ООО «Монотек Строй»</b><span>Переустройство кабельных сетей 10/0,4 кВ</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/rsv.png" alt=""></span><b>АНО «Россия — страна возможностей»</b><span>2БКТП и сети 0,4 кВ для «Сенежа»</span></li>
        <li class="client"><span class="client__logo client__logo--text">Триумф</span><b>ООО «Триумф»</b><span>ТП и электромонтаж СК «Металлург» к ЧМ-2018</span></li>
        <li class="client"><span class="client__logo client__logo--text">Оптимум</span><b>ООО «Оптимум»</b><span>Электромонтаж СК «Глебовец» к ЧМ-2018</span></li>
        <li class="client"><span class="client__logo client__logo--text">Политехстрой</span><b>АО «Политехстрой»</b><span>Электроснабжение жилого дома, Новые Черёмушки</span></li>
        <li class="client"><span class="client__logo client__logo--text">БарсПром-М</span><b>ООО «БарсПром-М»</b><span>Силовое оборудование и освещение, Капотня</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/gazprom.png" alt=""></span><b>Газпром</b><span>Газовая отрасль</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/rzd.png" alt=""></span><b>РЖД</b><span>Железные дороги</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/rostelecom.png" alt=""></span><b>Ростелеком</b><span>Оператор связи</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/oek.png" alt=""></span><b>ОЭК</b><span>Электросетевая компания Москвы</span></li>
        <li class="client"><span class="client__logo"><img decoding="async" src="/hdd/clients/mosoblenergo.png" alt=""></span><b>Мособлэнерго</b><span>Электросетевая компания Подмосковья</span></li>
      </ul>
    </div>
  </section>

  <!-- ============ БЛОК 4 — КАК РЕШАЕМ ============ -->
  <section class="steps" id="solutions">
    <div class="container">
      <div class="section__head steps__head">
        <div>
          <h2 class="section__title steps__title">Пять шагов от первого выезда до&nbsp;сдачи объекта</h2>
          <p class="steps__lead">Проект, технику и бригаду подбираем под конкретный объект. Состав работ согласуем после осмотра участка.</p>
        </div>
      </div>
    </div>

    <div class="steps__stage">
      <!-- loading="lazy" не ставить: в собранном файле картинка вшита как data-URI и тогда не отрисуется -->
      <img class="steps__photo" src="/hdd/steps-gnb.jpg" alt="" decoding="async" width="1916" height="821">
      <div class="container steps__inner">
        <div class="steps__line" aria-hidden="true"><span class="steps__fill"></span><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i></div>
        <!-- TODO: сроки этапов по ГНБ не подтверждены — оранжевым выделено действие, а не срок -->
        <ol class="steps__cols">
          <li class="step" tabindex="0" data-step-i="1">
            <span class="step__num">01 <span aria-hidden="true">→</span></span><!-- TODO: раскомментировать, если выезд на осмотр участка бесплатный: <em class="step__free">Бесплатно</em> -->
            <p class="step__text"><b>Осмотр участка</b> — действующие коммуникации, грунтовые условия, подъезд техники и площадка под установку.</p>
            <p class="step__get"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><span class="step__get-label">Вы получаете:</span> Смета по вашему объекту</span></p>
            <h3 class="step__title">Выезд</h3>
            <span class="step__sub">Оценка на месте</span>
          </li>
          <li class="step" tabindex="0" data-step-i="2">
            <span class="step__num">02 <span aria-hidden="true">→</span></span>
            <p class="step__text"><b>Траектория бурения</b> — считаем с учётом действующих инженерных сетей. Согласования берём на себя.</p>
            <p class="step__get"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><span class="step__get-label">Вы получаете:</span> Проект прокола и согласования</span></p>
            <h3 class="step__title">Проект</h3>
            <span class="step__sub">Свой отдел</span>
          </li>
          <li class="step" tabindex="0" data-step-i="3">
            <span class="step__num">03 <span aria-hidden="true">→</span></span>
            <p class="step__text"><b>Установка под объект</b> — подбираем ГНБ по диаметру, длине и грунту, формируем бригаду под задачу.</p>
            <p class="step__get"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><span class="step__get-label">Вы получаете:</span> Согласованный состав работ</span></p>
            <h3 class="step__title">Техника</h3>
            <span class="step__sub">Бригада под объект</span>
          </li>
          <li class="step" tabindex="0" data-step-i="4">
            <span class="step__num">04 <span aria-hidden="true">→</span></span>
            <p class="step__text"><b>Пилотное бурение</b>, расширение скважины и протяжка труб. Футляры и гильзы — без вскрытия покрытия.</p>
            <p class="step__get"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><span class="step__get-label">Вы получаете:</span> Труба проложена, покрытие целое</span></p>
            <h3 class="step__title">Бурение</h3>
            <span class="step__sub">Прокол под дорогой</span>
          </li>
          <li class="step" tabindex="0" data-step-i="5">
            <span class="step__num">05</span>
            <p class="step__text"><b>Исполнительная документация</b> — полный пакет по объекту. Дальше гарантийное обслуживание.</p>
            <p class="step__get"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg><span><span class="step__get-label">Вы получаете:</span> Пакет исполнительной документации</span></p>
            <h3 class="step__title">Сдача</h3>
            <span class="step__sub">Документы на руки</span>
          </li>
        </ol>
        <div class="steps__cta">
          <div class="steps__sum">
            <b>Под ключ</b>
            <span>от обследования участка до исполнительной документации</span>
          </div>
          <a class="steps__btn" href="#quiz">Рассчитать прокол
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ БЛОК 5 — УСЛОВИЯ РАБОТ ============ -->
  <section class="section section--band" id="conditions">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">
          <span class="muted">Сложные условия —</span>
          проходим там, где траншею не выкопать
        </h2>
      </div>

      <!-- схема заказчика (сгенерирована по нашему ТЗ, чужих знаков и надписей нет).
           Прежние инлайновые SVG убраны: разрез теперь на одной картинке и читается
           одинаково на компьютере и на телефоне -->
      <div class="scheme">
        <img class="scheme__img" src="/hdd/scheme-gnb.jpg" width="1179" height="445" decoding="async"
             alt="Разрез: буровая установка слева, под дорогой по дуге идёт скважина, расширитель тянет по ней трубу от правого приямка к левому, дорожное полотно остаётся целым, движение не перекрыто">
      </div>

      <div class="cond">
          <div class="cond__item">
            <b class="cond__title">Под автодорогой</b>
            <span class="cond__text">Движение не останавливаем, покрытие не вскрываем</span>
          </div>
          <div class="cond__item">
            <b class="cond__title">Под железной дорогой</b>
            <span class="cond__text">Проходим под путями бестраншейно</span>
          </div>
          <div class="cond__item">
            <b class="cond__title">В плотной застройке</b>
            <span class="cond__text">Работаем в стеснённых условиях, благоустройство не разрываем</span>
          </div>
          <div class="cond__item">
            <b class="cond__title">При действующих сетях</b>
            <span class="cond__text">Траекторию считаем с учётом существующих коммуникаций</span>
          </div>
          <div class="cond__item">
            <b class="cond__title">Под рекой и в парке</b>
            <span class="cond__text">Проходим под водоёмами, лесными и парковыми зонами</span>
          </div>
          <div class="cond__item">
            <b class="cond__title">Труба большого диаметра</b>
            <span class="cond__text">Установку подбираем под диаметр, длину и грунт</span>
          </div>
      </div>

      <div class="vs">
        <div class="vs__col">
          <b class="vs__head">Открытая траншея</b>
          <ul class="vs__list">
            <li>Покрытие вскрывают и потом восстанавливают</li>
            <li>Движение на время работ перекрывают</li>
            <li>Благоустройство разрывают по всей длине</li>
            <li>Грунт вскрыт на всём протяжении трассы</li>
          </ul>
        </div>
        <div class="vs__col vs__col--ours">
          <b class="vs__head">Прокол ГНБ<i class="vs__mark">наш способ</i></b>
          <ul class="vs__list">
            <li>Покрытие остаётся целым</li>
            <li>Движение идёт как обычно</li>
            <li>Благоустройство не трогаем</li>
            <li>Копаем только два приямка по краям</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ БЛОК 7 — РАСЦЕНКИ ============ -->
  <section class="section" id="prices">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">
          <span class="muted">Сколько стоит прокол —</span>
          цена за метр по каждому диаметру
        </h2>
      </div>

      <!-- цены взяты с e-systems.su/services/hdd; TODO: подтвердить, что расценки 2026 года действующие -->
      <div class="price-scroll">
        <table class="price-table" data-price-table>
          <thead>
            <tr><th scope="col">Диаметр трубы</th><th scope="col" data-tier="near">До 250 м</th><th scope="col" data-tier="far">Свыше 250 м</th></tr>
          </thead>
          <tbody>
            <tr data-dia="110"><th scope="row">110 мм</th><td data-tier="near">2 900&nbsp;₽</td><td data-tier="far">2 700&nbsp;₽</td></tr>
            <tr data-dia="160"><th scope="row">160 мм</th><td data-tier="near">3 500&nbsp;₽</td><td data-tier="far">3 100&nbsp;₽</td></tr>
            <tr data-dia="225"><th scope="row">225 мм</th><td data-tier="near">4 500&nbsp;₽</td><td data-tier="far">3 950&nbsp;₽</td></tr>
            <tr data-dia="315"><th scope="row">315 мм</th><td data-tier="near">5 500&nbsp;₽</td><td data-tier="far">5 100&nbsp;₽</td></tr>
            <tr data-dia="400"><th scope="row">400 мм</th><td data-tier="near">8 850&nbsp;₽</td><td data-tier="far">8 000&nbsp;₽</td></tr>
            <tr data-dia="500"><th scope="row">500 мм</th><td data-tier="near">11 350&nbsp;₽</td><td data-tier="far">10 300&nbsp;₽</td></tr>
            <tr data-dia="630"><th scope="row">630 мм</th><td data-tier="near">14 000&nbsp;₽</td><td data-tier="far">12 900&nbsp;₽</td></tr>
            <tr data-dia="710"><th scope="row">710 мм</th><td data-tier="near">20 300&nbsp;₽</td><td data-tier="far">19 200&nbsp;₽</td></tr>
            <tr data-dia="800"><th scope="row">800 мм</th><td data-tier="near">24 000&nbsp;₽</td><td data-tier="far">22 400&nbsp;₽</td></tr>
          </tbody>
        </table>
      </div>
      <p class="price-hint" aria-hidden="true">Листайте таблицу вбок</p>

      <p class="price-legal">Цены за один погонный метр работ, без стоимости трубы. НДС&nbsp;22% включён. Пучок от 2 до 10 труб в один прокол считаем отдельно. Итоговая смета зависит от грунта и условий на объекте.</p>

      <div class="price-excl">
        <b class="price-excl__title">В стоимость не входят</b>
        <ul>
          <li>Перебазировка техники</li>
          <li>Подвоз воды и утилизация бурового раствора</li>
          <li>Обеспечение электроэнергией</li>
          <li>Трубы и их сварка</li>
          <li>ПОДД, временные дороги и площадки</li>
        </ul>
      </div>

      <a class="steps__btn price-cta" href="#quiz">Рассчитать по объекту
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </section>

  <!-- ============ БЛОК 6 — ОБЪЕКТЫ ============ -->
  <section class="section" id="projects">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">
          <span class="muted">Наши проколы —</span>
          в Москве и Московской области
        </h2>
      </div>

      <!-- Место и дата взяты из штампов на самих фотографиях и метаданных.
           TODO: от заказчика — точные адреса, диаметры, длины, заказчики и результат (анкета в корне проекта) -->
      <div class="projects">
        <article class="proj">
          <img class="proj__img" src="/hdd/projects/01.jpg" alt="Зеленоград, 16-й мкр, октябрь 2025" width="600" height="800" decoding="async">
          <div class="proj__body">
            <span class="proj__date">октябрь 2025</span>
            <b class="proj__place">Зеленоград, 16-й мкр</b>
            <span class="proj__hook">Бурим в городской застройке, не вскрывая улицу</span>
          </div>
        </article>
        <article class="proj">
          <img class="proj__img" src="/hdd/projects/02.jpg" alt="Солнечногорск, Поварово, ноябрь 2025" width="600" height="800" decoding="async">
          <div class="proj__body">
            <span class="proj__date">ноябрь 2025</span>
            <b class="proj__place">Солнечногорск, Поварово</b>
            <span class="proj__hook">Своя установка и бригада под конкретный объект</span>
          </div>
        </article>
        <article class="proj">
          <img class="proj__img" src="/hdd/projects/03.jpg" alt="Солнечногорск, декабрь 2025" width="600" height="800" decoding="async">
          <div class="proj__body">
            <span class="proj__date">декабрь 2025</span>
            <b class="proj__place">Солнечногорск</b>
            <span class="proj__hook">Работаем у дороги, не останавливая движение</span>
          </div>
        </article>
      </div>

      <!-- точки показываются только на телефоне, где кейсы листаются лентой -->
      <div class="projects__dots" data-proj-dots aria-hidden="true">
        <i class="is-on"></i><i></i><i></i>
      </div>

      <p class="projects__note">Фотографии с наших выездов. Диаметры, длины и заказчиков добавим после согласования с вами.</p>

      <!-- Лучшие кадры с объектов: без подписей, ничего не утверждаем сверх того, что видно -->
      <div class="shots-wrap">
        <button class="shots__nav shots__nav--prev" type="button" data-shots-prev aria-label="Предыдущие фотографии">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <button class="shots__nav shots__nav--next" type="button" data-shots-next aria-label="Следующие фотографии">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
        </button>
        <div class="shots" data-shots>
        <figure class="shot"><img src="/hdd/shots/01.jpg" alt="Буровая установка на объекте" width="520" height="520" decoding="async"></figure>
        <figure class="shot"><img src="/hdd/shots/02.jpg" alt="Пучок труб в приямке у проезжей части" width="520" height="520" decoding="async"></figure>
        <figure class="shot"><img src="/hdd/shots/03.jpg" alt="Установка на обочине во время работ" width="520" height="520" decoding="async"></figure>
        <figure class="shot"><img src="/hdd/shots/04.jpg" alt="Протяжка труб на объекте" width="520" height="520" decoding="async"></figure>
        <figure class="shot"><img src="/hdd/shots/05.jpg" alt="Протяжка трубы через приямок" width="520" height="520" decoding="async"></figure>
        <figure class="shot"><img src="/hdd/shots/06.jpg" alt="Трубы, уложенные проколом под проездом" width="520" height="520" decoding="async"></figure>
        <figure class="shot"><img src="/hdd/shots/07.jpg" alt="Выход труб из прокола" width="520" height="520" decoding="async"></figure>
          <figure class="shot"><img src="/hdd/shots/08.jpg" alt="Установка и трубы на площадке" width="520" height="520" decoding="async"></figure>
        </div>
      </div>
      <p class="shots__note">С наших объектов в Москве и области</p>

      <button class="steps__btn projects__cta" type="button" data-callback-open
              data-cb-title="Рассчитать по своему объекту"
              data-cb-lead="Пришлите диаметр, длину и адрес — или просто оставьте телефон, спросим сами">
        Рассчитать по своему объекту
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
    </div>
  </section>

  <!-- ============ БЛОК 8 — ГАРАНТИИ ============
       Только подтверждённое с e-systems.su: порядок работ (пилот → расширение → протяжка),
       свой отдел проектирования, подбор установки под объект, реквизиты и офисы.
       TODO от заказчика: срок гарантии, страхование ответственности, СРО, перечень
       закрывающих документов — заказчик решил эти пункты не публиковать. -->
  <section class="section" id="guarantees">
    <div class="container">
      <div class="guar">
        <div class="guar__head">
          <h2 class="section__title guar__title">
            <span class="muted">Отвечаем за результат —</span>
            договором, а не словами
          </h2>
          <p class="guar__lead">Прокол идёт вслепую, рядом с действующими сетями. Вот что мы делаем, чтобы этот риск не стал вашим.</p>
        </div>

        <ol class="risks">
          <li class="risk">
            <span class="risk__num">01</span>
            <b class="risk__fear">Повредите действующие сети</b>
            <span class="risk__answer">Траекторию считаем в своём отделе проектирования — по вашим планам сетей, ещё до выхода техники на участок</span>
          </li>
          <li class="risk">
            <span class="risk__num">02</span>
            <b class="risk__fear">Уйдёте от проектной траектории</b>
            <span class="risk__answer">Бурим в три такта: пилот, расширение, протяжка. Отклонение видно на пилотной скважине — до того, как в неё пойдёт труба</span>
          </li>
          <li class="risk">
            <span class="risk__num">03</span>
            <b class="risk__fear">Работы встанут из-за грунта</b>
            <span class="risk__answer">Установку и состав бригады подбираем под грунт конкретного участка, а не под средний по области</span>
          </li>
          <li class="risk">
            <span class="risk__num">04</span>
            <b class="risk__fear">Бросите объект на полпути</b>
            <span class="risk__answer">Цена за метр закреплена в договоре, объект от пилота до сдачи ведёт одна бригада</span>
          </li>
        </ol>

        <div class="guar__foot">
          <dl class="legal">
            <div class="legal__item">
              <dt>Работаем как юрлицо</dt>
              <dd>ООО «Энергосистемы», договор и оплата по счёту</dd>
            </div>
            <div class="legal__item">
              <dt>Реквизиты для проверки</dt>
              <dd>ОГРН 1135044003709<br>ИНН 5044089069</dd>
            </div>
            <div class="legal__item">
              <dt>Два офиса</dt>
              <dd>Солнечногорск и Москва — техника выезжает по всей области</dd>
            </div>
          </dl>

          <button class="steps__btn guar__btn" type="button" data-callback-open
                  data-cb-title="Запросить договор и реквизиты"
                  data-cb-lead="Пришлём шаблон договора и карточку предприятия на почту — проверите до начала работ">
            Запросить договор и реквизиты
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- ============ БЛОК 9 — КОНТАКТЫ ============
       Телефоны, почты, адреса и часы — с e-systems.su.
       TODO: отправка заявок подключается позже (см. LEAD_ENDPOINT в js/main.js). -->
  <section class="section" id="contacts">
    <div class="container">
      <div class="section__head">
        <h2 class="section__title">
          <span class="muted">Остались вопросы по объекту —</span>
          позвоните или напишите
        </h2>
      </div>

      <div class="contacts">
        <form class="contacts__form" data-contact-form novalidate>
          <label class="field">
            <span class="field__label">Имя</span>
            <input class="field__input" type="text" name="ctname" autocomplete="given-name" placeholder="Как к вам обращаться">
            <span class="field__err">Укажите имя</span>
          </label>
          <label class="field">
            <span class="field__label">Телефон</span>
            <input class="field__input" type="tel" name="ctphone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__">
            <span class="field__err">Проверьте номер телефона</span>
          </label>
          <label class="field">
            <span class="field__label">Коротко об объекте <i class="field__opt">по желанию</i></span>
            <textarea class="field__input field__input--area" name="cttask" rows="3" placeholder="Например: прокол под Ленинградским шоссе, 90 м, труба 315"></textarea>
          </label>

          <div class="consents">
            <label class="consent">
              <input type="checkbox" name="ctconsent">
              <span class="opt__ind"></span>
              <span>Даю <a href="https://e-systems.su/personal-data-consent" target="_blank" rel="noopener">согласие на обработку персональных данных</a></span>
            </label>
            <label class="consent">
              <input type="checkbox" name="ctprivacy">
              <span class="opt__ind"></span>
              <span>Ознакомлен с <a href="https://e-systems.su/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span>
            </label>
          </div>
          <span class="field__err field__err--consent">Отметьте оба пункта — без них не сможем принять заявку</span>

          <button class="contacts__submit" type="submit">Отправить заявку</button>
          <p class="contacts__note">Не хотите отвечать на вопросы опроса — напишите пару строк, остальное спросим сами.</p>

          <div class="contacts__done" data-contact-done hidden>
            <b>Заявка принята</b>
            <span>Ответим в рабочее время. Если срочно — звоните: <a href="tel:+74951780118">+7 (495) 178-01-18</a></span>
          </div>
        </form>

        <div class="contacts__side">
          <div class="cnt">
            <span class="cnt__label">Телефоны</span>
            <a class="cnt__value" href="tel:+74951780118">+7 (495) 178-01-18</a>
            <a class="cnt__value" href="tel:+79251640560">+7 (925) 164-05-60</a>
          </div>
          <div class="cnt">
            <span class="cnt__label">Почта</span>
            <a class="cnt__value" href="mailto:sales@e-systems.su">sales@e-systems.su <i>по заявкам и расчётам</i></a>
            <a class="cnt__value" href="mailto:inbox@e-systems.su">inbox@e-systems.su <i>общие вопросы</i></a>
          </div>
          <div class="cnt">
            <span class="cnt__label">Мессенджеры</span>
            <div class="cnt__msgrs">
              <!-- TODO: реальные ссылки на Max и Telegram -->
              <a class="cnt__msg" href="https://max.ru/" target="_blank" rel="noopener">
                <i class="msg msg--max" aria-hidden="true"><svg viewBox="0 0 100 100" width="16" height="16" fill="#fff"><path fill-rule="evenodd" clip-rule="evenodd" d="M50.76 0.26C78.29 0.26 99.89 22.6 99.89 50.15C99.89 77.7 77.61 99.49 51.02 99.49C41.59 99.49 37.01 98.16 29.65 92.95C29.14 92.59 28.45 92.68 28.02 93.14C22.36 99.18 7.85 103.43 7.19 95.18C7.19 80.79 0 71.45 0 49.88C0 21.55 23.22 0.26 50.76 0.26ZM51.53 24.81C38.46 24.13 28.26 33.2 26.01 47.38C24.15 59.13 27.45 73.45 30.28 74.18C31.48 74.48 34.36 72.28 36.46 70.3C36.85 69.93 37.45 69.86 37.91 70.15C41.18 72.15 44.88 73.65 48.96 73.86C62.37 74.56 74.26 64.06 74.96 50.65C75.66 37.23 64.94 25.5 51.53 24.8V24.81Z"/></svg></i>
                Max
              </a>
              <a class="cnt__msg" href="https://t.me/" target="_blank" rel="noopener">
                <i class="msg msg--tg" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l-4 4 6 6 4-16-18 7 4 2 2 6 3-4"/></svg></i>
                Telegram
              </a>
            </div>
          </div>
          <div class="cnt">
            <span class="cnt__label">Время работы</span>
            <b class="cnt__plain">Пн–Пт, с 9:00 до 18:00</b>
          </div>
        </div>
      </div>

      <!-- Метки ставит сам Яндекс по адресу: координаты не выдумываем.
           loading="lazy" не ставим — в собранном файле это ломает отрисовку. -->
      <div class="maps">
        <figure class="map">
          <iframe class="map__frame" src="https://yandex.ru/map-widget/v1/?text=Солнечногорск%2C%20Промышленная%20улица%2C%20строение%205&z=16"
                  title="Офис в Солнечногорске на карте" allowfullscreen></iframe>
          <figcaption class="map__cap">
            <b>Солнечногорск</b>
            <a href="https://yandex.ru/maps/?text=Солнечногорск%2C%20Промышленная%20улица%2C%20строение%205" target="_blank" rel="noopener">Промышленная ул., с. 5</a>
          </figcaption>
        </figure>
        <figure class="map">
          <iframe class="map__frame" src="https://yandex.ru/map-widget/v1/?text=Москва%2C%20улица%20Руставели%2C%2014с6&z=16"
                  title="Офис в Москве на карте" allowfullscreen></iframe>
          <figcaption class="map__cap">
            <b>Москва</b>
            <a href="https://yandex.ru/maps/?text=Москва%2C%20улица%20Руставели%2C%2014с6" target="_blank" rel="noopener">ул. Руставели, 14с6</a>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>

  </main>

  <!-- ============ ПОДВАЛ ============ -->
  <footer class="footer">
    <div class="container footer__inner">
      <span>ООО «Энергосистемы», 2026</span>
      <span class="footer__links">
        <a href="https://e-systems.su/privacy" target="_blank" rel="noopener">Политика конфиденциальности</a>
        <a href="https://e-systems.su/personal-data-consent" target="_blank" rel="noopener">Согласие на обработку данных</a>
      </span>
    </div>
  </footer>

  <!-- ============ ФОРМА «ЗАКАЗАТЬ ЗВОНОК» ============ -->
  <div class="modal" data-callback hidden>
    <div class="modal__backdrop" data-callback-close></div>
    <div class="modal__box" role="dialog" aria-modal="true" aria-labelledby="cb-title">
      <button class="modal__close" type="button" data-callback-close aria-label="Закрыть">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <h2 class="modal__title" id="cb-title">Заказать звонок</h2>
      <p class="modal__lead">Перезвоним в рабочее время: Пн–Пт с 9:00 до 18:00.</p>

      <form class="modal__form" data-callback-form novalidate>
        <label class="field">
          <span class="field__label">Имя</span>
          <input class="field__input" type="text" name="cbname" autocomplete="given-name" placeholder="Как к вам обращаться">
          <span class="field__err">Укажите имя</span>
        </label>
        <label class="field">
          <span class="field__label">Телефон</span>
          <input class="field__input" type="tel" name="cbphone" autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___-__-__">
          <span class="field__err">Проверьте номер телефона</span>
        </label>
        <div class="consents">
          <label class="consent">
            <input type="checkbox" name="cbconsent">
            <span class="opt__ind"></span>
            <span>Даю <a href="https://e-systems.su/personal-data-consent" target="_blank" rel="noopener">согласие на обработку персональных данных</a></span>
          </label>
          <label class="consent">
            <input type="checkbox" name="cbprivacy">
            <span class="opt__ind"></span>
            <span>Ознакомлен с <a href="https://e-systems.su/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a></span>
          </label>
        </div>
        <span class="field__err field__err--consent">Отметьте оба пункта — без них не сможем принять заявку</span>
        <button class="modal__submit" type="submit">Жду звонка</button>
      </form>

      <div class="modal__done" data-callback-done hidden>
        <b>Заявка принята</b>
        <span>Перезвоним в рабочее время. Если срочно — звоните сами: <a href="tel:+74951780118">+7 (495) 178-01-18</a></span>
      </div>
    </div>
  </div>

  <!-- липкая кнопка на узких экранах; прячется, когда виден сам опрос -->
  <div class="sticky-cta" data-sticky>
    <a class="sticky-cta__btn" href="#quiz">Рассчитать стоимость</a>
    <a class="sticky-cta__call" href="tel:+74951780118" aria-label="Позвонить">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>
    </a>
  </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { initHddPage } from '~/assets/js/hdd-landing.js'

useHead({
  title: 'ГНБ под ключ: прокол под дорогой 110–800 мм — Москва и область',
  meta: [
    {
      name: 'description',
      content:
        'Горизонтально направленное бурение и проколы под дорогами: связь, газ, электрика. ' +
        'Диаметры 110–800 мм, свой отдел проектирования, работы под ключ в Москве и области.'
    }
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap'
    }
  ]
})

let cleanup = null
onMounted(() => { cleanup = initHddPage() })
onBeforeUnmount(() => { if (cleanup) cleanup() })
</script>

<style scoped>
/* ============ ТОКЕНЫ ============ */
.hdd {
  /* светлая тема страницы; hero остаётся тёмной фотокарточкой (токены переопределены в .hero) */
  --bg: #FFFFFF;
  --surface: #F3F3F0;
  --line: rgba(20, 23, 28, .1);
  --line-strong: rgba(20, 23, 28, .22);
  --text: #14171C;
  --text-2: #3F434A;
  --muted: #71747A;
  --accent-ink: #A8660A;
  --card: #F2F1EC;
  --card-text: #14171C;
  --card-muted: #6B6A66;
  --accent: #F2A93B;
  --accent-hover: #FFB65C;
  /* фирменный градиент Max: циан → синий → фиолетовый, снят с их favicon */
  --max: linear-gradient(135deg, #00EAFF 0%, #1B6CFF 52%, #8109FC 100%);
  --tg: #2AA1DA;

  --r-card: 28px;
  --r-hero: 32px;
  --r-btn: 6px;

  --font: "Manrope", "PT Sans", system-ui, -apple-system, sans-serif;
  --container: 1360px;
  --gutter: 40px;
}

*, *::before, *::after { box-sizing: border-box; }
:global(html) { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
.hdd {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
h1, h2, h3, p, ol { margin: 0; }
ol { padding: 0; list-style: none; }
img { display: block; max-width: 100%; }
[hidden] { display: none !important; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }

.container {
  max-width: var(--container);
  margin: 0 auto;
  padding-inline: var(--gutter);
}

/* ============ ШАПКА ============ */
.header { border-bottom: 1px solid var(--line); }
.header__inner {
  max-width: var(--container);
  margin: 0 auto;
  padding: 14px var(--gutter);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}
.logo { display: flex; align-items: center; flex-shrink: 0; }
.logo img { height: 38px; width: auto; }
.logo__fallback {
  font-weight: 800; font-size: 20px; letter-spacing: -.02em; color: #EEE8DB;
}

.nav { display: flex; gap: 28px; }
.nav a {
  position: relative;
  font-size: 14.5px;
  color: var(--text-2);
  padding: 6px 0;
  transition: color .25s;
}
.nav a::after {
  content: "";
  position: absolute; left: 0; bottom: 0;
  width: 0; height: 1.5px;
  background: var(--accent);
  transition: width .25s;
}
.nav a:hover { color: var(--accent); }
.nav a:hover::after { width: 100%; }

.contact { display: flex; align-items: center; gap: 22px; }
.msg {
  width: 32px; height: 32px; border-radius: 50%;
  display: grid; place-items: center; flex-shrink: 0;
  transition: transform .2s, filter .2s;
}
.msg--max { background: var(--max); }
.msg--tg { background: var(--tg); }
.msg:hover { transform: translateY(-1px); filter: brightness(1.1); }
/* иконки мессенджеров — в одной группе, но ближе друг к другу */
.msg--max { margin-right: -12px; }

.phone { display: flex; flex-direction: column; align-items: flex-end; line-height: 1.25; }
.phone__num {
  font-weight: 700; font-size: 15.5px; color: var(--text); white-space: nowrap;
  /* цифры одной ширины: без этого номер с единицами кажется набранным мельче */
  font-variant-numeric: tabular-nums;
}
.phone__num:hover { color: var(--accent); }
/* оба номера одинаковые — это равноценные контакты, а не главный и запасной */
.phone__num--second { margin-top: 1px; }
/* почта отделена от номеров воздухом: это другой канал связи */
.phone__mail {
  margin-top: 7px;
  font-size: 13px; color: var(--text-2); white-space: nowrap;
  text-decoration: underline; text-underline-offset: 2px;
  text-decoration-color: var(--line-strong);
}
.phone__mail:hover { color: var(--accent); text-decoration-color: var(--accent); }
.phone__note {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 11.5px; color: var(--muted); white-space: nowrap;
}
/* живой статус: точка считает рабочие часы Пн–Пт 09:00–18:00 по Москве */
.phone__dot {
  position: relative; flex-shrink: 0;
  width: 7px; height: 7px; border-radius: 50%;
  background: #2FB35C;
}
.phone__dot::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  background: #2FB35C; animation: pulse 2.4s ease-out infinite;
}
.phone__note.is-off .phone__dot { background: var(--muted); }
.phone__note.is-off .phone__dot::after { display: none; }

.btn-cta {
  flex-shrink: 0;
  background: var(--accent);
  color: #14171C;
  font-weight: 700;
  font-size: 13.5px;
  border-radius: var(--r-btn);
  padding: 10px 16px;
  border: 0;
  white-space: nowrap;
  transition: background .2s, transform .2s;
}
.btn-cta:hover { background: var(--accent-hover); transform: translateY(-1px); }
.btn-cta:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

/* ============ БЛОК 1 — HERO ============ */
.hero-wrap { padding: 16px 24px 0; }
.hero {
  --text: #F2F1EC;
  --text-2: #D9D8D2;
  --muted: #B3B2AC;
  --line: rgba(242, 241, 236, .14);
  --line-strong: rgba(242, 241, 236, .35);
  color: var(--text);
  position: relative;
  max-width: 1840px;
  margin: 0 auto;
  min-height: min(88vh, 920px);
  border-radius: var(--r-hero);
  overflow: hidden;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 140px 40px 0;
}
.hero__media {
  position: absolute; inset: 0; z-index: -2;
  /* плейсхолдер до появления фото/видео: тёплый свет из техпомещения */
  background:
    radial-gradient(60% 70% at 78% 30%, rgba(242,169,59,.35), transparent 60%),
    radial-gradient(40% 50% at 20% 20%, rgba(90,110,140,.35), transparent 70%),
    linear-gradient(135deg, #2A2F37 0%, #1B1F25 55%, #0F1115 100%);
}
.hero__media video, .hero__media img {
  width: 100%; height: 100%; object-fit: cover;
  object-position: 50% 40%;
}
/* затемнение: дневное фото остаётся светлым сверху, текст внизу лежит на тёмном */
.hero::after {
  content: "";
  position: absolute; inset: 0; z-index: -1;
  background:
    linear-gradient(90deg, rgba(20,23,28,.28) 0%, rgba(20,23,28,0) 45%),
    linear-gradient(180deg, rgba(20,23,28,.1) 0%, rgba(20,23,28,0) 30%, rgba(20,23,28,.34) 55%, rgba(20,23,28,.8) 76%, rgba(20,23,28,.95) 100%);
}

.hero__content {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 56px;
  align-items: end;
  padding-bottom: 48px;
  text-shadow: 0 1px 14px rgba(10, 12, 15, .55);
}
.btn-pill { text-shadow: none; }
.hero__title {
  font-size: clamp(36px, 4.6vw, 68px);
  line-height: 1.02;
  letter-spacing: -.03em;
  font-weight: 700;
}
.h1-line { display: block; }
.nowrap { white-space: nowrap; }
.h1-line--accent { color: var(--accent); }
.h1-line--sub {
  margin-top: .45em;
  font-size: .5em;
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -.015em;
  color: var(--text);
}

.hero__aside {
  max-width: 580px;
  justify-self: end;
  padding: 28px 28px 24px;
  background: rgba(14, 16, 20, .62);
  -webkit-backdrop-filter: blur(18px) saturate(1.2);
          backdrop-filter: blur(18px) saturate(1.2);
  border: 1px solid rgba(242, 241, 236, .14);
  border-radius: 24px;
  text-shadow: none;
}
.hero__lead {
  font-size: 19px;
  line-height: 1.45;
  font-weight: 500;
  color: var(--text);
}

.usp { counter-reset: usp; margin: 20px 0 20px; }
.usp li {
  counter-increment: usp;
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  align-items: start;
  padding: 12px 0;
  font-size: 16px;
  line-height: 1.4;
  color: var(--text);
  border-top: 1px solid var(--line);
}
.usp li:last-child { border-bottom: 1px solid var(--line); }
.usp li::before {
  content: counter(usp);
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  color: var(--accent);
  font-size: 13px; font-weight: 700;
  display: grid; place-items: center;
}

.btn-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 6px 6px 6px 28px;
  border: 0;
  border-radius: 999px;
  background: var(--accent);
  color: #14171C;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(242, 169, 59, .35);
  transition: background .25s, transform .25s, box-shadow .25s;
}
.btn-pill__icon {
  width: 56px; height: 56px; border-radius: 50%;
  display: grid; place-items: center;
  background: #14171C;
  color: var(--accent);
  transition: background .25s, transform .25s;
}
.btn-pill:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 14px 36px rgba(242, 169, 59, .45); }
.btn-pill:hover .btn-pill__icon { transform: rotate(90deg); }

/* маркетинговые захваты */
.hero__badges {
  position: absolute; top: 28px; left: 40px;
  display: flex; flex-wrap: wrap; gap: 8px;
  margin: 0; padding: 0; list-style: none;
}
.hero__badges li {
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(14, 16, 20, .55);
  -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
  border: 1px solid rgba(242, 241, 236, .16);
  font-size: 14px; color: var(--text-2);
}
.hero__badges b { color: var(--accent); font-weight: 700; }
.hero__callout {
  position: absolute; top: 28px; right: 40px;
  display: flex; align-items: center; gap: 12px;
  padding: 12px 18px 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, .92);
  color: #14171C;
  box-shadow: 0 12px 30px rgba(0, 0, 0, .25);
}
.hero__callout b { display: block; font-size: 15px; }
.hero__callout span:not(.hero__pulse) { font-size: 13px; color: #5B5E64; }
.hero__pulse {
  flex-shrink: 0; position: relative;
  width: 12px; height: 12px; border-radius: 50%; background: #2FB35C;
}
.hero__pulse::after {
  content: ""; position: absolute; inset: 0; border-radius: 50%;
  background: #2FB35C; animation: pulse 1.8s ease-out infinite;
}
@keyframes pulse { from { transform: scale(1); opacity: .6; } to { transform: scale(2.8); opacity: 0; } }
.hero__offer {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 18px;
  padding: 12px 16px;
  border-radius: 14px;
  background: rgba(242, 169, 59, .14);
  border: 1px dashed rgba(242, 169, 59, .6);
  color: var(--accent);
}
.hero__offer svg { flex-shrink: 0; }
.hero__offer p { font-size: 15px; line-height: 1.35; color: var(--text); }
.hero__offer b { color: var(--accent); }

.hero__note { margin-top: 12px; font-size: 13px; color: var(--text-2); text-align: center; }

.trust {
  display: grid;
  grid-template-columns: auto repeat(3, 1fr);
  border-top: 1px solid rgba(242, 241, 236, .25);
}
.trust__label {
  align-self: center;
  padding-right: 40px;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: .08em;
  color: var(--muted);
}
.trust__item {
  padding: 28px 24px 36px;
  border-left: 1px solid rgba(242, 241, 236, .18);
  display: flex; align-items: center; gap: 20px;
}
.trust__text { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
/* логотипы партнёров: монохром в цвет текста, на hover — фирменный цвет */
.trust__logo {
  flex-shrink: 0;
  width: 64px; height: 64px;
  display: grid; place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(242, 241, 236, .18);
  background: rgba(242, 241, 236, .04);
  transition: background .3s, border-color .3s;
}
.trust__logo img {
  max-width: 36px; max-height: 36px; width: auto; height: auto;
  filter: brightness(0) invert(.94);
  opacity: .9;
  transition: filter .3s, opacity .3s;
}
.trust__logo--rzd img { max-width: 42px; }
/* знак МИСК приведён к белому в самом файле: синее поле вырезано, рамка, сетка
   и буквы оставлены. На hover остальные логотипы показывают свой цвет, а этот
   станет невидимым на светлом кружке — поэтому там перекрашиваем его в чёрный */
.trust__logo--misk img { max-width: 38px; max-height: 38px; }
.trust__item:hover .trust__logo--misk img { filter: brightness(0); }
.trust__item:hover .trust__logo { background: #F2F1EC; border-color: #F2F1EC; }
.trust__item:hover .trust__logo img { filter: none; opacity: 1; }
.trust__item b { font-size: 32px; font-weight: 700; letter-spacing: .02em; line-height: 1.1; }
.trust__item span { font-size: 16px; color: var(--text-2); }

/* ============ СЕКЦИИ ============ */
.section { padding-block: 120px 0; }
.section:last-of-type { padding-bottom: 120px; }
.section__head { margin-bottom: 72px; }
.section__title {
  max-width: 1000px;
  font-size: clamp(30px, 3.8vw, 60px);
  line-height: 1.05;
  letter-spacing: -.03em;
  font-weight: 700;
}
.section__title .muted { color: var(--muted); font-weight: 500; }

/* ============ БЛОК 2 — КВИЗ ============ */
.quiz {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 16px;
  padding: 16px;
  background: var(--surface);
  border-radius: var(--r-card);
}
.quiz__main {
  position: relative;
  display: flex; flex-direction: column;
  min-height: 600px;
  padding: 56px 56px 40px;
  background: var(--bg);
  border-radius: 20px;
  overflow: hidden;
}
.quiz__progress {
  position: absolute; left: 0; right: 0; top: 0;
  height: 6px;
  background: var(--line);
}
.quiz__bar {
  display: block; height: 100%;
  background: var(--accent);
  border-radius: 0 3px 3px 0;
  transition: width .4s ease;
}

.quiz__step { display: none; border: 0; margin: 0; padding: 0; min-width: 0; }
.quiz__step.is-active { display: block; animation: stepIn .35s ease; }
@keyframes stepIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: none; } }

.quiz__q {
  padding: 0;
  font-size: clamp(22px, 2vw, 28px);
  line-height: 1.2;
  letter-spacing: -.02em;
  font-weight: 700;
  outline: none;
}
.quiz__hint { margin-top: 8px; font-size: 15px; color: var(--muted); }
.quiz__hint--warn { color: var(--accent-ink); }

.quiz__opts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 32px;
}
/* шаг с диаметрами: вариантов много, а подписи короткие — сетка плотнее */
.quiz__opts--compact { grid-template-columns: repeat(4, 1fr); }
.quiz__opts--compact .opt { min-height: 64px; padding: 14px 18px; gap: 12px; }

.opt {
  position: relative;
  display: flex; align-items: center; gap: 16px;
  min-height: 84px;
  padding: 18px 24px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #fff;
  font-size: 17px;
  line-height: 1.3;
  cursor: pointer;
  transition: border-color .2s, background .2s;
}
.opt:hover { border-color: var(--line-strong); }
.opt input, .seg input, .consent input {
  position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none;
}
.opt__ind {
  flex-shrink: 0;
  position: relative;
  width: 26px; height: 26px;
  border: 1.5px solid var(--line-strong);
  border-radius: 50%;
  transition: border-color .2s, background .2s;
}
.opt__ind::after {
  content: "";
  position: absolute; inset: 5px;
  border-radius: 50%;
  background: var(--accent);
  transform: scale(0);
  transition: transform .2s;
}
/* чекбоксы — квадрат с галочкой */
.opt input[type="checkbox"] + .opt__ind,
.consent .opt__ind { border-radius: 7px; }
.opt input[type="checkbox"] + .opt__ind::after,
.consent .opt__ind::after {
  inset: 0; border-radius: 5px;
  background: var(--accent) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2314171C' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 12 5 5 9-10'/%3E%3C/svg%3E") center / 16px no-repeat;
}
.opt:has(input:checked) { border-color: var(--accent); background: rgba(242, 169, 59, .1); }
.opt input:checked + .opt__ind,
.consent input:checked + .opt__ind { border-color: var(--accent); }
.opt input:checked + .opt__ind::after,
.consent input:checked + .opt__ind::after { transform: scale(1); }
.opt:has(input:focus-visible), .consent:has(input:focus-visible), .seg label:has(input:focus-visible) {
  outline: 2px solid var(--accent); outline-offset: 3px;
}

/* форма */
.quiz__form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 16px;
  margin-top: 32px;
}
.field { display: flex; flex-direction: column; gap: 8px; }
.field--wide { grid-column: 1 / -1; }
.field__label { font-size: 14px; color: var(--text-2); }
.field__input {
  height: 60px;
  padding: 0 20px;
  border: 1px solid var(--line-strong);
  border-radius: 14px;
  background: #fff;
  color: var(--text);
  font: inherit; font-size: 17px;
  transition: border-color .2s;
}
.field__input::placeholder { color: var(--muted); }
.field__input:focus { outline: none; border-color: var(--accent); }
.field__input[aria-invalid="true"] { border-color: #E5634D; }
.field__err { display: none; font-size: 13px; color: #F08A76; }
.field__input[aria-invalid="true"] ~ .field__err,
.field__err--consent.is-shown { display: block; }
.field__err--consent { grid-column: 1 / -1; margin-top: -12px; }

.seg {
  display: inline-grid; grid-auto-flow: column;
  padding: 4px;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  justify-self: start;
}
.seg label { position: relative; border-radius: 999px; }
.seg span {
  display: block;
  padding: 10px 22px;
  border-radius: 999px;
  font-size: 15px; color: var(--text-2);
  cursor: pointer;
  transition: background .2s, color .2s;
}
.seg input:checked + span { background: var(--text); color: #fff; font-weight: 600; }
.seg span { display: flex; align-items: center; justify-content: center; gap: 10px; }
.seg__ico {
  flex-shrink: 0;
  width: 22px; height: 22px; border-radius: 50%;
  display: inline-grid; place-items: center;
  margin: 0 !important;
}
.seg__ico--call { width: 18px; height: 18px; border-radius: 0; }

.consent {
  position: relative;
  display: flex; align-items: flex-start; gap: 12px;
  font-size: 14px; line-height: 1.45; color: var(--muted);
  cursor: pointer;
}
.consent .opt__ind { width: 22px; height: 22px; margin-top: 1px; }
.consent a { color: var(--text-2); text-decoration: underline; text-underline-offset: 3px; }
.consent a:hover { color: var(--accent-ink); text-decoration-color: var(--accent); }
/* два документа подряд: согласие на обработку данных и политика конфиденциальности */
.consents { display: flex; flex-direction: column; gap: 10px; }

/* навигация */
.quiz__nav {
  margin-top: auto;
  padding-top: 40px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
}
.quiz__count { font-size: 16px; color: var(--muted); }
.quiz__count b { color: var(--text); font-weight: 600; }
.quiz__btns { display: flex; gap: 12px; }
.quiz__back {
  width: 64px; height: 64px;
  display: grid; place-items: center;
  border: 1.5px solid var(--line-strong);
  border-radius: 50%;
  background: transparent; color: var(--text);
  cursor: pointer;
  transition: border-color .2s;
}
.quiz__back:hover { border-color: var(--text); }
.quiz__next {
  display: inline-flex; align-items: center; gap: 12px;
  height: 64px; padding: 0 36px;
  border: 0; border-radius: 999px;
  background: var(--accent); color: #14171C;
  font: inherit; font-size: 18px; font-weight: 700;
  cursor: pointer;
  transition: background .2s, opacity .2s, transform .2s;
}
.quiz__next:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-1px); }
.quiz__next:disabled { opacity: .35; cursor: not-allowed; }
.quiz.is-done .quiz__nav { display: none; }

/* результат */
.result {
  margin: 28px 0 20px;
  border: 1px solid var(--line-strong);
  border-radius: 18px;
}
.result div {
  display: grid; grid-template-columns: 180px 1fr; gap: 16px;
  padding: 18px 24px;
  border-top: 1px solid var(--line);
}
.result div:first-child { border-top: 0; }
.result dt { font-size: 14px; color: var(--muted); padding-top: 2px; }
.result dd { margin: 0; font-size: 17px; font-weight: 600; }
.result dd[data-r="diameter"] { font-size: 28px; color: var(--accent-ink); letter-spacing: -.02em; }
.quiz__restart {
  margin-top: 20px;
  padding: 0; border: 0; background: none;
  color: var(--text-2); font: inherit; font-size: 15px;
  text-decoration: underline; text-underline-offset: 4px;
  cursor: pointer;
}

/* менеджер */
.quiz__side {
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 24px 16px 16px;
}
.mgr__photo { position: relative; width: 72px; height: 72px; }
.mgr__photo img { width: 72px; height: 72px; border-radius: 16px; object-fit: cover; }
.mgr__online {
  position: absolute; right: -3px; bottom: -3px;
  width: 16px; height: 16px; border-radius: 50%;
  background: #2FB35C; border: 3px solid var(--surface);
}
.mgr__bubble {
  position: relative;
  margin-top: 18px;
  padding: 20px 22px;
  background: var(--bg);
  border-radius: 4px 18px 18px 18px;
}
.mgr__bubble::before {
  content: "";
  position: absolute; left: 24px; top: -8px;
  border: 8px solid transparent; border-top: 0;
  border-bottom-color: var(--bg);
}
.mgr__name { display: block; font-size: 17px; }
.mgr__role { display: block; margin-top: 2px; font-size: 13px; color: var(--muted); }
.mgr__msg {
  margin-top: 14px;
  font-size: 15px; line-height: 1.5; color: var(--text-2);
  min-height: 4.5em;
  transition: opacity .3s;
}
.mgr__msg.is-typing { opacity: .6; }
.typing { display: inline-flex; gap: 4px; padding: 6px 0; }
.typing i {
  width: 6px; height: 6px; border-radius: 50%; background: var(--muted);
  animation: typing 1s infinite ease-in-out;
}
.typing i:nth-child(2) { animation-delay: .15s; }
.typing i:nth-child(3) { animation-delay: .3s; }
@keyframes typing { 0%, 60%, 100% { transform: none; opacity: .4; } 30% { transform: translateY(-4px); opacity: 1; } }

.quiz__aside-foot { margin-top: 40px; }
.quiz__aside-lead { font-size: 18px; line-height: 1.4; font-weight: 700; color: var(--text-2); }
.quiz__aside-note { margin-top: 14px; font-size: 15px; line-height: 1.5; color: var(--muted); }
.quiz__msgrs {
  display: flex; align-items: center; gap: 10px;
  margin-top: 20px;
  font-size: 13px; color: var(--muted);
}
.quiz__msgrs .msg { margin: 0; }

/* ============ БЛОК 3 — ЛЕНТА КЛИЕНТОВ ============ */
.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 120px, #000 calc(100% - 120px), transparent);
          mask-image: linear-gradient(90deg, transparent, #000 120px, #000 calc(100% - 120px), transparent);
}
.marquee__track {
  display: flex; gap: 20px;
  width: max-content;
  padding: 4px 0;
  /* движение слева направо; длительность выставляет JS по ширине ленты */
  animation: marquee var(--marquee-dur, 70s) linear infinite;
}
.marquee:hover .marquee__track,
.marquee:focus-within .marquee__track { animation-play-state: paused; }
@keyframes marquee {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

.client {
  flex: 0 0 300px;
  display: flex; flex-direction: column;
  min-height: 176px;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  transition: border-color .3s, background .3s;
}
.client:hover { border-color: var(--line-strong); background: #fff; box-shadow: 0 10px 30px rgba(20, 23, 28, .08); }
.client__logo {
  height: 48px;
  display: flex; align-items: center;
  margin-bottom: 20px;
}
.client__logo img {
  max-height: 48px; max-width: 220px; width: auto; height: auto;
  filter: brightness(0);
  opacity: .6;
  transition: opacity .3s;
}
.client__logo--text {
  font-size: 22px; font-weight: 800;
  letter-spacing: -.01em; text-transform: uppercase;
  color: var(--text); opacity: .75;
  transition: opacity .3s;
}
.client:hover .client__logo img,
.client:hover .client__logo--text { opacity: 1; }
.client b { font-size: 15px; line-height: 1.3; }
.client > span:last-child { margin-top: 6px; font-size: 13px; line-height: 1.4; color: var(--muted); }


/* ============ БЛОК 4 — КАК РЕШАЕМ (этапы) ============ */
.steps { padding-top: 120px; background: var(--bg); }
.steps__head { margin-bottom: 0; }
.steps__title { max-width: 22ch; font-weight: 800; letter-spacing: -.035em; text-wrap: balance; }
.steps__lead { margin-top: 20px; max-width: 520px; font-size: 18px; line-height: 1.5; color: var(--muted); }


.steps__stage {
  position: relative;
  isolation: isolate;
  /* фото 1916×821 → высота 42.8vw; линия этапов проходит по траве, ниже — тёмный фон */
  padding-top: 34vw;
  background: linear-gradient(to bottom, transparent 42vw, #0E1014 42vw);
  color: #F2F1EC;
}
/* фото «вырезано» по небу: верх растворяется в белом фоне */
.steps__photo {
  position: absolute; top: 0; left: 0; z-index: -2;
  width: 100%; height: auto;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 26%);
          mask-image: linear-gradient(to bottom, transparent 0, #000 26%);
}
.steps__stage::after {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(to bottom, rgba(14,16,20,0) 27vw, rgba(14,16,20,.6) 34vw, #0E1014 42.5vw, #0E1014 100%);
}
.steps__inner { position: relative; padding-bottom: 36px; }

/* линия этапов */
.steps__line { position: relative; height: 2px; background: rgba(242,241,236,.28); }
.steps__fill {
  position: absolute; left: 0; top: 0; height: 100%;
  width: calc(var(--fill, 1) * 100%);
  background: var(--accent);
  transition: width .45s ease;
}
.steps__line i {
  position: absolute; top: -6px; left: calc(var(--i) * 20%);
  width: 14px; height: 14px; border-radius: 50%;
  background: #14171C; border: 2px solid rgba(242,241,236,.55);
  transition: background .3s, border-color .3s, transform .3s;
}
.steps__line i.is-on { background: var(--accent); border-color: var(--accent); }
.steps__line i.is-cur { transform: scale(1.35); }
.steps__line i.is-cur::after {
  content: ""; position: absolute; inset: -2px; border-radius: 50%;
  background: var(--accent); animation: pulse 1.6s ease-out infinite;
}

/* колонки */
.steps__cols {
  display: grid; grid-template-columns: repeat(5, 1fr);
  margin: 0; padding: 0; list-style: none;
}
.step {
  position: relative;
  display: flex; flex-direction: column;
  min-height: 380px;
  padding: 26px 24px 28px;
  border-left: 1px solid rgba(242,241,236,.28);
  outline: none;
  cursor: default;
  transition: background .3s, opacity .3s;
}
.step:first-child { border-left: 0; }
.step__num { font-size: 14px; font-weight: 700; letter-spacing: .06em; color: rgba(242,241,236,.7); }
.step__num span { color: var(--accent); margin-left: 4px; }
.step__text { margin-top: 16px; font-size: 17px; line-height: 1.45; color: rgba(242,241,236,.92); }
.step__text b {
  display: inline-block; color: var(--accent); font-weight: 700;
  transform-origin: left center; transition: transform .3s;
}
.step__title {
  margin-top: auto; padding-top: 40px;
  font-size: clamp(24px, 2.2vw, 34px); font-weight: 800;
  line-height: 1.05; letter-spacing: -.03em; color: #fff;
}
.step__sub {
  margin-top: 6px; font-size: 19px; font-weight: 600; color: rgba(242,241,236,.72);
  transition: filter .6s ease, opacity .6s ease;
}
.step__free {
  margin-left: 10px; padding: 3px 9px;
  border-radius: 999px;
  background: #2FB35C; color: #fff;
  font-size: 11px; font-style: normal; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
}
.step__get {
  display: flex; align-items: flex-start; gap: 8px;
  margin-top: 14px; padding-top: 12px;
  border-top: 1px dashed rgba(242,241,236,.25);
  font-size: 14px; line-height: 1.4; color: #fff;
}
.step__get svg { flex-shrink: 0; margin-top: 1px; color: var(--accent); }
.step__get-label { color: rgba(242,241,236,.6); }

/* полоса с призывом под этапами */
.steps__cta {
  display: flex; align-items: center; gap: 24px 40px; flex-wrap: wrap;
  margin-top: 28px; padding: 22px 28px;
  border-radius: 20px;
  background: rgba(242,241,236,.06);
  border: 1px solid rgba(242,241,236,.14);
}
/* margin-right прижимает кнопку к правому краю: строки с датой выезда между ними больше нет */
.steps__sum { display: flex; flex-direction: column; margin-right: auto; }
.steps__sum b { font-size: 28px; font-weight: 800; letter-spacing: -.02em; color: var(--accent); line-height: 1.1; }
.steps__sum span { font-size: 14px; color: rgba(242,241,236,.7); }
.steps__btn {
  display: inline-flex; align-items: center; gap: 10px;
  height: 56px; padding: 0 28px;
  border-radius: 999px;
  background: var(--accent); color: #14171C;
  font-size: 17px; font-weight: 700; white-space: nowrap;
  box-shadow: 0 10px 30px rgba(242,169,59,.3);
  transition: background .2s, transform .2s;
}
.steps__btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

/* появление при прокрутке — включается только из JS, состояние покоя видимое */
.steps.is-armed .steps__fill { width: 0; transition: none; }
.steps.is-armed:not(.is-in) .steps__line i { background: #14171C; border-color: rgba(242,241,236,.55); }
.steps.is-armed .step__sub { filter: blur(10px); opacity: .3; }
.steps.is-in .steps__fill { width: calc(var(--fill, 1) * 100%); transition: width 1.2s ease; }
.steps.is-in .step__sub { filter: none; opacity: 1; }
.steps.is-in .step:nth-child(2) .step__sub { transition-delay: .12s; }
.steps.is-in .step:nth-child(3) .step__sub { transition-delay: .24s; }
.steps.is-in .step:nth-child(4) .step__sub { transition-delay: .36s; }
.steps.is-in .step:nth-child(5) .step__sub { transition-delay: .48s; }

/* подсветка этапа: наведение, фокус, нажатие на тач-экранах */
.step:hover, .step:focus-visible, .step.is-active {
  background: rgba(255,255,255,.1);
  -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
}
.step:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
.steps__cols:hover .step:not(:hover),
.steps__cols.has-active .step:not(.is-active) { opacity: .55; }
.step:hover .step__sub, .step:focus-visible .step__sub, .step.is-active .step__sub {
  filter: none; opacity: 1; transition-delay: 0s;
}
.step:hover .step__text b, .step:focus-visible .step__text b, .step.is-active .step__text b { transform: scale(1.04); }

/* ============ БЛОК 5 — РАСЦЕНКИ ============ */
/* таблица цен */
.price-scroll { margin-top: 32px; }
.price-table { width: 100%; border-collapse: collapse; font-size: 16px; }
.price-table th, .price-table td { padding: 14px 20px; text-align: left; }
.price-table thead th {
  font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase;
  color: var(--muted);
  border-bottom: 1px solid var(--line-strong);
}
.price-table tbody tr { background: var(--bg); transition: background .2s; }
.price-table tbody tr:nth-child(odd) { background: var(--surface); }
.price-table tbody th { font-weight: 700; }
.price-table tbody td { color: var(--text-2); }
/* строка под курсором подсвечивается: в таблице из девяти строк легко потерять свою */
.price-table tbody tr:hover { background: rgba(242, 169, 59, .16); }
.price-table tbody tr:hover th { color: var(--accent-ink); }
.price-table tbody tr:hover td { color: var(--text); }

.price-hint { display: none; }

.price-legal { margin-top: 20px; font-size: 14px; line-height: 1.5; color: var(--muted); }

.price-excl {
  margin-top: 28px; padding: 24px 28px;
  border: 1px dashed var(--line-strong);
  border-radius: 20px;
}
.price-excl__title { display: block; margin-bottom: 14px; font-size: 16px; }
.price-excl ul {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px 28px;
  margin: 0; padding: 0; list-style: none;
}
.price-excl li {
  position: relative; padding-left: 24px;
  font-size: 15px; line-height: 1.4; color: var(--text-2);
}
.price-excl li::before {
  content: ""; position: absolute; left: 4px; top: .55em;
  width: 10px; height: 1.5px; background: var(--line-strong);
}

.price-cta { margin-top: 28px; }

/* ============ БЛОК 5 — УСЛОВИЯ РАБОТ ============ */
/* цветная полоса во всю ширину: рядом стоят расценки, и два белых блока подряд сливались */
.section--band {
  padding-block: 110px;
  background: var(--surface);
}
.section--band + .section { padding-top: 110px; }

.scheme {
  padding: 14px;
  background: var(--bg);
  border-radius: var(--r-card);
}
/* кадрирована по самому проколу: горизонтальная полоса без белых полей,
   сверху дорога с машинами, снизу скважина с расширителем и трубой */
.scheme__img { display: block; width: 100%; height: auto; border-radius: 16px; }
/* труба «протягивается» при наведении на схему */


.cond {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 40px;
  margin-top: 36px;
}
/* без фона: после плотной схемы нужен воздух, хватит тонкой линии сверху */
.cond__item {
  position: relative;
  display: flex; flex-direction: column; gap: 6px;
  padding: 22px 0;
  border-top: 1px solid var(--line-strong);
  transition: transform .25s ease;
}
/* линия сверху наливается янтарным слева направо */
.cond__item::before {
  content: ""; position: absolute; left: 0; top: -1px;
  width: 0; height: 2px; background: var(--accent);
  transition: width .35s ease;
}
.cond__item:hover { transform: translateX(6px); }
.cond__item:hover::before { width: 100%; }
.cond__item:hover .cond__title { color: var(--accent-ink); }
.cond__title { font-size: 18px; line-height: 1.25; transition: color .25s; }
.cond__text { font-size: 15px; line-height: 1.45; color: var(--muted); }

/* сравнение: траншея против прокола */
.vs {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
  margin-top: 44px;
}
.vs__col {
  padding: 26px 28px 28px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 20px;
}
.vs__col--ours { border-color: var(--accent); box-shadow: 0 10px 34px rgba(242, 169, 59, .18); }
.vs__head {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  font-size: 19px; color: var(--muted);
}
.vs__col--ours .vs__head { color: var(--text); }
.vs__mark {
  padding: 4px 10px; border-radius: 999px;
  background: var(--accent); color: #14171C;
  font-size: 11px; font-style: normal; font-weight: 700;
  letter-spacing: .06em; text-transform: uppercase;
}
.vs__list { margin: 16px 0 0; padding: 0; list-style: none; }
.vs__list li {
  position: relative;
  padding: 9px 0 9px 30px;
  font-size: 15px; line-height: 1.4; color: var(--text-2);
}
/* минус у траншеи, галочка у прокола */
.vs__col .vs__list li::before {
  content: ""; position: absolute; left: 4px; top: 1.05em;
  width: 12px; height: 2px; border-radius: 1px; background: #C2554A;
}
.vs__col--ours .vs__list li { color: var(--text); }
.vs__col--ours .vs__list li::before {
  top: .75em; left: 2px;
  width: 15px; height: 9px; background: none; border-radius: 0;
  border-left: 2px solid #2FB35C; border-bottom: 2px solid #2FB35C;
  transform: rotate(-45deg);
}

/* ============ БЛОК 6 — ОБЪЕКТЫ ============ */
.projects { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

/* карточка — вертикальный кадр с текстом поверх, как первый экран */
.proj {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: var(--r-card);
  overflow: hidden;
  isolation: isolate;
  background: #14171C;
}
.proj__img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform .7s ease;
}
/* затемнение снизу: без него подписи тонут в фотографии */
.proj::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg,
    rgba(20,23,28,0) 30%, rgba(20,23,28,.5) 58%, rgba(20,23,28,.93) 100%);
  transition: opacity .4s;
}
.proj:hover .proj__img { transform: scale(1.06); }

.proj__body {
  position: absolute; left: 0; right: 0; bottom: 0; z-index: 1;
  display: flex; flex-direction: column;
  padding: 26px 24px 24px;
  color: #F2F1EC;
}
.proj__date {
  font-size: 13px; font-weight: 600;
  letter-spacing: .04em; text-transform: uppercase;
  color: var(--accent);
}
.proj__place {
  margin-top: 6px;
  font-size: clamp(20px, 1.6vw, 24px); font-weight: 800;
  line-height: 1.15; letter-spacing: -.02em;
}
/* точка захвата */
.proj__hook {
  position: relative;
  margin-top: 14px; padding: 11px 16px 11px 34px;
  border-radius: 16px;
  background: rgba(242, 241, 236, .12);
  -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
  border: 1px solid rgba(242, 241, 236, .2);
  font-size: 14px; line-height: 1.35; color: #F2F1EC;
}
.proj__hook::before {
  content: ""; position: absolute; left: 15px; top: 1.15em;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--accent);
}

/* точки-индикаторы ленты кейсов: нужны только на телефоне */
.projects__dots { display: none; }

.projects__note { margin-top: 20px; font-size: 14px; color: var(--muted); }

/* ряд лучших кадров: без подписей — доказательство объёма работ.
   Лента с прокруткой: в экран помещаются три кадра, остальные листаются стрелками */
.shots-wrap { position: relative; margin-top: 40px; }
.shots {
  display: flex; gap: 16px;
  overflow-x: auto; -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
.shots::-webkit-scrollbar { display: none; }
.shot { flex: 0 0 calc((100% - 32px) / 3); scroll-snap-align: start; }

.shots__nav {
  position: absolute; top: 50%; z-index: 2;
  width: 52px; height: 52px; border-radius: 50%;
  display: grid; place-items: center;
  border: 1px solid var(--line);
  background: #fff; color: var(--text);
  box-shadow: 0 8px 24px rgba(20, 23, 28, .16);
  cursor: pointer;
  transition: background .2s, transform .2s, opacity .2s;
}
.shots__nav--prev { left: -26px; transform: translateY(-50%); }
.shots__nav--next { right: -26px; transform: translateY(-50%); }
.shots__nav:hover { background: var(--accent); }
.shots__nav[disabled] { opacity: 0; pointer-events: none; }
.shot {
  margin: 0; overflow: hidden;
  border-radius: 20px;
  background: var(--surface);
}
.shot img {
  width: 100%; aspect-ratio: 1; object-fit: cover;
  transition: transform .6s ease;
}
.shot:hover img { transform: scale(1.06); }
.shots__note { margin-top: 14px; font-size: 13px; color: var(--muted); }
.projects__cta { margin-top: 24px; border: 0; font-family: inherit; cursor: pointer; }

/* ============ БЛОК 8 — ГАРАНТИИ ============ */
/* тёмная карточка: самый серьёзный по смыслу блок должен весить больше соседей,
   а тонированная полоса уже занята «Условиями работ» */
.guar {
  --text: #F2F1EC;
  --text-2: #D9D8D2;
  --muted: #A7A9AE;
  --line: rgba(242, 241, 236, .16);
  color: var(--text);
  padding: 64px;
  background: #0E1014;
  border-radius: var(--r-card);
}
.guar__head { max-width: 900px; }
.guar__title { font-size: clamp(28px, 3.2vw, 48px); }
.guar__lead { margin-top: 18px; max-width: 620px; font-size: 18px; line-height: 1.5; color: var(--text-2); }

.risks { margin: 48px 0 0; padding: 0; list-style: none; }
.risk {
  position: relative;
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 28px;
  align-items: baseline;
  padding: 26px 0;
  border-top: 1px solid var(--line);
  transition: background .3s;
}
.risk:last-child { border-bottom: 1px solid var(--line); }
/* янтарная линия прочерчивается по верхней границе строки */
.risk::before {
  content: ""; position: absolute; left: 0; top: -1px;
  width: 0; height: 2px; background: var(--accent);
  transition: width .45s ease;
}
.risk:last-child::after {
  content: ""; position: absolute; left: 0; bottom: -1px;
  width: 0; height: 2px; background: var(--accent);
  transition: width .45s ease;
}
.risk__num { font-size: 14px; font-weight: 700; letter-spacing: .08em; color: var(--accent); }
/* страх — приглушён и зачёркивается при наведении: этот вопрос мы снимаем */
.risk__fear {
  position: relative; display: inline-block;
  font-size: clamp(19px, 1.7vw, 24px); font-weight: 700;
  line-height: 1.2; letter-spacing: -.02em;
  color: var(--text-2);
  transition: color .3s, opacity .3s;
}
.risk__fear::after {
  content: ""; position: absolute; left: 0; top: .58em;
  width: 0; height: 2px; background: currentColor;
  transition: width .4s ease .1s;
}
.risk__answer { font-size: 16.5px; line-height: 1.5; color: var(--muted); transition: color .3s; }

.risk:hover { background: rgba(242, 241, 236, .05); }
.risk:hover::before, .risk:last-child:hover::after { width: 100%; }
.risk:hover .risk__fear { color: var(--muted); opacity: .75; }
.risk:hover .risk__fear::after { width: 100%; }
.risk:hover .risk__answer { color: var(--text); }

.guar__foot {
  display: flex; align-items: flex-end; justify-content: space-between; gap: 32px 48px;
  flex-wrap: wrap;
  margin-top: 48px;
}
.legal { display: flex; flex-wrap: wrap; gap: 14px 48px; margin: 0; }
.legal__item { display: flex; flex-direction: column; gap: 6px; }
.legal dt { font-size: 13px; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
.legal dd { margin: 0; font-size: 16px; line-height: 1.4; color: var(--text); }
.guar__btn { border: 0; font-family: inherit; cursor: pointer; flex-shrink: 0; }

/* ============ БЛОК 9 — КОНТАКТЫ ============ */
.contacts { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.contacts__form {
  display: flex; flex-direction: column; gap: 18px;
  padding: 36px;
  background: var(--surface);
  border-radius: var(--r-card);
}
.field__input--area { height: auto; min-height: 104px; padding: 16px 20px; line-height: 1.45; resize: vertical; }
.contacts__submit {
  height: 62px; margin-top: 6px;
  border: 0; border-radius: 999px;
  background: var(--accent); color: #14171C;
  font: inherit; font-size: 17px; font-weight: 700;
  cursor: pointer;
  transition: background .2s, transform .2s;
}
.contacts__submit:hover { background: var(--accent-hover); transform: translateY(-1px); }
.contacts__submit:disabled { opacity: .45; cursor: not-allowed; transform: none; }
.contacts__note { font-size: 14px; line-height: 1.45; color: var(--muted); }
.contacts__done { display: flex; flex-direction: column; gap: 6px; }
.contacts__done b { font-size: 19px; }
.contacts__done span { font-size: 15px; line-height: 1.5; color: var(--muted); }
.contacts__done a { color: var(--accent-ink); font-weight: 700; }

.contacts__side { display: flex; flex-direction: column; }
.cnt {
  position: relative;
  display: flex; flex-direction: column; gap: 6px;
  padding: 22px 0;
  border-top: 1px solid var(--line);
}
.cnt:last-child { border-bottom: 1px solid var(--line); }
.cnt__label { font-size: 12px; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.cnt__value, .cnt__plain { font-size: 19px; font-weight: 700; letter-spacing: -.01em; }
/* подпись канала связи рядом со значением, а не отдельной строкой */
.cnt__value i { margin-left: 8px; font-size: 13px; font-style: normal; font-weight: 500; color: var(--muted); }
.cnt__value { transition: color .25s; }
.cnt__value:hover { color: var(--accent-ink); }
.cnt__value:hover i { color: var(--accent-ink); }
.cnt__msgrs { display: flex; gap: 10px; margin-top: 2px; }
.cnt__msg {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 16px 8px 8px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 15px; font-weight: 600;
  transition: border-color .25s, background .25s;
}
.cnt__msg:hover { border-color: var(--line-strong); background: var(--surface); }
.cnt__msg .msg { width: 28px; height: 28px; margin: 0; }

.maps { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
.map { margin: 0; }
.map__frame {
  display: block; width: 100%; height: 320px;
  border: 0; border-radius: var(--r-card);
  background: var(--surface);
}
/* адреса текстом — подстраховка: во встроенном файле виджет может не отрисоваться */
.map__cap { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; margin-top: 12px; }
.map__cap b { font-size: 17px; }
.map__cap a {
  font-size: 15px; color: var(--text-2);
  text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--line-strong);
  transition: color .25s;
}
.map__cap a:hover { color: var(--accent-ink); text-decoration-color: var(--accent); }

/* ============ ПОДВАЛ ============ */
.footer { border-top: 1px solid var(--line); padding-block: 28px 36px; }
.footer__inner {
  display: flex; align-items: center; justify-content: space-between; gap: 12px 32px;
  flex-wrap: wrap;
  font-size: 14px; color: var(--muted);
}
.footer__links { display: flex; gap: 24px; flex-wrap: wrap; }
.footer__links a {
  text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--line-strong);
  transition: color .25s;
}
.footer__links a:hover { color: var(--accent-ink); text-decoration-color: var(--accent); }

/* ============ ОКНО «ЗАКАЗАТЬ ЗВОНОК» ============ */
.modal { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px; }
.modal__backdrop {
  position: absolute; inset: 0;
  background: rgba(20, 23, 28, .6);
  -webkit-backdrop-filter: blur(4px);
          backdrop-filter: blur(4px);
}
.modal__box {
  position: relative;
  width: 100%; max-width: 460px;
  max-height: calc(100vh - 40px); overflow-y: auto;
  padding: 36px 36px 32px;
  background: var(--bg);
  border-radius: var(--r-card);
  box-shadow: 0 24px 70px rgba(20, 23, 28, .35);
  animation: modalIn .25s ease;
}
@keyframes modalIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
.modal__close {
  position: absolute; top: 16px; right: 16px;
  width: 36px; height: 36px; border-radius: 50%;
  display: grid; place-items: center;
  border: 0; background: var(--surface); color: var(--text-2);
  cursor: pointer; transition: background .2s, color .2s;
}
.modal__close:hover { background: var(--line); color: var(--text); }
.modal__title { font-size: 28px; font-weight: 800; letter-spacing: -.02em; }
.modal__lead { margin-top: 8px; font-size: 15px; color: var(--muted); }
.modal__form { display: flex; flex-direction: column; gap: 18px; margin-top: 24px; }
.modal__submit {
  height: 58px; border: 0; border-radius: 999px;
  background: var(--accent); color: #14171C;
  font: inherit; font-size: 17px; font-weight: 700;
  cursor: pointer; transition: background .2s, transform .2s;
}
.modal__submit:hover { background: var(--accent-hover); transform: translateY(-1px); }
.modal__submit:disabled { opacity: .45; cursor: not-allowed; transform: none; }
.modal__done { display: flex; flex-direction: column; gap: 8px; margin-top: 24px; }
.modal__done b { font-size: 19px; }
.modal__done span { font-size: 15px; line-height: 1.5; color: var(--muted); }
.modal__done a { color: var(--accent-ink); font-weight: 700; }
:global(body.is-locked) { overflow: hidden; }

/* пометка «по желанию» у необязательного поля */
.field__opt { font-style: normal; color: var(--muted); }

/* ============ ЛИПКАЯ КНОПКА НА ТЕЛЕФОНЕ ============ */
.sticky-cta { display: none; }

@media (max-width: 768px) {
  .sticky-cta {
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 50;
    display: flex; align-items: center; gap: 10px;
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
    background: rgba(255, 255, 255, .92);
    -webkit-backdrop-filter: blur(14px);
            backdrop-filter: blur(14px);
    border-top: 1px solid var(--line);
    transform: translateY(100%);
    transition: transform .3s ease;
  }
  .sticky-cta.is-on { transform: none; }
  .sticky-cta__btn {
    flex: 1;
    display: inline-flex; align-items: center; justify-content: center;
    height: 52px; padding: 0 20px;
    border-radius: 999px;
    background: var(--accent); color: #14171C;
    font-size: 16px; font-weight: 700;
  }
  .sticky-cta__call {
    flex-shrink: 0;
    width: 52px; height: 52px; border-radius: 50%;
    display: grid; place-items: center;
    border: 1.5px solid var(--line-strong);
    color: var(--text);
  }
  /* чтобы полоса не закрывала конец страницы */
  .hdd { padding-bottom: 76px; }
}

@media (prefers-reduced-motion: reduce) {
  .sticky-cta { transition: none; }
  .cond__item, .cond__item::before { transition: none; }
  .cond__item:hover { transform: none; }
  :global(html) { scroll-behavior: auto; }
  .btn-pill__icon, .quiz__step.is-active { transition: none; animation: none; }
  .marquee { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
  .marquee__track { animation: none; padding-inline: var(--gutter); }
  .typing i, .hero__pulse::after, .steps__line i.is-cur::after { animation: none; }
  .steps__line i.is-cur, .step .step__text b { transform: none !important; }
  .risk, .risk::before, .risk__fear, .risk__fear::after, .risk__answer { transition: none; }
}

/* ============ АДАПТИВ ============ */
@media (max-width: 1280px) {
  .steps__cols { grid-template-columns: repeat(6, 1fr); }
  .step { grid-column: span 2; min-height: 320px; }
  .step:nth-child(4), .step:nth-child(5) { grid-column: span 3; border-top: 1px solid rgba(242,241,236,.28); }
  .step:nth-child(4) { border-left: 0; }
  .steps__line { display: none; }
}
@media (max-width: 1080px) {
  .cond { grid-template-columns: repeat(2, 1fr); gap: 0 32px; }
  .vs { grid-template-columns: 1fr; }
  .projects { grid-template-columns: repeat(2, 1fr); }
  .contacts { grid-template-columns: 1fr; }

  .nav { display: none; }
  .hero { min-height: auto; padding-top: 170px; }
  .hero__aside { justify-self: stretch; max-width: none; }
  .hero__content { grid-template-columns: 1fr; gap: 32px; }
  .section__head { grid-template-columns: 1fr; gap: 20px; margin-bottom: 48px; }
  .trust__item b { font-size: 26px; }
  .trust__item { padding: 24px 20px 28px; gap: 14px; }
  .trust__logo { width: 52px; height: 52px; }
  .trust__logo img { max-width: 28px; max-height: 28px; }
  .trust__logo--rzd img { max-width: 34px; }

  /* менеджер — компактной строкой над вопросами */
  .quiz { grid-template-columns: 1fr; }
  .quiz__side { order: -1; padding: 8px 8px 0; }
  .mgr { display: flex; align-items: flex-start; gap: 16px; }
  .mgr__photo, .mgr__photo img { width: 56px; height: 56px; flex-shrink: 0; }
  .mgr__bubble { margin-top: 0; flex: 1; }
  .mgr__bubble::before {
    left: -8px; top: 18px;
    border: 8px solid transparent; border-left: 0;
    border-right-color: var(--bg);
  }
  .mgr__msg { min-height: 0; }
  .quiz__aside-foot { display: none; }
  .quiz__main { min-height: 0; padding: 48px 32px 32px; }
}

@media (max-width: 768px) {
  .price-excl ul { grid-template-columns: 1fr; }
  .shot { flex: 0 0 calc((100% - 16px) / 2); }

  /* ответ уходит под страх: в две колонки на узком экране обе строки становятся нечитаемыми */
  .guar { padding: 40px 28px; }
  .risk { grid-template-columns: 48px minmax(0, 1fr); gap: 10px 16px; }
  .risk__answer { grid-column: 2; }
  .guar__foot { flex-direction: column; align-items: stretch; }

  .steps { padding-top: 72px; }
  .steps__stage { padding-top: 0; background: #0E1014; margin-top: 32px; }
  .steps__stage::after { display: none; }
  .steps__photo {
    position: relative; display: block; height: 240px; object-fit: cover; object-position: 30% 100%;
    -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 30%, #000 75%, transparent 100%);
            mask-image: linear-gradient(to bottom, transparent 0, #000 30%, #000 75%, transparent 100%);
  }
  .steps__inner { padding-top: 8px; }
  /* вертикальный таймлайн */
  .steps__cols { display: block; position: relative; padding-left: 30px; }
  /* вертикальный таймлайн: серая линия и янтарная заливка поверх неё,
     высоту заливки ведёт JS по мере прокрутки — как горизонтальная полоса на компьютере */
  .steps__cols::before {
    content: ""; position: absolute; left: 6px; top: 30px; bottom: 30px;
    width: 2px; background: rgba(242,241,236,.28);
  }
  .steps__cols::after {
    content: ""; position: absolute; left: 6px; top: 30px;
    width: 2px; height: calc(var(--vfill, 1) * (100% - 60px));
    background: var(--accent);
    transition: height .5s ease;
  }
  .step, .step:nth-child(4), .step:nth-child(5) {
    min-height: 0; padding: 20px 16px 22px; border: 0; border-radius: 14px;
  }
  .step::before {
    content: ""; position: absolute; left: -30px; top: 26px; z-index: 1;
    width: 14px; height: 14px; border-radius: 50%;
    background: #14171C; border: 2px solid rgba(242,241,236,.55);
    transition: background .3s, border-color .3s, transform .3s;
  }
  /* пройденные этапы залиты, текущий крупнее и пульсирует */
  .step.is-seen::before { background: var(--accent); border-color: var(--accent); }
  .step.is-cur::before { transform: scale(1.35); }
  .step.is-cur::after {
    content: ""; position: absolute; left: -30px; top: 26px; z-index: 0;
    width: 14px; height: 14px; border-radius: 50%;
    background: var(--accent); animation: pulse 1.6s ease-out infinite;
  }
  .steps.is-live .step { opacity: .5; transition: opacity .35s, background .35s; }
  .steps.is-live .step.is-cur { opacity: 1; background: rgba(255,255,255,.08); }
  .step__title { order: -1; margin-top: 6px; padding-top: 0; font-size: 26px; }
  .step__num { order: -2; }
  .step__sub { order: -1; margin-top: 2px; font-size: 16px; }
  .step__text { margin-top: 10px; font-size: 16px; }
  .steps.is-armed .step__sub { filter: none; opacity: 1; }
  .steps__cols:hover .step:not(:hover) { opacity: 1; }
  .steps__cta { padding: 20px; margin-top: 12px; }
  .steps__btn { width: 100%; justify-content: center; }
}

@media (max-width: 640px) {
  .hdd { --gutter: 16px; }
  .header__inner { flex-wrap: wrap; row-gap: 10px; gap: 12px; }
  .contact { gap: 18px; }
  .msg--max { margin-right: -8px; }
  .btn-cta { width: 100%; text-align: center; padding: 12px 16px; }

  .hero-wrap { padding: 8px 8px 0; }
  /* нижний отступ обязателен: без него последний кейс упирается в скруглённый угол карточки */
  .hero { border-radius: 24px; padding: 20px 12px 18px; }
  /* Кадр широкий (1672x941), а блок на телефоне высотой полторы тысячи точек:
     cover брал из фотографии полоску шириной 234 точки и растягивал втрое — отсюда мыло.
     Отдаём фотографии верхние 560 точек, ниже и так тёмный фон, на котором лежит текст. */
  .hero__media { bottom: auto; height: 560px; }
  .hero__media img, .hero__media video { height: 560px; object-position: 30% 62%; }
  .hero { background: #14171C; }
  .hero::after {
    background: linear-gradient(180deg,
      rgba(20,23,28,.18) 0, rgba(20,23,28,0) 150px,
      rgba(20,23,28,.4) 300px, rgba(20,23,28,.88) 420px, #14171C 500px);
  }
  .hero__badges { position: static; margin-bottom: 8px; }
  .hero__badges li { font-size: 12px; padding: 6px 10px; }
  /* главное преимущество нужно и на телефоне, но белой карточкой оно забивало
     плашки с выгодами — на узких экранах оформляем его такой же тёмной плашкой */
  .hero__callout {
    position: static;
    display: inline-flex;
    /* hero — колоночный flex, без этого плашка растянулась бы во всю ширину */
    align-self: flex-start;
    align-items: center; gap: 10px;
    margin-bottom: 110px;
    padding: 7px 14px 7px 11px;
    border-radius: 999px;
    background: rgba(14, 16, 20, .55);
    -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
    border: 1px solid rgba(242, 241, 236, .16);
    box-shadow: none;
    color: var(--text);
  }
  .hero__callout b { display: inline; font-size: 12px; color: var(--accent); }
  /* «Движение не останавливаем» на узком экране только удлиняет плашку — главное уже сказано */
  .hero__callout span:not(.hero__pulse) { display: none; }
  .hero__pulse { width: 8px; height: 8px; }
  .hero__content { padding-inline: 8px; }
  .hero__aside { padding: 20px 16px; margin-inline: -8px; }
  .hero__lead { font-size: 17px; }
  .btn-pill { width: 100%; justify-content: space-between; font-size: 17px; gap: 12px; padding-left: 22px; }
  .btn-pill__icon { width: 48px; height: 48px; }
  .trust { grid-template-columns: 1fr; }
  .trust__label { padding: 18px 0 2px; }
  .trust__item { border-left: 0; border-top: 1px solid rgba(242,241,236,.18); padding: 13px 0; gap: 12px; }
  .trust__label + .trust__item { border-top: 0; }
  .trust__item b { font-size: 19px; }
  .trust__item span { font-size: 14px; }
  .trust__logo { width: 44px; height: 44px; }
  .trust__logo img { max-width: 24px; max-height: 24px; }
  .trust__logo--rzd img, .trust__logo--misk img { max-width: 28px; max-height: 28px; }

  .section { padding-top: 72px; }
  .section:last-of-type { padding-bottom: 72px; }

  .quiz { padding: 8px; border-radius: 22px; }
  .quiz__main { padding: 36px 18px 20px; border-radius: 16px; }
  .quiz__opts, .quiz__form { grid-template-columns: 1fr; gap: 10px; }
  .quiz__opts--compact { grid-template-columns: repeat(2, 1fr); }
  .quiz__form { gap: 16px; }
  .opt { min-height: 64px; padding: 14px 18px; font-size: 16px; }
  .field--wide { grid-column: auto; }
  .seg { justify-self: stretch; grid-auto-columns: 1fr; }
  .seg span { padding: 10px 8px; text-align: center; }
  .quiz__nav { flex-direction: column; align-items: stretch; padding-top: 28px; }
  .quiz__count { text-align: center; }
  .quiz__next { flex: 1; justify-content: center; height: 58px; }
  .quiz__back { width: 58px; height: 58px; flex-shrink: 0; }
  .result div { grid-template-columns: 1fr; gap: 4px; padding: 14px 18px; }
  .mgr__bubble { padding: 14px 16px; }
  .mgr__role { display: none; }
  .mgr__msg { margin-top: 6px; font-size: 14px; }

  .marquee { -webkit-mask-image: none; mask-image: none; }
  .client { flex-basis: 260px; min-height: 160px; padding: 20px; }

  /* схема горизонтальная по своей природе: втиснутая в 375 px она превращается
     в нечитаемую полоску. Даём ей минимальный размер и листаем вбок, как таблицу цен */
  .scheme { padding: 8px; border-radius: 22px; }
  /* во всю ширину полоса схлопнулась бы в 130 точек высотой и стала нечитаемой:
     показываем её середину — от приямка до приямка — крупнее */
  .scheme__img { height: 200px; object-fit: cover; object-position: 50% 50%; border-radius: 16px; }
  .section--band { padding-block: 72px; }
  .section--band + .section { padding-top: 72px; }
  .cond { grid-template-columns: 1fr; margin-top: 24px; }
  .vs { margin-top: 28px; gap: 14px; }
  .vs__col { padding: 20px; }
  .cond__item { padding: 18px 0; }

  /* кейсы листаются вбок по одному, а не идут длинной стопкой */
  .projects {
    display: flex; gap: 12px;
    margin-inline: calc(var(--gutter) * -1);
    padding-inline: var(--gutter);
    overflow-x: auto; -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: var(--gutter);
    scrollbar-width: none;
  }
  .projects::-webkit-scrollbar { display: none; }
  .proj { flex: 0 0 78vw; scroll-snap-align: start; }
  .projects__dots { display: flex; justify-content: center; gap: 8px; margin-top: 14px; }
  .projects__dots i {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--line-strong);
    transition: background .25s, transform .25s;
  }
  .projects__dots i.is-on { background: var(--accent); transform: scale(1.3); }

  /* на телефоне листаем пальцем, стрелки только мешали бы */
  .shots-wrap { margin-top: 28px; }
  .shots {
    gap: 10px;
    margin-inline: calc(var(--gutter) * -1);
    padding-inline: var(--gutter);
    scroll-padding-inline: var(--gutter);
  }
  .shots__nav { display: none; }
  .shot { flex: 0 0 44vw; border-radius: 16px; }

  .projects__cta { width: 100%; justify-content: center; }

  .contacts__form { padding: 20px 16px; border-radius: 22px; }
  .contacts__submit { width: 100%; }
  .maps { grid-template-columns: 1fr; gap: 20px; }
  /* карта в одну колонку узкая — фиксируем высоту, иначе она вырождается в полоску */
  .map__frame { height: 260px; border-radius: 22px; }
  .footer__inner { flex-direction: column; align-items: flex-start; gap: 10px; }
  .footer__links { flex-direction: column; gap: 8px; }

  .guar { padding: 32px 18px; border-radius: 22px; }
  .risks { margin-top: 32px; }
  .risk { padding: 20px 0; }
  .legal { gap: 16px; }
  .guar__btn { width: 100%; justify-content: center; }

  /* таблица не влезает — листаем её вбок, первая колонка остаётся на месте */
  .price-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .price-table { min-width: 460px; }
  .price-table th, .price-table td { padding: 12px 14px; font-size: 15px; }
  .price-table th:first-child { position: sticky; left: 0; background: inherit; }
  .price-table thead th:first-child { background: var(--bg); }
  .price-hint { display: block; margin-top: 10px; font-size: 12px; color: var(--muted); }
  .price-excl { padding: 20px; }
  .price-cta { width: 100%; justify-content: center; }
}
</style>

<template>
<section class="hero-wrap" id="hero">
  <div class="hero" data-hero>

    <div class="hero__bg" aria-hidden="true">
      <img decoding="sync" src="/dgu/images/4cb4251f853540df.webp" alt="" width="1600" height="900" fetchpriority="high">
      <i class="hero__shade"></i>
    </div>

    <div class="hero__content">
      <ul class="hero__badges" aria-label="Коротко о нас">
        <li><b>с 2013 года</b> на рынке</li>
        <li><b>5000+</b> объектов электроснабжения</li>
        <li><b>30–2000 кВт</b> под ключ</li>
      </ul>

      <h1 class="hero__title">
        <span class="h1-line">Автономное и бесперебойное</span>
        <span class="h1-line h1-line--mark"><span>электроснабжение под ключ</span></span>
        <span class="h1-line h1-line--sub">Проектирование → Поставка → Монтаж → Сервис</span>
      </h1>

      <p class="hero__lead">Резервное энергоснабжение под ключ. Внедряем системы энергонезависимости на базе ДГУ (от 30 кВт с АВР) и промышленных ИБП. Гарантируем бесперебойную работу ТЦ, БЦ, АЗС, складов, отелей, больниц и коттеджных поселков.</p>

      <ul class="hero__solutions" aria-label="Решения">
        <li><button type="button" data-solution="commerce" @click="$emit('solution', 'commerce')">Для бизнеса</button></li>
        <li><button type="button" data-solution="industry" @click="$emit('solution', 'industry')">Для промышленности</button></li>
        <li><button type="button" data-solution="construction" @click="$emit('solution', 'construction')">Для строительства</button></li>
        <li><button type="button" data-solution="infra" @click="$emit('solution', 'infra')">Для инфраструктуры</button></li>
      </ul>

      <div class="hero__cta">
        <a class="btn-pill" href="#quiz">
          <span>Предложить решение</span>
          <span class="btn-pill__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </span>
        </a>
        <p class="hero__offer"><b>Ответим за 30 минут</b> в рабочее время. Расчёт готовим после уточнения нагрузки</p>
      </div>
    </div>

    <div class="trust">
      <div class="trust__inner">
        <div class="trust__label">Заказчики компании:</div>
        <div class="trust__item">
          <span class="trust__logo"><img decoding="async" src="/dgu/images/15a23ed5d414c337.png" alt="" width="160" height="160"></span>
          <div class="trust__text"><b>Россети</b><span>Электросетевой комплекс</span></div>
        </div>
        <div class="trust__item">
          <span class="trust__logo"><img decoding="async" src="/dgu/images/bdace6670652bb9b.png" alt="" width="160" height="160"></span>
          <div class="trust__text"><b>Газпром</b><span>Нефть и газ</span></div>
        </div>
        <div class="trust__item">
          <span class="trust__logo"><img decoding="async" src="/dgu/images/af50752acc1ced3a.png" alt="" width="160" height="160"></span>
          <div class="trust__text"><b>РЖД</b><span>Железнодорожный транспорт</span></div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup>
defineEmits(['solution'])
</script>

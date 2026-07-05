<template>
  <header class="site-header">
    <div class="header-inner">
      <NuxtLink class="brand-link" to="/" aria-label="На главную">
        <img
          src="/img/image.png"
          alt="Энергосистемы"
          class="brand-logo"
          width="300"
          height="58"
          fetchpriority="high"
        >
      </NuxtLink>

      <address class="header-contacts" aria-label="Контакты">
        <div class="contact-item contact-item-phone">
          <span class="contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M6.6 4.5 8.9 4c.7-.1 1.4.3 1.6 1l.8 2.5c.2.6 0 1.2-.5 1.6l-1.1.8c.9 1.8 2.4 3.4 4.2 4.3l.9-1.1c.4-.5 1-.7 1.6-.5l2.5.8c.7.2 1.1.9 1 1.6l-.5 2.3c-.1.7-.7 1.2-1.4 1.2h-.5C10.9 18.5 5.5 13.1 5.5 6.5V6c0-.7.4-1.3 1.1-1.5Z" />
            </svg>
          </span>
          <span class="contact-copy">
            <span class="contact-label">Звонок по проекту</span>
            <span class="phone-links">
              <a href="tel:+74951780118">+7 (495) 178-01-18</a>
              <a href="tel:+79251640560">+7 (925) 164-05-60</a>
            </span>
          </span>
        </div>

        <div class="contact-item contact-item-offices">
          <span class="contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M12 3.8a5.7 5.7 0 0 0-5.7 5.7c0 4.2 5.7 10.7 5.7 10.7s5.7-6.5 5.7-10.7A5.7 5.7 0 0 0 12 3.8Zm0 7.9a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z" />
            </svg>
          </span>
          <span class="contact-copy">
            <span class="contact-label">Офисы</span>
            <span class="office-addresses">
              <span class="office-address">
                <span class="office-city">Солнечногорск</span>
                <span>Промышленная улица, с. 5, Солнечногорск, Московская область</span>
              </span>
              <span class="office-address">
                <span class="office-city">Москва</span>
                <span>улица Руставели, 14с6</span>
              </span>
            </span>
          </span>
        </div>

        <div class="contact-item">
          <span class="contact-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <path d="M4.8 6.5h14.4c.8 0 1.3.6 1.3 1.3v8.4c0 .8-.6 1.3-1.3 1.3H4.8c-.8 0-1.3-.6-1.3-1.3V7.8c0-.8.6-1.3 1.3-1.3Zm.4 2.1 6.1 4.1c.4.3.9.3 1.3 0l6.1-4.1" />
            </svg>
          </span>
          <span class="contact-copy">
            <span class="contact-label">Почта</span>
            <a class="mail-link" href="mailto:sales@e-systems.su?cc=inbox@e-systems.su">sales@e-systems.su</a>
          </span>
        </div>
      </address>

      <div class="header-actions">
        <NuxtLink class="hdd-link" to="/services/hdd">
          ГНБ под ключ
        </NuxtLink>
        <button class="request-button" type="button" @click="$emit('open-contact-modal')">
          Рассчитать проект
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  emits: ["open-contact-modal"],
};
</script>

<style scoped>
.site-header {
  position: relative;
  z-index: 30;
  background:
    linear-gradient(180deg, rgba(248, 251, 253, 0.92), rgba(255, 255, 255, 1)),
    #ffffff;
  border-bottom: 1px solid #d8e4ed;
  box-shadow: 0 8px 28px rgba(16, 32, 48, 0.06);
}

.header-inner {
  width: min(100% - 48px, 1280px);
  min-height: 92px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(210px, 280px) minmax(0, 1fr) auto;
  align-items: center;
  gap: clamp(18px, 2.6vw, 34px);
  padding: 16px 0;
}

.brand-link {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  border-radius: 8px;
}

.brand-link:focus-visible,
.header-contacts a:focus-visible,
.hdd-link:focus-visible,
.request-button:focus-visible {
  outline: 3px solid rgba(45, 122, 172, 0.3);
  outline-offset: 4px;
}

.brand-logo {
  display: block;
  width: min(300px, 100%);
  height: auto;
  object-fit: contain;
}

.header-contacts {
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(176px, 0.72fr) minmax(260px, 1.3fr) minmax(205px, 0.84fr);
  gap: 10px;
  align-items: stretch;
  margin: 0;
  font-style: normal;
}

.contact-item {
  min-width: 0;
  min-height: 58px;
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid rgba(175, 198, 216, 0.62);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
}

.contact-item-phone {
  grid-template-columns: 34px minmax(0, 1fr);
}

.contact-item-offices {
  align-items: flex-start;
}

.contact-icon {
  width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #edf6fc;
  color: #2d7aac;
}

.contact-icon svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.contact-copy {
  min-width: 0;
  display: grid;
  gap: 2px;
}

.contact-label {
  color: #647789;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
}

.phone-links {
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 4px 10px;
}

.phone-links a,
.mail-link,
.office-address {
  min-width: 0;
  color: #142233;
  font-size: 13px;
  font-weight: 750;
  line-height: 1.28;
  text-decoration: none;
}

.office-addresses {
  min-width: 0;
  display: grid;
  gap: 6px;
}

.phone-links a,
.mail-link {
  white-space: nowrap;
}

.office-address {
  display: grid;
  gap: 2px;
  white-space: normal;
}

.office-city {
  color: #2d7aac;
  font-size: 11px;
  font-weight: 850;
  line-height: 1.1;
}

.mail-link {
  color: #2d7aac;
  overflow-wrap: normal;
  white-space: nowrap;
  word-break: keep-all;
}

.phone-links a:hover,
.mail-link:hover {
  color: #175f8f;
}

.header-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  justify-items: stretch;
}

.hdd-link,
.request-button {
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 850;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease;
}

.hdd-link {
  color: #175f8f;
  border: 1px solid #bfd8e9;
  background: #f2f8fc;
}

.request-button {
  color: #ffffff;
  border: 1px solid #f05a28;
  background: #f05a28;
  box-shadow: 0 12px 24px rgba(240, 90, 40, 0.24);
}

.hdd-link:hover {
  color: #ffffff;
  border-color: #2d7aac;
  background: #2d7aac;
}

.request-button:hover {
  background: #d84618;
  border-color: #d84618;
  box-shadow: 0 14px 28px rgba(216, 70, 24, 0.28);
  transform: translateY(-1px);
}

.request-button:active,
.hdd-link:active {
  transform: translateY(0);
}

@media (max-width: 1240px) {
  .header-inner {
    grid-template-columns: minmax(220px, 290px) 1fr;
  }

  .header-actions {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 220px));
    justify-content: start;
  }
}

@media (max-width: 980px) {
  .header-inner {
    width: min(100% - 32px, 1280px);
    grid-template-columns: 1fr;
    gap: 14px;
    min-height: auto;
    padding: 16px 72px 16px 0;
  }

  .brand-logo {
    width: min(270px, 100%);
  }

  .header-contacts {
    grid-template-columns: 1fr;
  }

  .contact-item {
    min-height: 52px;
  }

  .office-address {
    white-space: normal;
  }

  .header-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }
}

@media (max-width: 560px) {
  .header-inner {
    width: min(100% - 28px, 1280px);
    padding-right: 62px;
  }

  .brand-logo {
    width: min(238px, 100%);
  }

  .contact-item {
    grid-template-columns: 30px minmax(0, 1fr);
    padding: 8px;
  }

  .contact-icon {
    width: 30px;
    height: 30px;
  }

  .phone-links {
    flex-direction: column;
  }

  .header-actions {
    grid-template-columns: 1fr;
  }

  .hdd-link,
  .request-button {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hdd-link,
  .request-button {
    transition: none;
  }
}
</style>

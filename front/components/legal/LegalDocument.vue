<template>
  <div class="legal-page">
    <header class="legal-header">
      <NuxtLink class="legal-brand" to="/" aria-label="Вернуться на главную">
        <img src="/img/image.png" alt="Энергосистемы" width="260" height="50">
      </NuxtLink>
      <NuxtLink class="legal-back" to="/">На главную</NuxtLink>
    </header>

    <main class="legal-main">
      <article class="legal-document">
        <p class="legal-kicker">Правовая информация</p>
        <h1>{{ title }}</h1>
        <p v-if="updatedAt" class="legal-updated">Редакция от {{ updatedAt }}</p>
        <slot />
      </article>
    </main>

    <footer class="legal-footer">
      <span>© {{ currentYear }} ООО «Энергосистемы»</span>
      <nav aria-label="Правовые документы">
        <NuxtLink to="/privacy">Политика обработки персональных данных</NuxtLink>
        <NuxtLink to="/personal-data-consent">Согласие на обработку персональных данных</NuxtLink>
        <NuxtLink to="/requisites">Реквизиты</NuxtLink>
      </nav>
    </footer>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: String,
    default: "",
  },
});

const currentYear = new Date().getFullYear();
</script>

<style>
.legal-page {
  min-height: 100vh;
  background: #f4f7fa;
  color: #172033;
}

.legal-header {
  min-height: 82px;
  padding: 14px clamp(20px, 5vw, 72px);
  background: #111827;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.legal-brand {
  display: inline-flex;
  align-items: center;
}

.legal-brand img {
  width: min(260px, 58vw);
  height: auto;
  max-height: 50px;
  object-fit: contain;
}

.legal-back {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
}

.legal-back:hover,
.legal-document a:hover,
.legal-footer a:hover {
  color: #ff4800;
}

.legal-main {
  padding: clamp(28px, 6vw, 72px) clamp(16px, 4vw, 40px);
}

.legal-document {
  width: min(980px, 100%);
  margin: 0 auto;
  padding: clamp(24px, 5vw, 56px);
  background: #fff;
  border: 1px solid #dbe3ea;
  border-radius: 20px;
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
}

.legal-kicker {
  margin: 0 0 12px;
  color: #d83d00;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.legal-document h1 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.12;
}

.legal-updated {
  margin: 14px 0 30px;
  color: #64748b;
  font-size: 14px;
}

.legal-document h2 {
  margin: 34px 0 14px;
  color: #0f172a;
  font-size: clamp(20px, 2.6vw, 26px);
  line-height: 1.25;
}

.legal-document h3 {
  margin: 24px 0 10px;
  color: #1e293b;
  font-size: 18px;
}

.legal-document p,
.legal-document li,
.legal-document dd,
.legal-document dt {
  font-size: 16px;
  line-height: 1.7;
}

.legal-document p {
  margin: 0 0 14px;
}

.legal-document ul,
.legal-document ol {
  margin: 12px 0 18px;
  padding-left: 24px;
}

.legal-document li + li {
  margin-top: 7px;
}

.legal-document a {
  color: #b83200;
  overflow-wrap: anywhere;
}

.legal-document dl {
  margin: 18px 0;
  display: grid;
  grid-template-columns: minmax(180px, 260px) 1fr;
  gap: 10px 24px;
}

.legal-document dt {
  color: #475569;
  font-weight: 700;
}

.legal-document dd {
  margin: 0;
}

.legal-note {
  margin: 20px 0;
  padding: 16px 18px;
  border-left: 4px solid #ff4800;
  border-radius: 8px;
  background: #fff4ef;
}

.legal-footer {
  padding: 24px clamp(20px, 5vw, 72px);
  background: #111827;
  color: rgba(255, 255, 255, 0.72);
  display: flex;
  justify-content: space-between;
  gap: 24px;
  font-size: 13px;
}

.legal-footer nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px 20px;
}

.legal-footer a {
  color: rgba(255, 255, 255, 0.86);
  text-decoration: none;
}

@media (max-width: 700px) {
  .legal-document dl {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .legal-document dd + dt {
    margin-top: 12px;
  }

  .legal-footer {
    flex-direction: column;
  }

  .legal-footer nav {
    justify-content: flex-start;
  }
}
</style>

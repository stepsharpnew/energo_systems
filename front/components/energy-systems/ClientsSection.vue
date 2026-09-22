<template>
  <section id="clients" class="clients-section" aria-labelledby="clients-title">
    <div class="section-heading">
      <p class="section-kicker">Наши клиенты</p>
      <h2 id="clients-title">Нам доверяют лидеры отраслей</h2>
      <p class="section-description">
        Подрядчики, муниципалитеты и девелоперы, которым важна скорость и
        безупречное качество
      </p>
    </div>

    <div class="clients-marquee" :class="{ 'is-paused': isPaused }">
      <div
        id="clients-track"
        class="clients-track"
        :style="{ '--marquee-duration': `${clients.length * 8}s` }"
      >
        <ul
          v-for="copy in 2"
          :key="copy"
          class="clients-list"
          :aria-hidden="copy === 2 ? 'true' : undefined"
          :aria-label="copy === 1 ? 'Наши клиенты' : undefined"
        >
          <li v-for="client in clients" :key="client.id" class="client-card">
            <img
              v-if="client.image"
              class="client-logo"
              :src="client.image"
              alt=""
              width="180"
              height="80"
              loading="lazy"
              decoding="async"
            >
            <span v-else class="client-logo client-logo--fallback" :style="{ backgroundColor: client.color }" aria-hidden="true">
              {{ client.name.slice(0, 1) }}
            </span>
            <p>{{ client.name }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="clients-controls">
      <button
        class="motion-toggle"
        type="button"
        aria-controls="clients-track"
        :aria-label="isPaused ? 'Продолжить движение логотипов' : 'Приостановить движение логотипов'"
        @click="isPaused = !isPaused"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path v-if="isPaused" d="M6 3.5 16 10 6 16.5Z" />
          <path v-else d="M5 4h3v12H5zm7 0h3v12h-3z" />
        </svg>
        {{ isPaused ? 'Продолжить' : 'Пауза' }}
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ClientsSection',
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { isPaused: false };
  },
};
</script>

<style scoped>
.clients-section {
  --client-card-width: 300px;
  --client-gap: 20px;
  padding: clamp(50px, 8vw, 90px) 0;
  scroll-margin-top: 72px;
}

.section-heading {
  text-align: center;
  margin-bottom: clamp(24px, 4vw, 44px);
}

.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ff4800;
  font-size: 12px;
  margin-bottom: 12px;
}

.section-heading h2 {
  font-size: clamp(30px, 4vw, 42px);
  margin-bottom: 12px;
  color: #0f172a;
}

.section-description {
  color: #61728a;
  font-size: 16px;
}

.clients-marquee {
  overflow: hidden;
  padding: 16px 0;
  mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
}

.clients-track {
  display: flex;
  width: max-content;
  animation: clients-drift var(--marquee-duration) linear infinite;
}

.clients-list {
  display: flex;
  flex: 0 0 auto;
  gap: var(--client-gap);
  margin: 0;
  padding: 0 var(--client-gap) 0 0;
  list-style: none;
}

.client-card {
  display: flex;
  flex: 0 0 var(--client-card-width);
  flex-direction: column;
  justify-content: space-between;
  width: var(--client-card-width);
  min-height: 180px;
  padding: 24px;
  border: 1px solid #dedfda;
  border-radius: 20px;
  background: #f4f4f1;
  transition: background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.client-card:hover {
  background: #fff;
  border-color: #cdd0cd;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.client-logo {
  display: block;
  width: 180px;
  max-width: 100%;
  height: 80px;
  object-fit: contain;
  object-position: left center;
}

.client-logo--fallback {
  display: grid;
  place-items: center;
  border-radius: 8px;
  font-size: 32px;
}

.client-card p {
  margin: 16px 0 0;
  color: #171b20;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
}

.is-paused .clients-track { animation-play-state: paused; }

.clients-controls {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}

.motion-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 8px 12px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: #61728a;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.motion-toggle svg { width: 16px; height: 16px; }
.motion-toggle:hover { color: #171b20; background: #f4f4f1; }
.motion-toggle:focus-visible { outline: 2px solid #896522; outline-offset: 3px; }

@keyframes clients-drift {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}

@media (hover: hover) {
  .clients-marquee:hover .clients-track { animation-play-state: paused; }
}

@media (max-width: 600px) {
  .clients-section { --client-card-width: 240px; --client-gap: 16px; }
  .client-card { min-height: 168px; padding: 20px; }
  .client-logo { width: 164px; height: 76px; }
  .clients-marquee {
    mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .clients-marquee { overflow: visible; mask-image: none; -webkit-mask-image: none; }
  .clients-track { display: block; width: 100%; animation: none; }
  .clients-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)); padding: 0; }
  .clients-list[aria-hidden="true"], .clients-controls { display: none; }
  .client-card { width: auto; transition: none; }
}
</style>

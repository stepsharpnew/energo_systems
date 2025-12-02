<template>
  <section class="clients-section" ref="clientsSection">
    <div class="section-heading">
      <p class="section-kicker">Наши клиенты</p>
      <h2>Нам доверяют лидеры отраслей</h2>
      <p>Подрядчики, муниципалитеты и девелоперы, которым важна скорость и безупречное качество</p>
    </div>
    <div class="clients-grid">
      <div
        v-for="client in clients"
        :key="client.id"
        class="client-card"
      >
        <div
          class="client-logo"
          :style="getClientStyle(client)"
        ></div>
        <p>{{ client.name }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ClientsSection',
  props: {
    clients: {
      type: Array,
      required: true
    }
  },
  methods: {
    getClientStyle(client) {
      if (client.image) {
        return {
          backgroundImage: `url(${client.image})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
      } else if (client.color) {
        return {
          background: client.color
        };
      }
      return {};
    }
  }
}
</script>

<style scoped>
.clients-section {
  padding: clamp(50px, 8vw, 90px) 0;
}

.section-heading {
  text-align: center;
  margin-bottom: clamp(32px, 5vw, 60px);
}

.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #ef4422;
  font-size: 12px;
  margin-bottom: 12px;
}

.section-heading h2 {
  font-size: clamp(30px, 4vw, 42px);
  margin-bottom: 12px;
  color: #0f172a;
}

.section-heading p {
  color: #61728a;
  font-size: 16px;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: clamp(16px, 3vw, 28px);
}

.client-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 18px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.client-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.18);
}

.client-logo {
  width: 100%;
  height: 90px;
  border-radius: 16px;
  margin-bottom: 14px;
  background-color: #ffffff;
}

.client-card p {
  margin: 0;
  font-weight: 600;
  color: #334155;
}

@media (max-width: 560px) {
  .clients-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }
}
</style>


<template>
  <section class="contact-cta" ref="contactSection">
    <div class="cta-content">
      <p class="section-kicker">Связаться с нами</p>
      <h2>Нужен быстрый расчет или выезд инженера?</h2>
      <p>
        Сообщите задачу — за 30 минут подготовим предварительные решения и
        стоимость, а при необходимости организуем выезд на объект в течение
        суток.
      </p>
    </div>
    <div class="cta-actions">
      <button type="button" @click="$emit('open-contact-modal')">
        Запланировать консультацию
      </button>
      <div class="phone-link">
        <span class="phone-icon">📞</span>
        <a href="tel:84951780118">8 (495) 178-01-18</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactCTA",
  emits: ["open-contact-modal"],
};
</script>

<style scoped>
.contact-cta {
  margin: clamp(40px, 8vw, 90px) 0;
  padding: clamp(28px, 5vw, 60px);
  background: linear-gradient(135deg, #111927, #1f2937 40%, #ef4422);
  border-radius: 32px;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: clamp(20px, 4vw, 40px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
}

.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-bottom: 12px;
}

.contact-cta h2 {
  margin: 10px 0 14px;
  font-size: clamp(26px, 3.6vw, 36px);
  line-height: 1.25;
}

.contact-cta p {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
}

.cta-actions button {
  border: none;
  border-radius: 16px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  background: #fff;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.cta-actions button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
}

.phone-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 28px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
}

.phone-icon {
  font-size: 18px;
  line-height: 1;
}

.phone-link a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: opacity 0.25s ease;
}

.phone-link a:hover {
  opacity: 0.8;
}

/* На десктопе ссылка не кликабельна */
@media (min-width: 769px) {
  .phone-link a {
    pointer-events: none;
    cursor: default;
  }

  .phone-link a:hover {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .contact-cta {
    text-align: center;
  }

  .cta-actions button {
    width: 100%;
  }

  .phone-link {
    justify-content: center;
  }
}

@media (max-width: 560px) {
  .contact-cta {
    padding: 24px;
  }
}
</style>

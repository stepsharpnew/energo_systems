<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-column">
        <h3>Энергосистемы</h3>
        <p><b>ООО «Энергосистемы»</b> - надежный партнер с гарантией высокого качества и профессионализма. Сотрудничество с нами - это комплексная реализация любых задач на каждом этапе строительства от аудита и модернизации существующих проектных решений в рамках имеющегося бюджета, до сдачи работ в надзорные органы и ввода в эксплуатацию.</p>
        <p>Дмитрий Чернявский - учредитель компании</p>
    </div>
      <div class="footer-column">
        <h4>Контакты</h4>
        <ul>
          <li><b>8 (495) 178-01-18</b></li>
          <li>info@energosystems.ru</li>
          <li><b>Адрес в Москве:</b> 125445, г. Москва, ул.Михалковская, д.63Б с4</li>
          <li><b>Адрес в Солнечногорске:</b> 141504, Московская область, г. Солнечногорск ул.Промышленная с 5</li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Режим работы</h4>
        <ul>
          <li>Пн-Пт: 09:00 – 18:00</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© {{ currentYear }} Энергосистемы. Все права защищены.</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.site-footer {
  background: #0b1120;
  color: rgba(255, 255, 255, 0.8);
  padding: 60px 24px 30px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
}

.footer-column h3,
.footer-column h4 {
  margin-bottom: 12px;
  color: #fff;
}

.footer-column p {
  margin: 0;
  line-height: 1.6;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
}

.footer-bottom {
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 560px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>


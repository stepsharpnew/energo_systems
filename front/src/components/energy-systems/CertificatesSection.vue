<template>
  <section class="certificates-section" ref="certificatesSection">
    <div class="section-heading compact">
      <p class="section-kicker">Сертификаты</p>
      <h2>Подтвержденная экспертиза</h2>
      <p>Разрешительные документы, лицензии СРО и отраслевые сертификаты</p>
    </div>
    <div class="certificates-grid">
      <div
        v-for="certificate in certificates"
        :key="certificate.id"
        class="certificate-card"
      >
        <div
          class="certificate-image"
          :style="{ backgroundImage: `url(${certificate.image})` }"
        >
          <div class="certificate-overlay">
            <div class="certificate-info">
              <h3>{{ certificate.title }}</h3>
              <p>{{ certificate.issuer }}</p>
              <span>{{ certificate.year }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CertificatesSection',
  props: {
    certificates: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.certificates-section {
  padding: clamp(40px, 7vw, 80px) 0;
}

.section-heading {
  text-align: center;
  margin-bottom: clamp(32px, 5vw, 60px);
}

.section-heading.compact {
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
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

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(24px, 4vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
}

.certificate-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.certificate-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.2);
}

.certificate-image {
  width: 100%;
  aspect-ratio: 1 / 1.414;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
}

.certificate-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.7) 60%, transparent 100%);
  padding: 24px 20px 20px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.certificate-card:hover .certificate-overlay {
  transform: translateY(0);
}

.certificate-info {
  color: #fff;
}

.certificate-info h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.certificate-info p {
  margin: 0 0 6px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

.certificate-info span {
  display: inline-block;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

@media (max-width: 768px) {
  .certificates-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .certificate-info h3 {
    font-size: 16px;
  }

  .certificate-info p {
    font-size: 13px;
  }
}

@media (max-width: 560px) {
  .certificates-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .certificate-image {
    aspect-ratio: 1 / 1.414;
  }
}
</style>

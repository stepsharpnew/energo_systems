<template>
  <section id="certificates" class="certificates-section" ref="certificatesSection">
    <div class="section-heading compact" ref="headingRef">
      <p class="section-kicker">Документы</p>
      <h2>Сертификаты и благодарности</h2>
      <p>Архивные сертификаты и благодарственные письма</p>
    </div>
    <div class="certificates-grid">
      <a
        v-for="(certificate, index) in certificates"
        :key="certificate.id"
        :href="certificate.image"
        target="_blank"
        rel="noopener"
        @click.prevent="openDocument(index)"
        class="certificate-card"
      >
        <div class="certificate-image">
          <img
            class="certificate-preview"
            v-bind="imageAttrs(certificate.thumbnail || certificate.image, { sizes: '(max-width: 560px) 100vw, (max-width: 1023px) 50vw, 25vw', width: 640 })"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div class="certificate-overlay">
            <div class="certificate-info">
              <h3>{{ certificate.title }}</h3>
              <p>{{ certificate.issuer }}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
    <p v-if="failedDocument" class="document-error" role="alert">
      Не получилось открыть просмотр. <a :href="failedDocument.image" target="_blank" rel="noopener">Открыть документ отдельной вкладкой</a>
    </p>
  </section>
</template>

<script setup>
import { revealOnVisible } from '~/utils/revealOnVisible.js'
import { imageAttrs } from '~/utils/responsiveImage.js'
import '~/assets/styles/progressive-reveal.css'

const props = defineProps({ certificates: { type: Array, required: true } })
const certificatesSection = ref(null)
const failedDocument = ref(null)
let lightbox, lightboxPromise, stopReveals, disposed = false, openRequest = 0

const slides = computed(() => props.certificates.map(document => ({
  src: document.image,
  msrc: document.thumbnail || document.image,
  width: document.imageWidth,
  height: document.imageHeight,
  alt: `${document.title}. ${document.issuer}`,
})))
async function ensureLightbox() {
  if (lightbox) return lightbox
  if (!lightboxPromise) {
    lightboxPromise = Promise.all([
      import('photoswipe/lightbox'),
      import('photoswipe/style.css'),
    ]).then(([{ default: PhotoSwipeLightbox }]) => {
      if (disposed) return null
      lightbox = new PhotoSwipeLightbox({
        pswpModule: () => import('photoswipe'),
        mainClass: 'pswp--documents',
        initialZoomLevel: 'fit',
        secondaryZoomLevel: 2,
        maxZoomLevel: 4,
        imageClickAction: 'zoom',
        tapAction: 'toggle-controls',
        preload: [0, 0],
        showHideAnimationType: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'none' : 'fade',
        closeTitle: 'Закрыть', zoomTitle: 'Увеличить документ',
        arrowPrevTitle: 'Предыдущий документ', arrowNextTitle: 'Следующий документ',
        errorMsg: 'Не удалось загрузить документ',
      })
      lightbox.init()
      return lightbox
    }).catch(error => { lightboxPromise = null; throw error })
  }
  return lightboxPromise
}
async function openDocument(index) {
  const request = ++openRequest
  failedDocument.value = null
  try {
    const viewer = await ensureLightbox()
    if (!disposed && viewer && request === openRequest) viewer.loadAndOpen(index, slides.value)
  } catch {
    if (!disposed && request === openRequest) failedDocument.value = props.certificates[index]
  }
}
onMounted(() => { stopReveals = revealOnVisible(certificatesSection.value, '.section-heading, .certificate-card') })
onBeforeUnmount(() => { disposed = true; stopReveals?.(); lightbox?.destroy() })
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
  color: #c94218;
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 24px);
  max-width: 1280px;
  margin: 0 auto;
}

.certificate-card {
  display: block;
  color: inherit;
  text-decoration: none;
  background: #fff;
  border: 1px solid rgba(216, 228, 237, 0.9);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.certificate-card:focus-visible { outline: 3px solid #175f8f; outline-offset: 4px; }

.document-error { margin-top: 16px; color: #8b2716; }
.document-error a { color: inherit; text-decoration: underline; }

.certificate-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.16);
}

.certificate-image {
  width: 100%;
  aspect-ratio: 1 / 1.414;
  background-color: #fff;
  position: relative;
  overflow: hidden;
}

.certificate-preview {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  object-fit: contain;
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
  font-size: clamp(14px, 1.3vw, 17px);
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

@media (max-width: 1023px) {
  .certificates-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
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

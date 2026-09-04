<template>
  <div class="equipment-gallery">
    <div
      class="equipment-gallery__viewer"
      role="group"
      :aria-label="`Фотографии ${equipment.name}`"
      @keydown.left.prevent="showPreviousImage"
      @keydown.right.prevent="showNextImage"
    >
      <a
        class="equipment-gallery__open"
        :href="activeImage"
        target="_blank"
        rel="noopener"
        :aria-label="`Открыть фотографию ${activeImageIndex + 1} из ${photoCount} на весь экран`"
        @click.prevent="openGallery(activeImageIndex, $event)"
      >
        <Transition name="equipment-gallery-photo" mode="out-in">
          <img
            :key="activeImage"
            class="equipment-gallery__photo"
            :src="activeImage"
            :alt="`${equipment.name} — пример исполнения, фото ${activeImageIndex + 1} из ${photoCount}`"
            width="1600"
            height="1000"
            loading="lazy"
            :style="{ objectPosition: previewPosition }"
            @load="rememberImageDimensions($event, activeImage)"
          >
        </Transition>

        <span class="equipment-gallery__shade" aria-hidden="true"></span>
        <span class="equipment-gallery__counter" aria-live="polite">
          {{ String(activeImageIndex + 1).padStart(2, '0') }}
          <i>/</i>
          {{ String(photoCount).padStart(2, '0') }}
        </span>
        <span class="equipment-gallery__caption">
          <small>{{ equipment.eyebrow }}</small>
          <strong>{{ equipment.name }} · пример исполнения</strong>
        </span>
        <span class="equipment-gallery__zoom-hint">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="5.5" />
            <path d="m15 15 4.5 4.5M10.5 8v5M8 10.5h5" />
          </svg>
          Увеличить
        </span>
      </a>

      <button
        v-if="photoCount > 1"
        type="button"
        class="equipment-gallery__arrow equipment-gallery__arrow--previous"
        aria-label="Предыдущая фотография"
        @click="showPreviousImage"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
      </button>
      <button
        v-if="photoCount > 1"
        type="button"
        class="equipment-gallery__arrow equipment-gallery__arrow--next"
        aria-label="Следующая фотография"
        @click="showNextImage"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </button>
    </div>

    <nav
      v-if="photoCount > 1"
      class="equipment-gallery__thumbs"
      aria-label="Выбор фотографии"
    >
      <button
        v-for="(image, index) in equipment.gallery"
        :key="image"
        type="button"
        :class="{ active: index === activeImageIndex }"
        :aria-pressed="index === activeImageIndex"
        :aria-label="`Показать фотографию ${index + 1}`"
        @click="selectImage(index)"
      >
        <img
          :src="image"
          alt=""
          width="180"
          height="110"
          loading="lazy"
          @load="rememberImageDimensions($event, image)"
        >
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
      </button>
    </nav>

    <p class="equipment-gallery__help">
      Нажмите на фотографию, чтобы открыть оригинал и рассмотреть детали.
    </p>
  </div>
</template>

<script setup>
import 'photoswipe/style.css'

const props = defineProps({
  equipment: {
    type: Object,
    required: true,
  },
})

const activeImageIndex = ref(0)
const imageDimensions = reactive({})
let lightbox = null
let dimensionsPromise = null

const photoCount = computed(() => props.equipment.gallery.length)
const activeImage = computed(() => props.equipment.gallery[activeImageIndex.value])
const previewPosition = computed(() => {
  if (props.equipment.slug === 'mtp') return 'center 64%'
  if (props.equipment.slug === 'krun') return 'center 58%'
  return 'center'
})

const slides = computed(() => props.equipment.gallery.map((src, index) => ({
  src,
  msrc: src,
  width: imageDimensions[src]?.width || 1600,
  height: imageDimensions[src]?.height || 1200,
  alt: `${props.equipment.name} — пример исполнения, фото ${index + 1} из ${photoCount.value}`,
})))

const rememberImageDimensions = (event, src) => {
  const image = event.currentTarget
  if (!image?.naturalWidth || !image?.naturalHeight) return

  imageDimensions[src] = {
    width: image.naturalWidth,
    height: image.naturalHeight,
  }
}

const loadImageDimensions = () => {
  if (!import.meta.client) return Promise.resolve()
  if (dimensionsPromise) return dimensionsPromise

  dimensionsPromise = Promise.all(props.equipment.gallery.map((src) => new Promise((resolve) => {
    if (imageDimensions[src]) {
      resolve()
      return
    }

    const image = new Image()
    image.onload = () => {
      imageDimensions[src] = { width: image.naturalWidth, height: image.naturalHeight }
      resolve()
    }
    image.onerror = resolve
    image.src = src
  })))

  return dimensionsPromise
}

const ensureLightbox = async () => {
  if (lightbox) return lightbox

  const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox')
  lightbox = new PhotoSwipeLightbox({
    pswpModule: () => import('photoswipe'),
    mainClass: 'pswp--equipment',
    initialZoomLevel: 'fit',
    secondaryZoomLevel: 1.5,
    maxZoomLevel: 3,
    wheelToZoom: true,
    imageClickAction: 'zoom',
    tapAction: 'toggle-controls',
    doubleTapAction: 'zoom',
    bgOpacity: 0.96,
    showHideAnimationType: 'fade',
    preload: [1, 2],
    errorMsg: 'Не удалось загрузить фотографию',
    closeTitle: 'Закрыть',
    zoomTitle: 'Изменить масштаб',
    arrowPrevTitle: 'Предыдущая фотография',
    arrowNextTitle: 'Следующая фотография',
  })

  lightbox.on('change', () => {
    const currentIndex = lightbox?.pswp?.currIndex
    if (Number.isInteger(currentIndex)) activeImageIndex.value = currentIndex
  })
  lightbox.init()

  return lightbox
}

const openGallery = async (index, event) => {
  activeImageIndex.value = index
  await loadImageDimensions()
  const viewer = await ensureLightbox()
  viewer.loadAndOpen(index, slides.value, event ? { x: event.clientX, y: event.clientY } : undefined)
}

const selectImage = (index) => {
  activeImageIndex.value = index
}

const showPreviousImage = () => {
  activeImageIndex.value = (activeImageIndex.value - 1 + photoCount.value) % photoCount.value
}

const showNextImage = () => {
  activeImageIndex.value = (activeImageIndex.value + 1) % photoCount.value
}

onMounted(() => {
  void loadImageDimensions()
})

onBeforeUnmount(() => {
  lightbox?.destroy()
  lightbox = null
})
</script>

<style scoped>
.equipment-gallery {
  --gallery-height: clamp(440px, 62vh, 680px);
  --gallery-height: clamp(440px, 62svh, 680px);
  color: #102234;
}

.equipment-gallery__viewer {
  position: relative;
  height: var(--gallery-height);
  overflow: hidden;
  border: 1px solid #c4d4df;
  border-radius: 12px;
  background: #dbe6ed;
  box-shadow: 0 20px 44px rgba(16, 34, 52, 0.14);
}

.equipment-gallery__open {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
  color: #fff;
  background: #dbe6ed;
  cursor: zoom-in;
}

.equipment-gallery__photo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 360ms ease;
}

.equipment-gallery__open:hover .equipment-gallery__photo {
  transform: scale(1.012);
}

.equipment-gallery__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9, 26, 40, 0.18), transparent 30%, transparent 58%, rgba(9, 26, 40, 0.78));
  pointer-events: none;
}

.equipment-gallery__counter {
  position: absolute;
  top: 18px;
  left: 18px;
  display: inline-flex;
  align-items: baseline;
  gap: 7px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 5px;
  background: rgba(16, 34, 52, 0.76);
  color: #fff;
  font-size: 11px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.08em;
}

.equipment-gallery__counter i {
  color: rgba(255, 255, 255, 0.48);
  font-style: normal;
}

.equipment-gallery__caption {
  position: absolute;
  right: 180px;
  bottom: 20px;
  left: 20px;
  display: grid;
  gap: 5px;
  pointer-events: none;
}

.equipment-gallery__caption small {
  color: rgba(255, 255, 255, 0.72);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.equipment-gallery__caption strong {
  color: #fff;
  font-size: 17px;
}

.equipment-gallery__zoom-hint {
  position: absolute;
  right: 20px;
  bottom: 20px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 15px;
  border-radius: 6px;
  background: #f05a28;
  color: #fff;
  font-size: 13px;
  font-weight: 900;
  pointer-events: none;
}

.equipment-gallery__zoom-hint svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-width: 1.7;
}

.equipment-gallery__arrow {
  position: absolute;
  z-index: 3;
  top: 50%;
  width: 50px;
  height: 58px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.54);
  border-radius: 6px;
  color: #102234;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 8px 20px rgba(16, 34, 52, 0.18);
  cursor: pointer;
  transform: translateY(-50%);
  transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease;
}

.equipment-gallery__arrow--previous {
  left: 18px;
}

.equipment-gallery__arrow--next {
  right: 18px;
}

.equipment-gallery__arrow svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.equipment-gallery__arrow:hover {
  border-color: #f05a28;
  color: #fff;
  background: #f05a28;
}

.equipment-gallery__thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(112px, 150px));
  justify-content: center;
  gap: 10px;
  margin-top: 14px;
}

.equipment-gallery__thumbs button {
  position: relative;
  height: 88px;
  overflow: hidden;
  padding: 0;
  border: 1px solid #c4d4df;
  border-radius: 6px;
  background: #dbe6ed;
  cursor: pointer;
  opacity: 0.72;
  transition: border-color 160ms ease, box-shadow 160ms ease, opacity 160ms ease, transform 160ms ease;
}

.equipment-gallery__thumbs button::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #f05a28;
  content: '';
  opacity: 0;
}

.equipment-gallery__thumbs button.active {
  border-color: #f05a28;
  box-shadow: 0 7px 16px rgba(16, 34, 52, 0.12);
  opacity: 1;
}

.equipment-gallery__thumbs button.active::after {
  opacity: 1;
}

.equipment-gallery__thumbs button:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.equipment-gallery__thumbs img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.equipment-gallery__thumbs span {
  position: absolute;
  bottom: 7px;
  left: 8px;
  padding: 3px 5px;
  border-radius: 3px;
  background: rgba(16, 34, 52, 0.82);
  color: #fff;
  font-size: 9px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.equipment-gallery__help {
  margin: 12px 0 0;
  color: #647789;
  font-size: 13px;
  text-align: center;
}

.equipment-gallery-photo-enter-active,
.equipment-gallery-photo-leave-active {
  transition: opacity 170ms ease;
}

.equipment-gallery-photo-enter-from,
.equipment-gallery-photo-leave-to {
  opacity: 0;
}

.equipment-gallery__open:focus-visible,
.equipment-gallery__arrow:focus-visible,
.equipment-gallery__thumbs button:focus-visible {
  outline: 3px solid rgba(240, 90, 40, 0.58);
  outline-offset: 3px;
}

:global(.pswp--equipment) {
  --pswp-bg: #071621;
  --pswp-icon-color: #fff;
  --pswp-icon-color-secondary: #102234;
  --pswp-placeholder-bg: #132b3d;
  --pswp-root-z-index: 10000;
}

:global(.pswp--equipment .pswp__button) {
  width: 48px;
  height: 48px;
}

:global(.pswp--equipment .pswp__counter) {
  height: 48px;
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  text-shadow: none;
  opacity: 0.9;
}

@media (max-width: 760px) {
  .equipment-gallery {
    --gallery-height: clamp(400px, 65vh, 540px);
    --gallery-height: clamp(400px, 65svh, 540px);
  }

  .equipment-gallery__arrow {
    width: 44px;
    height: 50px;
  }

  .equipment-gallery__arrow--previous {
    left: 10px;
  }

  .equipment-gallery__arrow--next {
    right: 10px;
  }

  .equipment-gallery__caption {
    right: 16px;
    bottom: 72px;
    left: 16px;
  }

  .equipment-gallery__caption small {
    display: none;
  }

  .equipment-gallery__caption strong {
    font-size: 14px;
  }

  .equipment-gallery__zoom-hint {
    right: 16px;
    bottom: 16px;
    left: 16px;
  }

  .equipment-gallery__thumbs {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 116px;
    justify-content: start;
    overflow-x: auto;
    padding: 2px 2px 7px;
    overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
  }

  .equipment-gallery__thumbs button {
    height: 76px;
    scroll-snap-align: start;
  }
}

@media (max-width: 420px) {
  .equipment-gallery {
    --gallery-height: clamp(380px, 62vh, 500px);
    --gallery-height: clamp(380px, 62svh, 500px);
  }

  .equipment-gallery__viewer {
    border-radius: 9px;
  }

  .equipment-gallery__counter {
    top: 12px;
    left: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .equipment-gallery__photo,
  .equipment-gallery__arrow,
  .equipment-gallery__thumbs button,
  .equipment-gallery-photo-enter-active,
  .equipment-gallery-photo-leave-active {
    transition: none;
  }

  .equipment-gallery__open:hover .equipment-gallery__photo,
  .equipment-gallery__thumbs button:hover {
    transform: none;
  }
}
</style>

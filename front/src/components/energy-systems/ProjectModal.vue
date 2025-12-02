<template>
  <transition name="modal-fade">
    <div
      v-if="show && project"
      class="modal-overlay"
      @click.self="$emit('close')"
    >
      <div class="modal-window">
        <button class="modal-close" type="button" @click="$emit('close')">
          ×
        </button>
        <div class="modal-body project-modal">
          <p class="section-kicker">Проект</p>
          <h2>{{ project.name }}</h2>
          <ul class="project-meta-list">
            <li><strong>Заказчик:</strong> {{ project.client }}</li>
            <li><strong>Адрес:</strong> {{ project.address }}</li>
          </ul>
          <p>{{ project.details }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ProjectModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object,
      default: null,
    },
  },
  emits: ["close"],
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(8, 13, 34, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 9999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.modal-window {
  background: #0f172a;
  width: min(960px, 95vw);
  max-height: calc(100vh - 40px);
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  margin: auto;
  flex-shrink: 0;
}

.modal-body {
  padding: clamp(24px, 5vw, 48px);
  color: #e2e8f0;
}

.project-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-bottom: 12px;
}

.project-modal h2 {
  color: #fff;
  margin: 0;
}

.project-meta-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 6px;
  color: #cbd5f5;
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.35);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>

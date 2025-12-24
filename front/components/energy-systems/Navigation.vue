<template>
  <nav class="main-nav">
    <!-- Десктопная навигация -->
    <div class="nav-container desktop-nav">
      <button
        v-for="item in navItems"
        :key="item.key"
        type="button"
        @click="handleNavClick(item.key)"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- Мобильная навигация -->
    <div class="mobile-nav-wrapper">
      <button
        class="mobile-menu-toggle"
        type="button"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Открыть меню"
      >
        <span class="hamburger-icon">
          <span class="line" :class="{ active: isMobileMenuOpen }"></span>
          <span class="line" :class="{ active: isMobileMenuOpen }"></span>
          <span class="line" :class="{ active: isMobileMenuOpen }"></span>
        </span>
      </button>

      <transition name="mobile-menu">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-menu-overlay"
          @click="closeMobileMenu"
        >
          <div class="mobile-menu" @click.stop>
            <button
              class="mobile-menu-close"
              type="button"
              @click="closeMobileMenu"
              aria-label="Закрыть меню"
            >
              ×
            </button>
            <div class="mobile-menu-items">
              <button
                v-for="item in navItems"
                :key="item.key"
                type="button"
                class="mobile-nav-item"
                @click="handleNavClick(item.key)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    navItems: {
      type: Array,
      required: true
    }
  },
  emits: ['scroll-to'],
  data() {
    return {
      isMobileMenuOpen: false
    };
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  },
  methods: {
    handleNavClick(key) {
      this.closeMobileMenu();
      this.$emit('scroll-to', key);
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  }
}
</script>

<style scoped>
.main-nav {
  position: relative;
  z-index: 25;
  margin-top: 0px;
  background: transparent;
}

/* Фиксация навбара при скролле для десктопной версии */
@media (min-width: 993px) {
  .main-nav {
    position: sticky;
    top: 0;
    z-index: 1000;
  }
}

/* Десктопная навигация */
.desktop-nav {
  margin: 0 auto;
  padding: clamp(10px, 1.5vw, 12px) clamp(16px, 2vw, 24px);
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  background: linear-gradient(135deg, #0f172a, #1f2937);
  border: 1px solid rgba(239, 68, 34, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(239, 68, 34, 0.1);
  scrollbar-width: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.desktop-nav:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(239, 68, 34, 0.2);
  border-color: rgba(239, 68, 34, 0.3);
}

.desktop-nav::-webkit-scrollbar {
  display: none;
}

.desktop-nav button {
  border: none;
  padding: clamp(12px, 1.5vw, 14px) clamp(20px, 2.5vw, 28px);
  border-radius: 12px;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-size: clamp(14px, 1.6vw, 15px);
  position: relative;
  overflow: visible;
  letter-spacing: 0.02em;
}

.desktop-nav button::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: calc(100% - 32px);
  height: 2px;
  background: linear-gradient(90deg, transparent, #ef4422, #ff6934, transparent);
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.desktop-nav button:hover {
  color: #fff;
  background: rgba(239, 68, 34, 0.15);
  transform: translateY(-2px);
}

.desktop-nav button:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.desktop-nav button:active {
  transform: translateY(0) scale(0.98);
}

/* Мобильная навигация */
.mobile-nav-wrapper {
  display: none;
}

.mobile-menu-toggle {
  position: fixed;
  top: clamp(16px, 2vw, 20px);
  right: clamp(16px, 2vw, 20px);
  z-index: 30;
  width: clamp(48px, 5vw, 56px);
  height: clamp(48px, 5vw, 56px);
  border: 2px solid rgba(239, 68, 34, 0.2);
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(239, 68, 34, 0.95), rgba(255, 105, 52, 0.95));
  box-shadow: 0 8px 24px rgba(239, 68, 34, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: linear-gradient(135deg, #ef4422, #ff6934);
  transform: scale(1.08);
  box-shadow: 0 12px 32px rgba(239, 68, 34, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.mobile-menu-toggle:active {
  transform: scale(0.95);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: clamp(22px, 3vw, 24px);
  height: clamp(16px, 2vw, 18px);
  position: relative;
}

.hamburger-icon .line {
  width: 100%;
  height: 3px;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.hamburger-icon .line.active:nth-child(1) {
  transform: rotate(45deg) translate(7px, 7px);
}

.hamburger-icon .line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-icon .line.active:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8, 13, 34, 0.7);
  backdrop-filter: blur(4px);
  z-index: 28;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100vh;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  box-shadow: -4px 0 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 29;
  overflow-y: auto;
  border-left: 1px solid rgba(239, 68, 34, 0.1);
}

.mobile-menu-close {
  position: absolute;
  top: clamp(16px, 2vw, 20px);
  right: clamp(16px, 2vw, 20px);
  width: 44px;
  height: 44px;
  border: 2px solid rgba(239, 68, 34, 0.2);
  border-radius: 50%;
  background: rgba(239, 68, 34, 0.1);
  color: #ef4422;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  line-height: 1;
}

.mobile-menu-close:hover {
  background: linear-gradient(135deg, #ef4422, #ff6934);
  color: #fff;
  border-color: #ef4422;
  transform: scale(1.1) rotate(90deg);
}

.mobile-menu-items {
  padding: clamp(80px, 10vw, 100px) clamp(20px, 3vw, 24px) clamp(24px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.5vw, 12px);
}

.mobile-nav-item {
  width: 100%;
  padding: clamp(14px, 2vw, 18px) clamp(18px, 2.5vw, 24px);
  border: 2px solid transparent;
  border-radius: 12px;
  background: rgba(239, 68, 34, 0.05);
  color: #0f172a;
  font-weight: 600;
  font-size: clamp(15px, 2vw, 17px);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.mobile-nav-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%) scaleX(0);
  width: 4px;
  height: 60%;
  background: linear-gradient(180deg, #ef4422, #ff6934);
  border-radius: 0 4px 4px 0;
  transition: transform 0.3s ease;
}

.mobile-nav-item:hover,
.mobile-nav-item:active {
  background: rgba(239, 68, 34, 0.12);
  color: #ef4422;
  transform: translateX(6px);
  border-color: rgba(239, 68, 34, 0.2);
}

.mobile-nav-item:hover::before,
.mobile-nav-item:active::before {
  transform: translateY(-50%) scaleX(1);
}

/* Анимация появления мобильного меню */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-active .mobile-menu,
.mobile-menu-leave-active .mobile-menu {
  transition: transform 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu {
  transform: translateX(100%);
}

.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-leave-to .mobile-menu {
  transform: translateX(100%);
}

/* Адаптивность */
@media (max-width: 992px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav-wrapper {
    display: block;
  }
}

@media (max-width: 768px) {
  .main-nav {
    margin-top: -32px;
    padding-left: 12px;
    padding-right: 12px;
  }

  .mobile-menu {
    width: min(300px, 80vw);
  }
}

@media (max-width: 560px) {
  .mobile-menu {
    width: 100vw;
  }
}
</style>


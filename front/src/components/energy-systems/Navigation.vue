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
  padding: 0;
  display: flex;
  gap: 0;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  overflow-x: auto;
  /* #background-color: #ef4422; */
  background-color: #000;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  padding: 8px;
  scrollbar-width: none;
  transition: box-shadow 0.3s ease;
}


.desktop-nav::-webkit-scrollbar {
  display: none;
}

.desktop-nav button {
  border: none;
  padding: 14px 28px;
  border-radius: 14px;
  background: transparent;
  color: #ececec;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  font-size: 15px;
  position: relative;
  overflow: visible;
  letter-spacing: 0.01em;
}

.desktop-nav button::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: calc(100% - 24px);
  height: 2px;
  background: linear-gradient(90deg, transparent, #ef4422, transparent);
  border-radius: 2px;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.desktop-nav button:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.desktop-nav button:hover::after {
  transform: translateX(-50%) scaleX(1);
}

.desktop-nav button:active {
  transform: scale(0.98);
}

/* Мобильная навигация */
.mobile-nav-wrapper {
  display: none;
}

.mobile-menu-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 30;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2);
  backdrop-filter: blur(16px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, background 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: #fff;
  transform: scale(1.05);
}

.mobile-menu-toggle:active {
  transform: scale(0.95);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
  height: 18px;
  position: relative;
}

.hamburger-icon .line {
  width: 100%;
  height: 3px;
  background: #0f172a;
  border-radius: 2px;
  transition: all 0.3s ease;
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
  background: #fff;
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  z-index: 29;
  overflow-y: auto;
}

.mobile-menu-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.08);
  color: #0f172a;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, transform 0.2s ease;
}

.mobile-menu-close:hover {
  background: rgba(15, 23, 42, 0.15);
  transform: scale(1.1);
}

.mobile-menu-items {
  padding: 80px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.mobile-nav-item {
  width: 100%;
  padding: 16px 20px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #0f172a;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.mobile-nav-item:hover,
.mobile-nav-item:active {
  background: rgba(239, 68, 34, 0.1);
  color: #ef4422;
  transform: translateX(4px);
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

  .mobile-menu-toggle {
    top: 16px;
    right: 16px;
    width: 44px;
    height: 44px;
  }

  .mobile-menu {
    width: min(300px, 80vw);
  }

  .mobile-menu-items {
    padding: 70px 20px 20px;
  }
}

@media (max-width: 560px) {
  .mobile-menu-toggle {
    top: 12px;
    right: 12px;
    width: 40px;
    height: 40px;
  }

  .hamburger-icon {
    width: 20px;
    height: 16px;
    gap: 4px;
  }

  .mobile-menu {
    width: 100vw;
  }

  .mobile-menu-items {
    padding: 60px 16px 16px;
  }

  .mobile-nav-item {
    padding: 14px 16px;
    font-size: 15px;
  }
}
</style>


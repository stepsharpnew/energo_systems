<template>
  <nav class="main-nav" aria-label="Основная навигация">
    <div class="nav-container desktop-nav">
      <template v-for="item in navItems" :key="item.key">
        <NuxtLink
          v-if="item.href"
          :to="item.href"
          class="nav-item"
          :class="{ featured: item.featured }"
        >
          {{ item.label }}
        </NuxtLink>
        <button
          v-else
          type="button"
          class="nav-item"
          @click="handleNavClick(item.key)"
        >
          {{ item.label }}
        </button>
      </template>
    </div>

    <div class="mobile-nav-wrapper">
      <button
        class="mobile-menu-toggle"
        type="button"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Открыть меню"
      >
        <span class="hamburger-icon" aria-hidden="true">
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
              <span aria-hidden="true">×</span>
            </button>

            <div class="mobile-menu-header">
              <span class="mobile-menu-title">Меню</span>
              <span class="mobile-menu-subtitle">Энергосистемы</span>
            </div>

            <div class="mobile-menu-items">
              <template v-for="item in navItems" :key="item.key">
                <NuxtLink
                  v-if="item.href"
                  :to="item.href"
                  class="mobile-nav-item"
                  :class="{ featured: item.featured }"
                  @click="closeMobileMenu"
                >
                  {{ item.label }}
                </NuxtLink>
                <button
                  v-else
                  type="button"
                  class="mobile-nav-item"
                  @click="handleNavClick(item.key)"
                >
                  {{ item.label }}
                </button>
              </template>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
  emits: ["scroll-to"],
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
  methods: {
    handleNavClick(key) {
      this.closeMobileMenu();
      this.$emit("scroll-to", key);
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      document.body.style.overflow = this.isMobileMenuOpen ? "hidden" : "";
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
      document.body.style.overflow = "";
    },
  },
};
</script>

<style scoped>
.main-nav {
  position: sticky;
  top: 0;
  z-index: 29;
  background: #102234;
  border-bottom: 1px solid rgba(240, 90, 40, 0.34);
  box-shadow: 0 10px 24px rgba(16, 34, 52, 0.18);
}

.nav-container {
  width: min(100% - 48px, 1280px);
  margin: 0 auto;
}

.desktop-nav {
  min-height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
}

.desktop-nav::-webkit-scrollbar {
  display: none;
}

.nav-item {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 14px;
  background: transparent;
  color: rgba(255, 255, 255, 0.86);
  font-size: 14px;
  font-weight: 800;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.nav-item:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(255, 255, 255, 0.12);
}

.nav-item.featured {
  color: #ffffff;
  border-color: rgba(240, 90, 40, 0.72);
  background: #f05a28;
  box-shadow: 0 10px 20px rgba(240, 90, 40, 0.2);
}

.nav-item.featured:hover {
  background: #d84618;
  border-color: #d84618;
}

.nav-item:active {
  transform: translateY(1px);
}

.nav-item:focus-visible,
.mobile-menu-toggle:focus-visible,
.mobile-menu-close:focus-visible,
.mobile-nav-item:focus-visible {
  outline: 3px solid rgba(240, 90, 40, 0.36);
  outline-offset: 3px;
}

.mobile-nav-wrapper {
  display: none;
}

.mobile-menu-toggle {
  position: fixed;
  top: 18px;
  right: 16px;
  z-index: 40;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: #102234;
  box-shadow: 0 12px 28px rgba(16, 34, 52, 0.24);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 22px;
}

.hamburger-icon .line {
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}

.hamburger-icon .line.active:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-icon .line.active:nth-child(2) {
  opacity: 0;
}

.hamburger-icon .line.active:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 38;
  background: rgba(7, 19, 30, 0.58);
  backdrop-filter: blur(6px);
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 39;
  width: min(360px, 90vw);
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-left: 1px solid #d8e4ed;
  box-shadow: -18px 0 46px rgba(16, 34, 52, 0.24);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.mobile-menu-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border: 1px solid #c5d9e7;
  border-radius: 8px;
  background: #f2f8fc;
  color: #102234;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
}

.mobile-menu-header {
  display: grid;
  gap: 4px;
  padding: 26px 72px 20px 22px;
  border-bottom: 1px solid #e3edf4;
}

.mobile-menu-title {
  color: #102234;
  font-size: 22px;
  font-weight: 850;
  line-height: 1.1;
}

.mobile-menu-subtitle {
  color: #647789;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
}

.mobile-menu-items {
  display: grid;
  gap: 8px;
  padding: 18px 18px 24px;
}

.mobile-nav-item {
  width: 100%;
  min-height: 48px;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0 14px;
  background: #ffffff;
  color: #142233;
  font-size: 16px;
  font-weight: 800;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}

.mobile-nav-item:hover {
  background: #eef6fb;
  border-color: #c5d9e7;
  color: #175f8f;
}

.mobile-nav-item.featured {
  background: #f05a28;
  border-color: #f05a28;
  color: #ffffff;
}

.mobile-nav-item.featured:hover {
  background: #d84618;
  border-color: #d84618;
  color: #ffffff;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.18s ease;
}

.mobile-menu-enter-active .mobile-menu,
.mobile-menu-leave-active .mobile-menu {
  transition: transform 0.18s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-enter-from .mobile-menu,
.mobile-menu-leave-to .mobile-menu {
  transform: translateX(100%);
}

@media (max-width: 992px) {
  .main-nav {
    position: static;
    height: 0;
    border-bottom: 0;
    background: transparent;
    box-shadow: none;
  }

  .desktop-nav {
    display: none;
  }

  .mobile-nav-wrapper {
    display: block;
  }
}

@media (max-width: 560px) {
  .mobile-menu-toggle {
    top: 14px;
    right: 14px;
  }

  .mobile-menu {
    width: 100vw;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-item,
  .hamburger-icon .line,
  .mobile-menu-enter-active,
  .mobile-menu-leave-active,
  .mobile-menu-enter-active .mobile-menu,
  .mobile-menu-leave-active .mobile-menu {
    transition: none;
  }
}
</style>

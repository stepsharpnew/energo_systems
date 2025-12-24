<template>
  <section class="projects-showcase" ref="projectsSection">
    <div class="projects-header">
      <h2>Выполненные проекты</h2>
      <p>Сильные кейсы для промышленных, муниципальных и частных заказчиков</p>
    </div>
    <div class="projects-grid">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        :ref="el => setCardRef(el, index)"
        :class="[
          'project-card',
          { 'card-left': index < 2, 'card-right': index >= 2 && index < 4 }
        ]"
      >
        <div
          class="project-cover"
          :style="{ backgroundImage: `url(${project.image})` }"
        ></div>
        <div class="project-meta">
          <span class="project-client">{{ project.client }}</span>
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-address">{{ project.address }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  name: "ProjectsShowcase",
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cardRefs: [],
      scrollTriggers: [],
    };
  },
  mounted() {
    this.initScrollTriggers();
    window.addEventListener("resize", this.handleResize, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    if (this.scrollTriggers) {
      this.scrollTriggers.forEach((st) => st.kill());
      this.scrollTriggers = [];
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },
  methods: {
    setCardRef(el, index) {
      if (el) {
        this.cardRefs[index] = el;
      }
    },
    initScrollTriggers() {
      this.$nextTick(() => {
        const isMobile = window.innerWidth <= 1200;

        // Очищаем предыдущие триггеры
        if (this.scrollTriggers.length > 0) {
          this.scrollTriggers.forEach((st) => st.kill());
          this.scrollTriggers = [];
        }

        // Определяем параметры анимации в зависимости от устройства
        const getCardAnimationConfig = (index) => {
          if (isMobile) {
            // На мобильных - упрощенные анимации с меньшими смещениями
            const offsets = [
              { x: -40, y: 20 }, // Карточка 0
              { x: -30, y: 15 }, // Карточка 1
              { x: 30, y: 15 },  // Карточка 2
              { x: 40, y: 20 },  // Карточка 3
            ];
            const patternIndex = index % 4;
            const offset = offsets[patternIndex] || { x: 0, y: 20 };
            return {
              x: offset.x,
              y: offset.y,
            };
          } else {
            // Десктоп - оригинальные анимации
            const configs = [
              { x: -150, y: 40 },  // Карточка 0
              { x: -80, y: 30 },   // Карточка 1
              { x: 80, y: 30 },    // Карточка 2
              { x: 150, y: 40 },   // Карточка 3
            ];
            const patternIndex = index % 4;
            const config = configs[patternIndex] || { x: 0, y: 30 };
            return {
              x: config.x,
              y: config.y,
            };
          }
        };

        // Создаем анимации для всех карточек - с opacity, быстрее
        this.cardRefs.forEach((card, index) => {
          if (!card) return;

          const offset = getCardAnimationConfig(index);
          const anim = gsap.fromTo(
            card,
            {
              opacity: 0,
              x: offset.x,
              y: offset.y,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.2,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            }
          );

          if (anim.scrollTrigger) {
            this.scrollTriggers.push(anim.scrollTrigger);
          }
        });

        // Обновляем ScrollTrigger после создания всех анимаций
        this.refreshScrollTrigger();
      });
    },
    refreshScrollTrigger() {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    },
    handleResize() {
      // При изменении размера пересоздаем анимации
      if (this.scrollTriggers.length > 0) {
        this.scrollTriggers.forEach((st) => st.kill());
        this.scrollTriggers = [];
      }
      
      // Пересоздаем анимации с новыми параметрами
      this.initScrollTriggers();
    },
  },
};
</script>

<style scoped>
.projects-showcase {
  padding: clamp(50px, 7vw, 100px) 0;
}

.projects-header {
  text-align: center;
  margin-bottom: clamp(32px, 5vw, 60px);
  margin-top: clamp(20px, 4vw, 40px);
}

.projects-header h2 {
  font-size: clamp(30px, 4.5vw, 44px);
  margin-bottom: 12px;
  color: #0f172a;
}

.projects-header p {
  color: #61728a;
  font-size: clamp(16px, 2vw, 18px);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(260px, 100%), 1fr));
  gap: clamp(18px, 3vw, 28px);
  max-width: 100%;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.project-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease, background 0.3s ease;
  position: relative;
  will-change: transform, opacity;
}

.project-card:hover {
  box-shadow: 0 18px 40px rgba(239, 68, 34, 0.25);
  background: rgba(255, 255, 255, 1);
}

.project-cover {
  width: 100%;
  aspect-ratio: 4 / 3;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

.project-meta {
  padding: clamp(16px, 2.5vw, 24px);
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 1vw, 10px);
  flex: 1;
  min-height: 0;
}

.project-client {
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #ef4422;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.project-name {
  font-size: clamp(14px, 2vw, 16px);
  margin: 0;
  color: #0f172a;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
  flex: 1;
  min-height: 0;
}

.project-address {
  margin: 0;
  color: #64748b;
  font-size: clamp(13px, 1.8vw, 15px);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}


@media (max-width: 1200px) {
  /* Анимации теперь работают на мобильных, CSS правила удалены */
}

@media (max-width: 767px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .project-meta {
    padding: 18px 20px 20px;
  }
  
  .project-client {
    -webkit-line-clamp: 1;
  }
  
  .project-name {
    -webkit-line-clamp: 2;
  }
}
</style>

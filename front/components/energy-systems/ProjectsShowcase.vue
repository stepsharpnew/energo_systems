<template>
  <section id="projects" class="projects-showcase" ref="projectsSection">
    <div class="projects-header">
      <h2>Выполненные проекты</h2>
      <p>Сильные кейсы для промышленных, муниципальных и частных заказчиков</p>
    </div>
    <div class="projects-grid">
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        :class="[
          'project-card',
          { 'card-left': index < 2, 'card-right': index >= 2 && index < 4 }
        ]"
      >
        <img
          class="project-cover"
          v-bind="imageAttrs(project.image, { sizes: '(max-width: 768px) 100vw, 50vw', width: 800 })"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div class="project-meta">
          <span class="project-client">{{ project.client }}</span>
          <h3 class="project-name">{{ project.name }}</h3>
          <p class="project-address">{{ project.address }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { revealOnVisible } from '~/utils/revealOnVisible.js'
import { imageAttrs } from '~/utils/responsiveImage.js'
import '~/assets/styles/progressive-reveal.css'
defineProps({ projects: { type: Array, required: true } })
const projectsSection = ref(null)
let stopReveals
onMounted(() => { stopReveals = revealOnVisible(projectsSection.value, '.project-card') })
onBeforeUnmount(() => stopReveals?.())
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
}

.project-card:hover {
  box-shadow: 0 18px 40px rgba(255, 72, 0, 0.25);
  background: rgba(255, 255, 255, 1);
}

.project-cover {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
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
  color: #c94218;
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

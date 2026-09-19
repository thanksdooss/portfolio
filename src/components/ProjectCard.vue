<script setup>
defineProps({ project: { type: Object, required: true }, index: { type: Number, default: 0 } })
const base = import.meta.env.BASE_URL
</script>

<template>
  <RouterLink :to="`/p/${project.id}`" class="pc card">
    <div class="thumb">
      <img v-if="project.thumb || project.cover" :src="base + (project.thumb || project.cover)" :style="{ objectPosition: project.thumbPos || 'center' }" :alt="project.coverAlt || project.title" loading="lazy" decoding="async" width="800" height="500" />
      <div v-else class="ph" aria-hidden="true"><span>{{ project.metrics?.[0]?.value }}</span><small>{{ project.metrics?.[0]?.label }}</small></div>
      <span class="no">{{ String(index + 1).padStart(2, '0') }}</span>
      <span v-if="project.award" class="award">{{ project.award.short }}</span>
    </div>
    <div class="body">
      <p class="meta">{{ project.period }} · {{ project.context }}</p>
      <h3>{{ project.title }}</h3>
      <p class="one">{{ project.oneLiner }}</p>
      <ul v-if="project.metrics?.length" class="metrics">
        <li v-for="m in project.metrics.slice(0, 3)" :key="m.label"><b>{{ m.value }}</b><span>{{ m.label }}</span></li>
      </ul>
      <div class="tags">
        <span v-for="t in project.tags.slice(0, 5)" :key="t" class="tag">{{ t }}</span>
      </div>
      <span class="more">케이스 스터디 보기 →</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.pc { display: flex; flex-direction: column; text-decoration: none; overflow: hidden; transition: transform .2s, border-color .2s; }
.pc:hover { transform: translateY(-3px); border-color: var(--accent); }
.thumb { position: relative; aspect-ratio: 16 / 10; background: var(--surface-2); border-bottom: 1px solid var(--line); overflow: hidden; }
.thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.pc:hover .thumb img { transform: scale(1.03); }
.ph { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  background: repeating-linear-gradient(45deg, var(--surface-2) 0 10px, var(--surface) 10px 20px); }
.ph span { font-size: 40px; font-weight: 800; color: var(--accent-ink); letter-spacing: -0.03em; }
.ph small { font-size: 13px; color: var(--ink-2); }
.no { position: absolute; left: 12px; top: 10px; font-family: var(--mono); font-size: 12px; background: var(--navy); color: var(--bg); padding: 2px 8px; border-radius: 6px; }
.award { position: absolute; right: 10px; top: 10px; font-size: 12px; font-weight: 700; background: var(--accent); color: #fff; padding: 3px 9px; border-radius: 999px; }
.body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.meta { font-family: var(--mono); font-size: 11.5px; color: var(--ink-3); }
h3 { font-size: 19px; }
.one { color: var(--ink-2); font-size: 15px; }
.metrics { list-style: none; margin: 2px 0; padding: 0; display: flex; flex-wrap: wrap; gap: 14px; }
.metrics li { display: flex; flex-direction: column; }
.metrics b { font-size: 18px; color: var(--accent-ink); line-height: 1.2; }
.metrics span { font-size: 12px; color: var(--ink-3); }
.more { margin-top: auto; padding-top: 6px; font-weight: 600; font-size: 14px; color: var(--accent-ink); }
</style>

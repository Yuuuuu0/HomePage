<template>
  <div class="quick-links">
    <a 
      v-for="link in links" 
      :key="link.url"
      :href="link.url" 
      target="_blank" 
      rel="noopener noreferrer"
      class="link-item"
    >
      <span>{{ link.label }}</span>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import quickLinksConfig from '@/config/quick-links.json'

interface QuickLink {
  label: string
  url: string
}

const links = computed<QuickLink[]>(() => quickLinksConfig as QuickLink[])
</script>

<style scoped>
.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 20px 0;
}

.link-item {
  display: block;
  padding: 12px 20px;
  border-radius: 10px;
  min-width: 120px;
  text-align: center;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.link-item::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 10px;
  background: rgba(80, 80, 80, 0.5);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  z-index: -1;
  pointer-events: none;
}

.link-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.link-item span {
  display: block;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


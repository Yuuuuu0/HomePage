<template>
  <div class="site-name">
    {{ siteName }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSiteName } from '@/utils/config'

const siteName = computed(() => getSiteName())
</script>

<style scoped>
.site-name {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: 8px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin-bottom: 40px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

@media (max-width: 768px) {
  .site-name {
    font-size: 48px;
    letter-spacing: 4px;
    margin-bottom: 30px;
  }
}
</style>


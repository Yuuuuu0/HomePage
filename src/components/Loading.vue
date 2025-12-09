<template>
  <div class="loading">
    <div class="spinner"></div>
    <div class="loading-title">{{ siteName }}</div>
    <div class="loading-text">Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSiteName } from '@/utils/config'

const siteName = computed(() => getSiteName())
</script>

<style scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(200, 200, 200, 0.3);
  border-top-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 24px;
}

.loading-title {
  font-size: 36px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.loading-text {
  font-size: 32px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .spinner {
    width: 50px;
    height: 50px;
    border-width: 3px;
    margin-bottom: 20px;
  }
  
  .loading-title {
    font-size: 32px;
    letter-spacing: 2px;
  }
  
  .loading-text {
    font-size: 16px;
    letter-spacing: 2px;
  }
}
</style>


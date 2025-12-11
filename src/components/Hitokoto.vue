<template>
  <div class="hitokoto">
    <div v-if="isLoading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="content">
      <div class="text">{{ hitokoto }}</div>
      <div v-if="from" class="from">—— {{ from }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHitokoto } from '@/composables/useHitokoto'

const { hitokoto, from, isLoading, error } = useHitokoto()
</script>

<style scoped>
.hitokoto {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  text-align: center;
}

.text {
  font-size: 18px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.98);
  margin-bottom: 12px;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 5px rgba(0, 0, 0, 0.3);
}

.from {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  text-align: right;
  font-style: italic;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5), 0 0 4px rgba(0, 0, 0, 0.3);
}

.loading,
.error {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.5), 0 0 4px rgba(0, 0, 0, 0.3);
}

.error {
  color: rgba(255, 150, 150, 0.95);
}

@media (max-width: 768px) {
  .text {
    font-size: 16px;
  }
  
  .from {
    font-size: 13px;
  }
}
</style>


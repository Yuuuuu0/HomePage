<template>
  <div class="home-clock" @click="emit('click')">
    <div class="date">{{ date }}</div>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script setup lang="ts">
import { useClock } from '@/composables/useClock'

interface Emits {
  (e: 'click'): void
}

const emit = defineEmits<Emits>()
const { date, time } = useClock()
</script>

<style scoped>
.home-clock {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 100;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.date {
  font-size: 14px;
  margin-bottom: 6px;
  opacity: 0.9;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.95);
}

.date,
.time {
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.6), 0 0 4px rgba(0, 0, 0, 0.4);
}

.time {
  font-size: 24px;
  font-weight: 300;
  letter-spacing: 1.5px;
  font-variant-numeric: tabular-nums;
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .home-clock {
    top: 15px;
    right: 15px;
  }
  
  .time {
    font-size: 20px;
  }
  
  .date {
    font-size: 12px;
  }
}
</style>


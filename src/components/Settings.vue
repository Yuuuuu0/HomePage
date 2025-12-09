<template>
  <Transition name="fade">
    <div v-if="isOpen" class="settings-overlay" @click.self="close">
      <div class="settings-panel" @click.stop>
        <div class="settings-header">
          <h2>设置</h2>
          <button class="close-btn" @click="close">×</button>
        </div>
        <div class="settings-content">
          <div class="setting-section">
            <div class="section-title">壁纸类型</div>
            <div class="selector-options">
              <button
                v-for="type in wallpaperTypes"
                :key="type.id"
                class="option-btn"
                :class="{ active: selectedType === type.id }"
                @click="selectWallpaperType(type.id)"
                :disabled="isLoading"
              >
                {{ type.name }}
              </button>
            </div>
            <div v-if="isLoading" class="loading-text">加载中...</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useWallpaper } from '@/composables/useWallpaper'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { selectedType, isLoading, wallpaperTypes, selectWallpaperType } = useWallpaper()

const close = () => {
  emit('close')
}
</script>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.settings-panel {
  background: rgba(60, 60, 60, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.settings-header h2 {
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.settings-content {
  padding: 28px;
}

.setting-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
  font-weight: 500;
}

.selector-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.option-btn {
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  text-align: center;
}

.option-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.option-btn.active {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
}

.option-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-text {
  margin-top: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


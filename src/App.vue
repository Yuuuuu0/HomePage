<template>
  <Loading v-if="!isAppReady" />
  <div v-else class="app fade-in-up">
    <HomeClock @click="openSettings" />
    <Settings :is-open="isSettingsOpen" @close="closeSettings" />
    <div class="main-content">
      <SiteName />
      <Hitokoto />
      <QuickLinks />
    </div>
    <Contacts />
    <Copyright />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppLoading } from './composables/useAppLoading'
import { useWallpaper } from './composables/useWallpaper'
import { useHitokoto } from './composables/useHitokoto'
import Settings from './components/Settings.vue'
import HomeClock from './components/HomeClock.vue'
import SiteName from './components/SiteName.vue'
import Hitokoto from './components/Hitokoto.vue'
import QuickLinks from './components/QuickLinks.vue'
import Contacts from './components/Contacts.vue'
import Copyright from './components/Copyright.vue'
import Loading from './components/Loading.vue'

const { isLoading: isWallpaperLoading, initWallpaper } = useWallpaper()
const { isLoading: isHitokotoLoading, fetchHitokoto } = useHitokoto()

// 初始化加载
onMounted(() => {
  initWallpaper()
  fetchHitokoto()
})

const { isAppReady } = useAppLoading(isWallpaperLoading, isHitokotoLoading)
const isSettingsOpen = ref(false)

const openSettings = () => {
  isSettingsOpen.value = true
}

const closeSettings = () => {
  isSettingsOpen.value = false
}
</script>

<style>
@import './styles/base.css';
@import './styles/animation.css';
</style>

<style scoped>
.app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
}

.main-content {
  text-align: center;
  z-index: 10;
  position: relative;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

@media (max-width: 768px) {
  .app {
    overflow: visible;
    height: auto;
    min-height: 100vh;
    position: relative;
  }

  .main-content {
    max-width: 100%;
    gap: 24px;
  }
}
</style>


import { ref, watch } from 'vue'

/**
 * 统一管理应用加载状态
 * 确保所有关键资源加载完成后再显示主页
 * @param isWallpaperLoading 壁纸加载状态
 * @param isHitokotoLoading Hitokoto 加载状态
 */
export function useAppLoading(isWallpaperLoading: { value: boolean }, isHitokotoLoading: { value: boolean }) {
  const isAppReady = ref<boolean>(false)
  
  // 监听所有加载状态
  watch([isWallpaperLoading, isHitokotoLoading], ([wallpaperLoading, hitokotoLoading]) => {
    if (!wallpaperLoading && !hitokotoLoading && !isAppReady.value) {
      // 延迟一点显示，确保过渡平滑
      setTimeout(() => {
        isAppReady.value = true
      }, 300)
    }
  }, { immediate: true })
  
  // 设置超时，避免无限等待
  setTimeout(() => {
    if (!isAppReady.value) {
      isAppReady.value = true
    }
  }, 15000) // 15秒超时
  
  return {
    isAppReady
  }
}


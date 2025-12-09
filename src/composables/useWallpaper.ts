import { ref } from 'vue'
import { WALLPAPER_SOURCES, STORAGE_KEYS, TIMEOUTS } from '@/utils/constants'
import { setWallpaper as setWallpaperStyle, setLoadingBackground, resetBackground } from '@/utils/background'

const DEFAULT_TYPE = 'anime'

// 全局加载锁，防止重复请求
let isInitializing = false

export function useWallpaper() {
  const selectedType = ref<string>('')
  const isLoading = ref<boolean>(false)

  const getStoredType = (): string => {
    return localStorage.getItem(STORAGE_KEYS.WALLPAPER_TYPE) || DEFAULT_TYPE
  }

  const saveType = (type: string) => {
    localStorage.setItem(STORAGE_KEYS.WALLPAPER_TYPE, type)
    selectedType.value = type
  }

  const loadWallpaper = async (type?: string): Promise<void> => {
    const wallpaperType = type || selectedType.value || getStoredType()
    const source = WALLPAPER_SOURCES.find(s => s.id === wallpaperType)
    
    if (!source || isLoading.value) {
      return Promise.resolve()
    }

    selectedType.value = wallpaperType
    isLoading.value = true
    setLoadingBackground()
    
    return new Promise((resolve) => {
      const url = `${source.url}?t=${Date.now()}`
      const img = new Image()
      
      const cleanup = () => {
        isLoading.value = false
        resolve()
      }
      
      const timeout = setTimeout(() => {
        if (isLoading.value) {
          console.warn('Wallpaper load timeout')
          resetBackground()
          cleanup()
        }
      }, TIMEOUTS.WALLPAPER_LOAD)
      
      img.onload = () => {
        clearTimeout(timeout)
        setWallpaperStyle(url)
        cleanup()
      }
      
      img.onerror = () => {
        clearTimeout(timeout)
        console.error('Failed to load wallpaper from:', source.url)
        resetBackground()
        cleanup()
      }
      
      img.src = url
    })
  }

  const selectWallpaperType = (type: string) => {
    saveType(type)
    loadWallpaper(type)
  }

  const initWallpaper = () => {
    // 如果已经在初始化，直接返回
    if (isInitializing) return
    
    isInitializing = true
    const storedType = getStoredType()
    selectedType.value = storedType
    loadWallpaper(storedType).finally(() => {
      isInitializing = false
    })
  }

  return {
    selectedType,
    isLoading,
    wallpaperTypes: WALLPAPER_SOURCES,
    loadWallpaper,
    selectWallpaperType,
    initWallpaper
  }
}


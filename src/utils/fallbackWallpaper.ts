/**
 * 预制背景图管理工具
 * 当 API 获取背景图失败时，使用预制的背景图作为兜底
 */

/**
 * 检测是否为移动设备
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768
}

/**
 * 获取设备类型对应的背景图文件夹路径
 */
export const getFallbackWallpaperPath = (): string => {
  return isMobileDevice() 
    ? '/fallback-wallpapers/mobile' 
    : '/fallback-wallpapers/pc'
}

/**
 * 获取固定的预制背景图路径
 * 固定使用 wallpaper.jpg 作为兜底图片
 */
export const getFallbackWallpaper = (): string => {
  const basePath = getFallbackWallpaperPath()
  return `${basePath}/wallpaper.jpg`
}

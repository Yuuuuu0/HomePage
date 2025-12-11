/**
 * 应用常量配置
 */

export const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'] as const

export const HITOKOTO_API = 'https://v1.hitokoto.cn/'

export const WALLPAPER_SOURCES = [
  { id: 'bing', name: '每日一图', url: 'https://api.dujin.org/bing/1920.php' },
  { id: 'fengjing', name: '随机风景', url: 'https://tu.ltyuanfang.cn/api/fengjing.php' },
  { id: 'anime', name: '随机动漫', url: 'https://www.loliapi.com/acg/' }
] as const

export const STORAGE_KEYS = {
  WALLPAPER_TYPE: 'wallpaper_type'
} as const

export const TIMEOUTS = {
  WALLPAPER_LOAD: 10000 // 10秒
} as const


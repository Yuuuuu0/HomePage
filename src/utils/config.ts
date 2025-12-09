/**
 * 配置读取工具函数
 * 统一管理配置读取，避免重复计算
 */

import appConfig from '@/config/app.json'

let cachedSiteName: string | null = null
let cachedRepository: string | null = null

export const getSiteName = (): string => {
  if (cachedSiteName === null) {
    cachedSiteName = appConfig.siteName || 'HomePage'
  }
  return cachedSiteName
}

export const getRepository = (): string => {
  if (cachedRepository === null) {
    cachedRepository = appConfig.repository || ''
  }
  return cachedRepository
}


/**
 * 环境变量工具函数
 * 统一管理环境变量读取，避免重复计算
 */

const envCache = {
  github: '',
  email: '',
  telegram: ''
}

const getEnv = (key: string): string => {
  return import.meta.env[key] || ''
}

export const getContactGithub = (): string => {
  if (!envCache.github) {
    envCache.github = getEnv('VITE_CONTACT_GITHUB')
  }
  return envCache.github
}

export const getContactEmail = (): string => {
  if (!envCache.email) {
    envCache.email = getEnv('VITE_CONTACT_EMAIL')
  }
  return envCache.email
}

export const getContactTelegram = (): string => {
  if (!envCache.telegram) {
    envCache.telegram = getEnv('VITE_CONTACT_TELEGRAM')
  }
  return envCache.telegram
}


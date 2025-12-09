/**
 * 通用工具函数
 */

/**
 * 数字补零
 */
export const padZero = (num: number): string => String(num).padStart(2, '0')

/**
 * 从 URL 中提取仓库名
 */
export const extractRepoName = (url: string): string => {
  if (!url) return ''
  
  const parts = url.split('/').filter(Boolean)
  
  if (parts.length >= 2) {
    return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`
  }
  
  return parts[parts.length - 1] || 'Repository'
}

/**
 * 设置 body 样式
 */
export const setBodyStyle = (styles: Partial<CSSStyleDeclaration>) => {
  const body = document.body.style
  Object.assign(body, styles)
}


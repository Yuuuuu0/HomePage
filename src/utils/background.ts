/**
 * 背景管理工具函数
 */

import { setBodyStyle } from './helpers'

const DEFAULT_BACKGROUND = '#1a1a1a'
const LOADING_GRADIENT = 'linear-gradient(135deg, #404040 0%, #353535 25%, #2a2a2a 50%, #353535 75%, #404040 100%)'

export const setWallpaper = (imageUrl: string) => {
  setBodyStyle({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '',
    animation: ''
  })
}

export const setLoadingBackground = () => {
  setBodyStyle({
    backgroundImage: LOADING_GRADIENT,
    backgroundSize: '400% 400%',
    backgroundPosition: '0% 50%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '',
    animation: 'gradientShift 8s ease infinite'
  })
}

export const resetBackground = () => {
  setBodyStyle({
    backgroundColor: DEFAULT_BACKGROUND,
    backgroundImage: 'none',
    animation: ''
  })
}


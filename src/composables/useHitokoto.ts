import { ref } from 'vue'
import { HITOKOTO_API } from '@/utils/constants'
import { fetchJSON } from '@/utils/api'

export interface HitokotoData {
  id: number
  uuid: string
  hitokoto: string
  type: string
  from: string
  from_who: string | null
  creator: string
  creator_uid: number
  reviewer: number
  commit_from: string
  created_at: string
  length: number
}

const ERROR_MESSAGE = '获取一言失败'

// 全局加载锁和共享状态
let isFetching = false
let sharedHitokoto = ref<string>('')
let sharedFrom = ref<string>('')
let sharedIsLoading = ref<boolean>(false)
let sharedError = ref<string>('')

export function useHitokoto() {
  const hitokoto = sharedHitokoto
  const from = sharedFrom
  const isLoading = sharedIsLoading
  const error = sharedError

  const fetchHitokoto = async () => {
    // 如果正在加载中，直接返回
    if (isFetching || isLoading.value) return
    
    // 如果已有数据，直接返回
    if (hitokoto.value && !error.value) return
    
    isFetching = true
    isLoading.value = true
    error.value = ''
    
    try {
      const data = await fetchJSON<HitokotoData>(HITOKOTO_API)
      hitokoto.value = data.hitokoto
      from.value = data.from || ''
    } catch (err) {
      console.error('Failed to fetch hitokoto:', err)
      error.value = ERROR_MESSAGE
      hitokoto.value = ''
      from.value = ''
    } finally {
      isLoading.value = false
      isFetching = false
    }
  }

  return {
    hitokoto,
    from,
    isLoading,
    error,
    fetchHitokoto
  }
}


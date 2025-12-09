import { ref, onMounted, onUnmounted } from 'vue'
import { WEEKDAYS } from '@/utils/constants'
import { padZero } from '@/utils/helpers'

export interface ClockData {
  date: string
  time: string
}

export function useClock() {
  const date = ref<string>('')
  const time = ref<string>('')

  const updateClock = () => {
    const now = new Date()
    
    // 2025 年 12 月 09 日 星期二
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    const weekday = WEEKDAYS[now.getDay()]
    date.value = `${year} 年 ${month} 月 ${padZero(day)} 日 ${weekday}`
    
    // HH:mm:ss
    time.value = `${padZero(now.getHours())}:${padZero(now.getMinutes())}:${padZero(now.getSeconds())}`
  }

  let intervalId: number | null = null

  onMounted(() => {
    updateClock()
    intervalId = window.setInterval(updateClock, 1000)
  })

  onUnmounted(() => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  })

  return {
    date,
    time
  }
}


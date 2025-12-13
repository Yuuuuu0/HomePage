<template>
  <div class="search-box">
    <div class="search-container" :class="{ 'is-focused': isFocused }">
      <div ref="logoWrapperRef" class="engine-logo-wrapper" @click.stop="toggleEngineMenu">
        <div ref="logoRef" class="engine-logo">
          <span v-if="currentEngine.id === 'google'" class="logo-text">G</span>
          <span v-else-if="currentEngine.id === 'bing'" class="logo-text">B</span>
        </div>
      </div>
      <div class="search-input-wrapper">
        <input
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="想要搜索点什么"
          @keydown.enter="handleSearch"
          @keydown.escape="handleEscape"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <div class="shortcut-hint-wrapper">
          <span v-if="showShortcutHint && !searchQuery.trim()" class="shortcut-hint">
            <kbd>/</kbd> 或 <kbd>Ctrl+K</kbd>
          </span>
        </div>
        <button class="search-btn" @click="handleSearch" :disabled="!searchQuery.trim()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </div>
    <Transition name="dropdown">
      <div v-if="showEngineMenu" ref="engineMenuRef" class="engine-menu" @click.stop :style="{ left: menuLeft }">
        <button
          v-for="engine in searchEngines"
          :key="engine.id"
          class="engine-menu-item"
          :class="{ active: currentEngine.id === engine.id }"
          @click="selectEngine(engine.id)"
        >
          <span class="engine-menu-logo">
            <span v-if="engine.id === 'google'">G</span>
            <span v-else-if="engine.id === 'bing'">B</span>
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

interface SearchEngine {
  id: string
  name: string
  url: string
}

const searchEngines: SearchEngine[] = [
  { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
  { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' }
]

const searchQuery = ref('')
const currentEngine = ref<SearchEngine>(searchEngines[0]) // 默认 Google
const isFocused = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const logoWrapperRef = ref<HTMLDivElement | null>(null)
const logoRef = ref<HTMLDivElement | null>(null)
const engineMenuRef = ref<HTMLDivElement | null>(null)
const showShortcutHint = ref(true)
const showEngineMenu = ref(false)
const menuLeft = ref<string>('0px')

const selectEngine = (engineId: string) => {
  const engine = searchEngines.find(e => e.id === engineId)
  if (engine) {
    currentEngine.value = engine
    localStorage.setItem('search_engine', engineId)
    showEngineMenu.value = false
  }
}

const updateMenuPosition = () => {
  if (logoRef.value) {
    nextTick(() => {
      if (logoRef.value) {
        const logoRect = logoRef.value.getBoundingClientRect()
        const searchBox = logoRef.value.closest('.search-box')
        if (searchBox) {
          const searchBoxRect = searchBox.getBoundingClientRect()
          // 计算logo中心点相对于search-box的位置
          const logoCenterX = logoRect.left + logoRect.width / 2 - searchBoxRect.left
          // 下拉菜单中logo的尺寸
          const menuLogoSize = 28
          // 让下拉菜单的logo中心与搜索框中的logo中心对齐
          // 使用left定位，让菜单的左边距 = logo中心 - logo尺寸的一半
          menuLeft.value = `${logoCenterX - menuLogoSize / 2}px`
        }
      }
    })
  }
}

const toggleEngineMenu = () => {
  showEngineMenu.value = !showEngineMenu.value
  if (showEngineMenu.value) {
    updateMenuPosition()
  }
}

watch(showEngineMenu, () => {
  if (showEngineMenu.value) {
    updateMenuPosition()
  }
})

const handleFocus = () => {
  isFocused.value = true
}

const handleSearch = () => {
  const query = searchQuery.value.trim()
  if (query) {
    const searchUrl = `${currentEngine.value.url}${encodeURIComponent(query)}`
    window.open(searchUrl, '_blank')
    searchQuery.value = ''
    inputRef.value?.blur()
  }
}

const handleEscape = () => {
  searchQuery.value = ''
  inputRef.value?.blur()
}

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false
    showEngineMenu.value = false
  }, 200)
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.search-box')) {
    showEngineMenu.value = false
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === '/' && !isFocused.value && document.activeElement?.tagName !== 'INPUT') {
    e.preventDefault()
    inputRef.value?.focus()
  }
  
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  const savedEngine = localStorage.getItem('search_engine')
  if (savedEngine) {
    const engine = searchEngines.find(e => e.id === savedEngine)
    if (engine) {
      currentEngine.value = engine
    }
  }
  
  window.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateMenuPosition)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateMenuPosition)
})
</script>

<style scoped>
.search-box {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.search-container {
  background: rgba(40, 40, 40, 0.75);
  backdrop-filter: blur(30px) saturate(200%);
  -webkit-backdrop-filter: blur(30px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.search-container.is-focused {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.05);
}

.engine-logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;
}

.engine-logo {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.logo-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.98);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  padding: 0 12px;
  position: relative;
  min-width: 0;
  overflow: hidden;
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: rgba(255, 255, 255, 0.98);
  font-size: 14px;
  padding: 8px 8px;
  font-family: inherit;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.65);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.shortcut-hint-wrapper {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.shortcut-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.shortcut-hint kbd {
  display: inline-block;
  padding: 2px 5px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  font-size: 10px;
  font-family: monospace;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  text-shadow: none;
}

.search-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-right: 8px;
}

.search-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.search-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.engine-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  z-index: 1000;
}

.engine-menu-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.engine-menu-item:hover .engine-menu-logo {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.2);
}

.engine-menu-item.active .engine-menu-logo {
  background: rgba(255, 255, 255, 0.25);
}

.engine-menu-logo {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.98);
  transition: all 0.2s ease;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 768px) {
  .search-box {
    max-width: 100%;
    padding: 0 16px;
  }
  
  .search-container {
    overflow: hidden;
  }
  
  .search-input-wrapper {
    padding: 0 8px;
    gap: 4px;
  }
  
  .search-input {
    font-size: 13px;
    padding: 6px 6px;
  }
  
  .engine-logo-wrapper {
    padding: 5px 12px;
  }
  
  .engine-logo {
    width: 24px;
    height: 24px;
  }
  
  .logo-text {
    font-size: 12px;
  }
  
  .search-btn {
    width: 28px;
    height: 28px;
    margin-right: 6px;
  }
  
  .engine-menu-logo {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
  
  /* 手机端隐藏快捷提示，避免超出搜索栏 */
  .shortcut-hint-wrapper {
    display: none;
  }
}
</style>

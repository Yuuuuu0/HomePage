<template>
  <div class="copyright">
    <div class="copyright-content">
      <div class="copyright-text">
        © {{ currentYear }} HomePage. All rights reserved.
        <span v-if="repository" class="repo-separator">&</span>
        <span v-if="repository" class="repo-text">
          Made by 
          <a :href="repository" target="_blank" rel="noopener noreferrer" class="repo-link">
            {{ repoName }}
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getRepository } from '@/utils/config'
import { extractRepoName } from '@/utils/helpers'

const currentYear = computed(() => new Date().getFullYear())
const repository = computed(() => getRepository())
const repoName = computed(() => extractRepoName(repository.value))
</script>

<style scoped>
.copyright {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  text-align: center;
}

.copyright-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
}


.copyright-text,
.repo-text,
.repo-link {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.5), 0 0 3px rgba(0, 0, 0, 0.3);
}

.repo-link {
  text-decoration: none;
  transition: all 0.3s ease;
}

.repo-link:hover {
  color: rgba(255, 255, 255, 1);
}

.repo-separator {
  margin: 0 8px;
  opacity: 0.5;
}
</style>


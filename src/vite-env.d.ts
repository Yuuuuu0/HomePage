/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_GITHUB?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_CONTACT_TELEGRAM?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


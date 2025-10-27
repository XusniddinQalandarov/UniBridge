import type { ComponentCustomProperties } from 'vue'
import type { I18n } from 'vue-i18n'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
  }
}

export {}

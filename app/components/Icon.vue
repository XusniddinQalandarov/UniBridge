<template>
  <svg 
    :width="size" 
    :height="size" 
    :class="['inline-block align-middle flex-shrink-0', `icon--${name}`]"
    :aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path v-if="name === 'chevron-down'" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
    <path v-else-if="name === 'menu'" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    <path v-else-if="name === 'close'" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  size: 16
})
</script>
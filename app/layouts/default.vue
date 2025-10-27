<template>
  <div class="min-h-screen flex flex-col bg-white">
    <TheHeader />
    <main class="flex-1 bg-white">
      <slot />
    </main>
    <TheFooter />
    <LiveChat />
  </div>
</template>

<script setup lang="ts">
</script>

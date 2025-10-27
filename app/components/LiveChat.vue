<template>
  <!-- Render LiveChat only on the client to avoid SSR hydration mismatches (dates, timers) -->
  <ClientOnly>
    <div class="fixed bottom-6 right-6 z-50">
    <Button
      v-if="!isChatOpen"
      icon="pi pi-comments"
      class="w-12 !h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-0"
      :badge="unreadCount > 0 ? String(unreadCount) : undefined"
      @click="toggleChat"
      rounded
      aria-label="Open live chat"
    />
    
    <div v-if="isChatOpen" class="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200 overflow-hidden">
      <div class="bg-primary-500 text-white p-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <i class="pi pi-comments text-lg"></i>
          <span class="font-semibold">Live Chat</span>
        </div>
        <Button
          icon="pi pi-times"
          @click="toggleChat"
          class="w-8 h-8 p-0 bg-transparent hover:bg-primary-600 text-white border-0"
          text
          rounded
          size="small"
          aria-label="Close chat"
        />
      </div>
      
      <div class="flex-1 p-4 overflow-y-auto space-y-3">
        <div v-for="message in messages" :key="message.id" :class="['flex', message.type === 'user' ? 'justify-end' : 'justify-start']">
          <div :class="['max-w-xs px-3 py-2 rounded-lg', message.type === 'user' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-900']">
            <div class="text-sm">{{ message.text }}</div>
            <div :class="['text-xs mt-1', message.type === 'user' ? 'text-primary-100' : 'text-gray-500']">{{ formatTime(message.time) }}</div>
          </div>
        </div>
      </div>
      
      <div class="p-4 border-t border-gray-200 flex space-x-2">
        <InputText
          v-model="newMessage"
          placeholder="Type a message..."
          @keyup.enter="sendMessage"
          class="flex-1 text-sm"
        />
        <Button
          icon="pi pi-send"
          @click="sendMessage"
          :disabled="!newMessage.trim()"
          class="w-10 h-10 p-0 bg-primary-500 hover:bg-primary-600 text-white border-0"
        />
      </div>
    </div>
  </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isChatOpen = ref(false)
const newMessage = ref('')
const unreadCount = ref(0)
const messages = ref([
  {
    id: 1,
    text: 'Salom! Sizga qanday yordam bera olamiz?',
    type: 'received',
    time: new Date()
  }
])

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  if (isChatOpen.value) {
    unreadCount.value = 0
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  messages.value.push({
    id: Date.now(),
    text: newMessage.value,
    type: 'user',
    time: new Date()
  })
  
  newMessage.value = ''
  
  // Simulate response
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      text: 'Rahmat! Tez orada javob beramiz.',
      type: 'bot',
      time: new Date()
    })
    if (!isChatOpen.value) {
      unreadCount.value++
    }
  }, 1000)
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
/* LiveChat specific button styles - enhanced specificity for production */
.p-button,
button.p-button,
.p-component.p-button {
  border: none !important;
  font-family: inherit !important;
  line-height: 1.5 !important;
  transition: all 0.2s ease !important;
}

/* Main chat toggle button - enhanced selectors */
.p-button.bg-primary-500,
button.p-button.bg-primary-500,
.p-component.p-button.bg-primary-500,
.w-12.bg-primary-500,
.w-12 .p-button,
button.w-12 {
  background: rgb(59 130 246) !important; /* blue-500 */
  color: white !important;
  border: none !important;
  border-radius: 50% !important;
  width: 3rem !important;
  height: 3rem !important;
  min-width: 3rem !important;
  min-height: 3rem !important;
  max-width: 3rem !important;
  max-height: 3rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.p-button.bg-primary-500:hover,
button.p-button.bg-primary-500:hover,
.p-component.p-button.bg-primary-500:hover,
.w-12.bg-primary-500:hover,
.w-12 .p-button:hover,
button.w-12:hover {
  background: rgb(37 99 235) !important; /* blue-600 */
}

/* Close button in header - enhanced selectors */
.p-button.bg-transparent,
button.p-button.bg-transparent,
.p-component.p-button.bg-transparent,
.w-8.bg-transparent,
.w-8 .p-button,
button.w-8 {
  background: transparent !important;
  color: white !important;
  border: none !important;
  border-radius: 50% !important;
  width: 2rem !important;
  height: 2rem !important;
  min-width: 2rem !important;
  min-height: 2rem !important;
  max-width: 2rem !important;
  max-height: 2rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.p-button.bg-transparent:hover,
button.p-button.bg-transparent:hover,
.p-component.p-button.bg-transparent:hover,
.w-8.bg-transparent:hover,
.w-8 .p-button:hover,
button.w-8:hover {
  background: rgba(37, 99, 235, 0.8) !important; /* blue-600 with opacity */
}

/* Send button - enhanced selectors */
.p-button.w-10,
button.p-button.w-10,
.p-component.p-button.w-10,
.w-10.bg-primary-500,
.w-10 .p-button,
button.w-10 {
  background: rgb(59 130 246) !important; /* blue-500 */
  color: white !important;
  border: none !important;
  border-radius: 0.375rem !important; /* rounded */
  width: 2.5rem !important;
  height: 2.5rem !important;
  min-width: 2.5rem !important;
  min-height: 2.5rem !important;
  max-width: 2.5rem !important;
  max-height: 2.5rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.p-button.w-10:hover,
button.p-button.w-10:hover,
.p-component.p-button.w-10:hover,
.w-10.bg-primary-500:hover,
.w-10 .p-button:hover,
button.w-10:hover {
  background: rgb(37 99 235) !important; /* blue-600 */
}

.p-button.w-10:disabled,
button.p-button.w-10:disabled,
.p-component.p-button.w-10:disabled,
.w-10 .p-button:disabled,
button.w-10:disabled {
  background: rgb(156 163 175) !important; /* gray-400 */
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}

/* Icon styling - enhanced selectors */
.p-button .pi,
button.p-button .pi,
.p-component.p-button .pi,
.p-button i,
button i,
.p-button-icon {
  font-size: 1rem !important;
  line-height: 1 !important;
  font-weight: normal !important;
  font-style: normal !important;
  display: inline-block !important;
  width: auto !important;
  height: auto !important;
}

/* Ensure proper container sizing */
.fixed.bottom-6.right-6 {
  position: fixed !important;
  bottom: 1.5rem !important;
  right: 1.5rem !important;
  z-index: 50 !important;
}
</style>

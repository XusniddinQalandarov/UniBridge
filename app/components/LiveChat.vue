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
/* LiveChat specific button styles - these will override any global PrimeVue styles */
.p-button {
  border: none !important;
  border-radius: 50% !important;
}

/* Main chat toggle button */
.p-button.bg-primary-500 {
  background: rgb(59 130 246) !important; /* blue-500 */
  color: white !important;
  border-radius: 50% !important;
  width: 3rem !important;
  height: 3rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.p-button.bg-primary-500:hover {
  background: rgb(37 99 235) !important; /* blue-600 */
}

/* Close button in header */
.p-button.bg-transparent {
  background: transparent !important;
  color: white !important;
  border-radius: 50% !important;
  width: 2rem !important;
  height: 2rem !important;
}

.p-button.bg-transparent:hover {
  background: rgba(37, 99, 235, 0.8) !important; /* blue-600 with opacity */
}

/* Send button */
.p-button.w-10 {
  background: rgb(59 130 246) !important; /* blue-500 */
  color: white !important;
  border-radius: 0.375rem !important; /* rounded */
  width: 2.5rem !important;
  height: 2.5rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.p-button.w-10:hover {
  background: rgb(37 99 235) !important; /* blue-600 */
}

.p-button.w-10:disabled {
  background: rgb(156 163 175) !important; /* gray-400 */
  cursor: not-allowed !important;
}

/* Ensure icons are properly styled */
.p-button .pi {
  font-size: 1rem !important;
  line-height: 1 !important;
}
</style>

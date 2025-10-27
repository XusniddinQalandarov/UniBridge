<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section
      class="relative text-white py-24"
      style="background-image: url('/images/unis4.jpeg'); background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-400 opacity-80"></div>
      <div class="container mx-auto px-6 relative z-10">
        <h1 class="text-5xl font-bold mb-3">Tadbirlar va vebinarlar</h1>
        <p class="text-blue-100 text-lg">Bepul konsultatsiyalar va foydali vebinarlarda qatnashing</p>
      </div>
    </section>

    <!-- Search & Filter Section -->
    <section class="container mx-auto px-6 -mt-12 relative z-20">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="relative mb-6">
          <i class="pi pi-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Tadbirlarni qidirish..."
            class="w-full pl-14 pr-5 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base"
          />
        </div>

        <!-- Tabs -->
        <div class="flex gap-4 border-b border-gray-200">
          <button
            @click="activeTab = 'upcoming'"
            :class="[
              'pb-4 px-2 text-base font-medium transition-colors relative',
              activeTab === 'upcoming' 
                ? 'text-[#1646A2]' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Kelgusi tadbirlar
            <span
              v-if="activeTab === 'upcoming'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1646A2]"
            ></span>
          </button>
          <button
            @click="activeTab = 'past'"
            :class="[
              'pb-4 px-2 text-base font-medium transition-colors relative',
              activeTab === 'past' 
                ? 'text-[#1646A2]' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            O'tgan tadbirlar
            <span
              v-if="activeTab === 'past'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1646A2]"
            ></span>
          </button>
        </div>
      </div>
    </section>

    <!-- Events Grid -->
    <section class="container mx-auto px-6 py-16">
      <!-- Upcoming Events -->
      <div v-if="activeTab === 'upcoming'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="event in filteredUpcomingEvents"
          :key="event.id"
          class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] text-white p-8 text-center">
            <div class="text-5xl font-bold leading-none mb-2">{{ event.day }}</div>
            <div class="text-lg uppercase tracking-wide">{{ event.month }}</div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ event.title }}</h3>

            <div class="space-y-3 mb-4">
              <div class="flex items-center gap-3 text-gray-600 text-sm">
                <i class="pi pi-clock text-[#1646A2]"></i>
                <span>{{ event.time }}</span>
              </div>
              <div class="flex items-center gap-3 text-gray-600 text-sm">
                <i class="pi pi-map-marker text-[#1646A2]"></i>
                <span>{{ event.location }}</span>
              </div>
            </div>

            <p class="text-gray-600 mb-4 leading-relaxed text-sm flex-1">{{ event.description }}</p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="tag in event.tags"
                :key="tag"
                class="px-3 py-1 bg-blue-50 text-[#1646A2] rounded-md text-xs font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
              <div class="flex items-center gap-2 text-sm text-gray-500">
                <i class="pi pi-users text-[#1646A2]"></i>
                <span>{{ event.participants }} ishtirokchi</span>
              </div>
            </div>

            <button
              @click="registerEvent(event)"
              class="w-full px-6 py-3 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium"
            >
              <i class="pi pi-calendar-plus mr-2"></i>
              Ro'yxatdan o'tish
            </button>
          </div>
        </div>
      </div>

      <!-- Past Events -->
      <div v-if="activeTab === 'past'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="event in filteredPastEvents"
          :key="event.id"
          class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col opacity-90"
        >
          <div class="bg-gradient-to-br from-gray-500 to-gray-600 text-white p-8 text-center">
            <div class="text-5xl font-bold leading-none mb-2">{{ event.day }}</div>
            <div class="text-lg uppercase tracking-wide">{{ event.month }}</div>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ event.title }}</h3>
            <p class="text-gray-600 mb-6 leading-relaxed text-sm flex-1">{{ event.description }}</p>

            <button
              @click="watchRecording(event)"
              class="w-full px-6 py-3 border-2 border-[#1646A2] text-[#1646A2] rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <i class="pi pi-play mr-2"></i>
              Yozuvni ko'rish
            </button>
          </div>
        </div>
      </div>

      <div v-if="noResults" class="text-center py-24">
        <i class="pi pi-calendar text-gray-200 mb-4 block" style="font-size: 4rem;"></i>
        <p class="text-gray-400 text-lg">Tadbirlar topilmadi</p>
      </div>
    </section>

    <!-- Registration Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedEvent"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-md" @click="closeModal"></div>
          
          <div class="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              @click="closeModal"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <i class="pi pi-times text-xl text-gray-600"></i>
            </button>

            <div class="p-10 text-center">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="pi pi-check text-green-600 text-4xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Ro'yxatdan o'tdingiz!</h3>
              <p class="text-gray-600 mb-6">
                <strong>{{ selectedEvent.title }}</strong> tadbiriga muvaffaqiyatli ro'yxatdan o'tdingiz
              </p>
              <div class="bg-gray-100 rounded-lg p-4 mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Sana:</span>
                  <span class="font-medium">{{ selectedEvent.day }} {{ selectedEvent.month }}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Vaqt:</span>
                  <span class="font-medium">{{ selectedEvent.time }}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                  <span>Joy:</span>
                  <span class="font-medium">{{ selectedEvent.location }}</span>
                </div>
              </div>

              <!-- Online Event - Meeting Link -->
              <div v-if="selectedEvent.isOnline && selectedEvent.meetingUrl" class="space-y-3">
                <a
                  :href="selectedEvent.meetingUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full px-6 py-3 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <i class="pi pi-external-link"></i>
                  Uchrashuvga kirish
                </a>
                <button
                  @click="closeModal"
                  class="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Yopish
                </button>
              </div>

              <!-- Offline Event - Map -->
              <div v-else-if="!selectedEvent.isOnline && selectedEvent.mapUrl" class="space-y-3">
                <div class="w-full h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <iframe
                    :src="`https://maps.google.com/maps?q=${encodeURIComponent(selectedEvent.location || '')}&output=embed`"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <a
                  :href="selectedEvent.mapUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full px-6 py-3 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium inline-flex items-center justify-center gap-2"
                >
                  <i class="pi pi-map-marker"></i>
                  Google Maps'da ochish
                </a>
                <button
                  @click="closeModal"
                  class="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Yopish
                </button>
              </div>

              <!-- Fallback -->
              <button
                v-else
                @click="closeModal"
                class="w-full px-6 py-3 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Event {
  id: number
  title: string
  description: string
  day: string
  month: string
  time?: string
  location?: string
  participants?: number
  tags?: string[]
  isOnline?: boolean
  meetingUrl?: string
  mapUrl?: string
}

const searchQuery = ref('')
const activeTab = ref('upcoming')
const selectedEvent = ref<Event | null>(null)

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Koreya universitetlariga qabul bo\'yicha bepul seminar',
    description: 'Qabul jarayoni, talab qilinadigan hujjatlar va grantlar haqida batafsil ma\'lumot',
    day: '15',
    month: 'Noyabr',
    time: '18:00',
    location: 'Online (Zoom)',
    participants: 45,
    tags: ['Bepul', 'Online', 'O\'zbekcha'],
    isOnline: true,
    meetingUrl: 'https://zoom.us/j/123456789'
  },
  {
    id: 2,
    title: 'TOPIK imtihoniga tayyorgarlik master-class',
    description: 'TOPIK 3-4 darajalariga tayyorgarlik strategiyasi va mashqlar',
    day: '22',
    month: 'Noyabr',
    time: '19:00',
    location: 'Toshkent, ofis',
    participants: 30,
    tags: ['TOPIK', 'Offline', 'Master-class'],
    isOnline: false,
    mapUrl: 'https://maps.google.com/?q=41.2995,69.2401'
  },
  {
    id: 3,
    title: 'Grant olish sirlari: muvaffaqiyatli talabalar tajribasi',
    description: 'To\'liq grant olgan talabalar o\'z tajribalarini bo\'lishadi',
    day: '28',
    month: 'Noyabr',
    time: '18:30',
    location: 'Online (YouTube Live)',
    participants: 120,
    tags: ['Grant', 'Online', 'Live'],
    isOnline: true,
    meetingUrl: 'https://youtube.com/live/example'
  },
  {
    id: 4,
    title: 'Hujjatlar tayyorlash bo\'yicha konsultatsiya',
    description: 'Ariza, motivatsiya xati va boshqa hujjatlarni to\'g\'ri tayyorlash',
    day: '5',
    month: 'Dekabr',
    time: '17:00',
    location: 'Online (Telegram)',
    participants: 60,
    tags: ['Konsultatsiya', 'Hujjatlar', 'Bepul'],
    isOnline: true,
    meetingUrl: 'https://t.me/example'
  }
]

const pastEvents: Event[] = [
  {
    id: 5,
    title: 'Koreya ta\'lim tizimi va universitetlar',
    description: 'Koreya ta\'lim tizimining xususiyatlari va TOP universitetlar',
    day: '10',
    month: 'Oktyabr'
  },
  {
    id: 6,
    title: 'Koreyada talabalar hayoti',
    description: 'Koreyada yashash, ishlash va o\'qish haqida',
    day: '25',
    month: 'Sentyabr'
  },
  {
    id: 7,
    title: 'KGSP granti: ariza topshirish jarayoni',
    description: 'Korean Government Scholarship haqida batafsil',
    day: '15',
    month: 'Sentyabr'
  }
]

const filteredUpcomingEvents = computed(() => {
  if (!searchQuery.value) return upcomingEvents
  
  const query = searchQuery.value.toLowerCase()
  return upcomingEvents.filter(e =>
    e.title.toLowerCase().includes(query) ||
    e.description.toLowerCase().includes(query) ||
    (e.location && e.location.toLowerCase().includes(query)) ||
    (e.tags && e.tags.some(tag => tag.toLowerCase().includes(query)))
  )
})

const filteredPastEvents = computed(() => {
  if (!searchQuery.value) return pastEvents
  
  const query = searchQuery.value.toLowerCase()
  return pastEvents.filter(e =>
    e.title.toLowerCase().includes(query) ||
    e.description.toLowerCase().includes(query)
  )
})

const noResults = computed(() => {
  return (activeTab.value === 'upcoming' && filteredUpcomingEvents.value.length === 0) ||
         (activeTab.value === 'past' && filteredPastEvents.value.length === 0)
})

const registerEvent = (event: Event) => {
  selectedEvent.value = event
  document.body.style.overflow = 'hidden'
}

const watchRecording = (event: Event) => {
  console.log('Watching recording:', event.title)
  // In real app, navigate to recording page or open video modal
}

const closeModal = () => {
  selectedEvent.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
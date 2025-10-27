<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section
      class="relative text-white py-24"
      style="background-image: url('/images/unis3.jpg'); background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-400 opacity-80"></div>
      <div class="container mx-auto px-6 relative z-10">
        <h1 class="text-5xl font-bold mb-3">Resurslar kutubxonasi</h1>
        <p class="text-blue-100 text-lg">Foydali qo'llanmalar, namunalar va materiallar</p>
      </div>
    </section>

    <!-- Search Section -->
    <section class="container mx-auto px-6 -mt-12 relative z-20">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="relative">
          <i class="pi pi-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Resurslarni qidirish..."
            class="w-full pl-14 pr-5 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base"
          />
        </div>
      </div>
    </section>

    <!-- Resources Grid -->
    <section class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="resource in filteredResources"
          :key="resource.id"
          class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-12 text-center relative">
            <div class="absolute inset-0 bg-white/5"></div>
            <div class="relative">
              <i :class="resource.icon" class="text-white text-6xl"></i>
            </div>
          </div>
          
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ resource.title }}</h3>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="px-3 py-1 bg-blue-50 text-[#1646A2] rounded-md text-xs font-medium">
                {{ resource.language }}
              </span>
              <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                {{ resource.type }}
              </span>
            </div>

            <p class="text-gray-600 mb-6 leading-relaxed text-sm flex-1">{{ resource.description }}</p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <div class="flex items-center gap-2">
                <i class="pi pi-download text-[#1646A2]"></i>
                <span>{{ resource.downloads }}</span>
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-file text-[#1646A2]"></i>
                <span>{{ resource.size }}</span>
              </div>
            </div>

            <button
              @click="downloadResource(resource)"
              class="w-full px-6 py-3 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium"
            >
              <i class="pi pi-download mr-2"></i>
              Yuklab olish
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredResources.length === 0" class="text-center py-24">
        <i class="pi pi-inbox text-gray-200 mb-4 block" style="font-size: 4rem;"></i>
        <p class="text-gray-400 text-lg">Resurslar topilmadi</p>
      </div>
    </section>


    <!-- Download Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedResource"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-md" @click="closeModal"></div>
          
          <div class="relative bg-white rounded-2xl max-w-md w-full shadow-2xl">
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
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Yuklab olinmoqda</h3>
              <p class="text-gray-600 mb-6">
                <strong>{{ selectedResource.title }}</strong> yuklab olinmoqda...
              </p>
              <div class="bg-gray-100 rounded-lg p-4 mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Fayl hajmi:</span>
                  <span class="font-medium">{{ selectedResource.size }}</span>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                  <span>Format:</span>
                  <span class="font-medium">{{ selectedResource.type }}</span>
                </div>
              </div>
              <button
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

interface Resource {
  id: number
  title: string
  description: string
  type: string
  language: string
  icon: string
  downloads: string
  size: string
}

const searchQuery = ref('')
const selectedResource = ref<Resource | null>(null)

const resources: Resource[] = [
  {
    id: 1,
    title: 'Universitet tanlash bo\'yicha qo\'llanma',
    description: 'Koreya universitetlarini tanlash, solishtirishva ariza topshirish bo\'yicha batafsil qo\'llanma',
    type: 'PDF',
    language: 'O\'zbekcha',
    icon: 'pi pi-book',
    downloads: '1,245',
    size: '2.5 MB'
  },
  {
    id: 2,
    title: 'Motivatsiya xati namunasi',
    description: 'Grant uchun muvaffaqiyatli motivatsiya xati yozish namunalari',
    type: 'DOCX',
    language: 'O\'zbekcha/Ingliz',
    icon: 'pi pi-file-edit',
    downloads: '2,150',
    size: '450 KB'
  },
  {
    id: 3,
    title: 'Hujjatlar ro\'yxati shablon',
    description: 'Universitet arizasi uchun kerakli hujjatlar ro\'yxati va checklist',
    type: 'PDF',
    language: 'O\'zbekcha',
    icon: 'pi pi-list',
    downloads: '1,890',
    size: '1.2 MB'
  },
  {
    id: 4,
    title: 'TOPIK 3-4 so\'z bazasi',
    description: 'TOPIK 3 va 4 darajalariga tayyorgarlik uchun so\'zlar bazasi',
    type: 'XLSX',
    language: 'O\'zbekcha/Koreys',
    icon: 'pi pi-table',
    downloads: '3,420',
    size: '850 KB'
  },
  {
    id: 6,
    title: 'Tavsiya xati namunalari',
    description: 'Professor va ish beruvchilardan tavsiya xati namunalari',
    type: 'DOCX',
    language: 'Ingliz',
    icon: 'pi pi-envelope',
    downloads: '980',
    size: '320 KB'
  }
]

const filteredResources = computed(() => {
  if (!searchQuery.value) return resources
  
  const query = searchQuery.value.toLowerCase()
  return resources.filter(r =>
    r.title.toLowerCase().includes(query) ||
    r.description.toLowerCase().includes(query) ||
    r.type.toLowerCase().includes(query) ||
    r.language.toLowerCase().includes(query)
  )
})

const downloadResource = (resource: Resource) => {
  selectedResource.value = resource
  document.body.style.overflow = 'hidden'
  
  // Simulate download
  setTimeout(() => {
    // In real app, trigger actual download here
    console.log('Downloading:', resource.title)
  }, 500)
}

const closeModal = () => {
  selectedResource.value = null
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
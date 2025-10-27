<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section
      class="relative text-white py-24"
      style="background-image: url('/images/unis5.jpg'); background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-400 opacity-80"></div>
      <div class="container mx-auto px-6 relative z-10">
        <h1 class="text-5xl font-bold mb-3">Bizning talabalarimiz</h1>
        <p class="text-blue-100 text-lg">Muvaffaqiyat tarixi</p>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="container mx-auto px-6 -mt-12 relative z-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="stat in studentStats"
          :key="stat.label"
          class="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
        >
          <i :class="stat.icon" class="text-5xl text-[#1646A2] mb-4"></i>
          <h3 class="text-4xl text-[#1646A2] font-bold mb-2">{{ stat.value }}</h3>
          <p class="text-gray-600 text-sm">{{ stat.label }}</p>
        </div>
      </div>
    </section>

    <!-- Success Stories -->
    <section class="container mx-auto px-6 py-20">
      <h2 class="text-4xl font-bold text-center mb-16">Muvaffaqiyat tarixi</h2>
      
      <div class="max-w-4xl mx-auto">
        <div class="relative">
          <!-- Timeline Line -->
          <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1646A2] to-blue-200"></div>
          
          <!-- Stories -->
          <div
            v-for="(story, index) in successStories"
            :key="story.name"
            class="relative mb-12 last:mb-0"
          >
            <!-- Timeline Marker -->
            <div
              class="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl z-10"
              :style="{ backgroundColor: story.color }"
            >
              <i :class="story.icon"></i>
            </div>

            <!-- Content Card -->
            <div class="ml-20 bg-white border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-shadow">
              <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900">{{ story.name }}</h3>
                  <p class="text-[#1646A2] font-medium">{{ story.university }}</p>
                  <p class="text-gray-500 text-sm">{{ story.year }}</p>
                </div>
              </div>

              <p class="text-gray-600 leading-relaxed mb-4">{{ story.story }}</p>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="achievement in story.achievements"
                  :key="achievement"
                  class="px-3 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium"
                >
                  {{ achievement }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Student Map -->
    <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center mb-16">Talabalarimiz xaritada</h2>
        
        <div class="max-w-3xl mx-auto">
          <div class="bg-white rounded-xl shadow-lg p-16 text-center border border-gray-100">
            <div class="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="pi pi-map text-5xl text-[#1646A2]"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">15+ shahar</h3>
            <p class="text-gray-600 leading-relaxed">
              Seoul, Busan, Daejeon, Incheon va boshqa shaharlarda bizning talabalarimiz o'qishmoqda
            </p>
            
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              <div
                v-for="city in cities"
                :key="city"
                class="bg-blue-50 rounded-lg p-4 text-center"
              >
                <i class="pi pi-map-marker text-[#1646A2] mb-2 text-xl"></i>
                <p class="text-sm font-medium text-gray-700">{{ city }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="container mx-auto px-6 py-20">
      <h2 class="text-4xl font-bold text-center mb-16">Fotogalereya</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="photo in photoGallery"
          :key="photo.id"
          class="group cursor-pointer"
          @click="openGallery(photo)"
        >
          <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <i class="pi pi-image text-white text-6xl opacity-50 group-hover:opacity-70 transition-opacity"></i>
          </div>
          <p class="text-sm text-gray-600 mt-3 text-center">{{ photo.caption }}</p>
        </div>
      </div>
    </section>

    <!-- Gallery Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedPhoto"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeGallery"
        >
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeGallery"></div>
          
          <div class="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden">
            <button
              @click="closeGallery"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full transition-colors z-10 shadow-lg"
            >
              <i class="pi pi-times text-xl text-gray-600"></i>
            </button>

            <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] aspect-video flex items-center justify-center">
              <i class="pi pi-image text-white text-8xl opacity-50"></i>
            </div>

            <div class="p-8">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ selectedPhoto.caption }}</h3>
              <p class="text-gray-600">{{ selectedPhoto.description }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface SuccessStory {
  name: string
  university: string
  year: string
  story: string
  achievements: string[]
  icon: string
  color: string
}

interface Photo {
  id: number
  caption: string
  description: string
}

const selectedPhoto = ref<Photo | null>(null)

const studentStats = [
  { icon: 'pi pi-users', value: '300+', label: 'Talabalar' },
  { icon: 'pi pi-building', value: '40+', label: 'Universitetlar' },
  { icon: 'pi pi-globe', value: '15+', label: 'Shaharlar' },
  { icon: 'pi pi-star', value: '95%', label: 'Muvaffaqiyat' }
]

const successStories: SuccessStory[] = [
  {
    name: 'Aziza Karimova',
    university: 'Seoul National University',
    year: '2024',
    story: 'TOPIK 5 darajasi bilan Seoul National University kompyuter fanlari bo\'limiga 100% grant bilan qabul qilindim. UniBridge menga har bir qadamda yordam berdi.',
    achievements: ['100% grant', 'TOPIK 5', 'Kompyuter fanlari'],
    icon: 'pi pi-star',
    color: '#1646A2'
  },
  {
    name: 'Bobur Usmanov',
    university: 'KAIST',
    year: '2024',
    story: 'KAIST - bu mening orzuim edi. UniBridge jamoasi menga grant olishda va barcha hujjatlarni tayyorlashda juda katta yordam ko\'rsatdi.',
    achievements: ['To\'liq grant', 'Magistratura', 'AI ixtisosligi'],
    icon: 'pi pi-graduation-cap',
    color: '#1646A2'
  },
  {
    name: 'Nilufar Rahimova',
    university: 'Yonsei University',
    year: '2023',
    story: 'Yonsei University biznes menejmentda o\'qiyapman. UniBridge menga to\'g\'ri yo\'nalish berdi va universitet tanlashda professional maslahat berdi.',
    achievements: ['50% stipendiya', 'Biznes', 'Ingliz dastur'],
    icon: 'pi pi-briefcase',
    color: '#1646A2'
  },
  {
    name: 'Sardor Aliyev',
    university: 'Korea University',
    year: '2023',
    story: 'Korea University yuridik fakultetida o\'qiyapman. Grant olishda va visa jarayonida UniBridge ning yordami bebaho edi.',
    achievements: ['Yuridik fakultet', '70% grant', 'TOPIK 4'],
    icon: 'pi pi-book',
    color: '#1646A2'
  }
]

const cities = [
  'Seoul',
  'Busan',
  'Daejeon',
  'Incheon',
  'Daegu',
  'Gwangju'
]

const photoGallery: Photo[] = [
  {
    id: 1,
    caption: 'Bitirish marosimi',
    description: 'Seoul National University bitirish marosimida talabalarimiz'
  },
  {
    id: 2,
    caption: 'Kampus hayoti',
    description: 'KAIST kampusida kundalik hayot'
  },
  {
    id: 3,
    caption: 'Talabalar guruhi',
    description: 'Yonsei University talabalar guruhi'
  },
  {
    id: 4,
    caption: 'Kutubxonada o\'qish',
    description: 'Universitet kutubxonasida o\'qish jarayoni'
  },
  {
    id: 5,
    caption: 'Koreys bayramida',
    description: 'Milliy bayramda talabalar'
  },
  {
    id: 6,
    caption: 'Sport tadbirlari',
    description: 'Universitetlararo sport musobaqalari'
  }
]

const openGallery = (photo: Photo) => {
  selectedPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  selectedPhoto.value = null
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
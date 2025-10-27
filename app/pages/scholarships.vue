<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section
      class="relative text-white py-24"
      style="background-image: url('/images/unis2.jpg'); background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-400 opacity-80"></div>
      <div class="container mx-auto px-6 relative z-10">
        <h1 class="text-5xl font-bold mb-3">Grantlar va stipendiyalar</h1>
        <p class="text-blue-100 text-lg">Siz uchun eng yaxshi grant imkoniyatlarini toping</p>
      </div>
    </section>

    <!-- Search Section -->
    <section class="container mx-auto px-6 -mt-12 relative z-20">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <i class="pi pi-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Grantlarni qidirish..."
              class="w-full pl-14 pr-5 bg-white py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base"
            />
          </div>
          <select
            v-model="selectedType"
            class="px-5 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base bg-white md:min-w-[220px]"
          >
            <option value="">Barcha turlar</option>
            <option v-for="type in scholarshipTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Scholarships Grid -->
    <section class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          v-for="scholarship in filteredScholarships"
          :key="scholarship.id"
          class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-12 text-center relative">
            <div class="absolute inset-0 bg-white/5"></div>
            <div class="relative">
              <i :class="scholarship.icon" class="text-white text-6xl"></i>
            </div>
            <span
              v-if="scholarship.deadline"
              class="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-medium"
            >
              {{ scholarship.deadline }}
            </span>
          </div>
          
          <div class="p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ scholarship.name }}</h3>
            <p class="text-[#1646A2] font-medium mb-4">{{ scholarship.provider }}</p>
            <p class="text-gray-600 leading-relaxed mb-6">{{ scholarship.description }}</p>
            
            <div class="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-dollar text-[#1646A2]"></i>
                </div>
                <span class="text-gray-700 text-sm">{{ scholarship.amount }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-users text-[#1646A2]"></i>
                </div>
                <span class="text-gray-700 text-sm">{{ scholarship.eligibility }}</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-calendar text-[#1646A2]"></i>
                </div>
                <span class="text-gray-700 text-sm">Muddati: {{ scholarship.duration }}</span>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Talablar:</h4>
              <ul class="space-y-2">
                <li v-for="req in scholarship.requirements" :key="req" class="flex items-start gap-2 text-gray-600 text-sm">
                  <i class="pi pi-check text-green-600 mt-0.5 flex-shrink-0"></i>
                  <span>{{ req }}</span>
                </li>
              </ul>
            </div>

            <button
              @click="openModal(scholarship)"
              class="mt-6 w-full px-6 py-3 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium"
            >
              Batafsil
              <i class="pi pi-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredScholarships.length === 0" class="text-center py-24">
        <i class="pi pi-search text-gray-200 mb-4 block" style="font-size: 4rem;"></i>
        <p class="text-gray-400 text-lg">Hech qanday natija topilmadi</p>
      </div>
    </section>

    <!-- Tips Section -->
    <section class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold text-center text-gray-900 mb-12">Grant olish bo'yicha maslahatlar</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="tip in tips"
            :key="tip.id"
            class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-8 text-center">
              <i :class="tip.icon" class="text-white text-5xl"></i>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-3">{{ tip.title }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">{{ tip.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedScholarship"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closeModal"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-md" @click="closeModal"></div>
          
          <div class="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              @click="closeModal"
              class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <i class="pi pi-times text-xl text-gray-600"></i>
            </button>

            <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-12 text-white relative">
              <div class="absolute inset-0 bg-white/5"></div>
              <div class="relative">
                <i :class="selectedScholarship.icon" class="text-7xl mb-6"></i>
                <h2 class="text-4xl font-bold mb-3">{{ selectedScholarship.name }}</h2>
                <p class="text-blue-100 text-lg">{{ selectedScholarship.provider }}</p>
              </div>
            </div>

            <div class="p-10">
              <p class="text-gray-600 mb-8 text-base leading-relaxed">{{ selectedScholarship.description }}</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-dollar text-[#1646A2] text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Grant miqdori</h4>
                    <p class="text-gray-600 text-sm">{{ selectedScholarship.amount }}</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-users text-[#1646A2] text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Maqsadli auditoriya</h4>
                    <p class="text-gray-600 text-sm">{{ selectedScholarship.eligibility }}</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-calendar text-[#1646A2] text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Davomiyligi</h4>
                    <p class="text-gray-600 text-sm">{{ selectedScholarship.duration }}</p>
                  </div>
                </div>

                <div v-if="selectedScholarship.deadline" class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-clock text-red-600 text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Ariza topshirish muddati</h4>
                    <p class="text-red-600 text-sm font-medium">{{ selectedScholarship.deadline }}</p>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h4 class="font-semibold text-gray-900 mb-4 text-lg">Asosiy talablar:</h4>
                <ul class="space-y-3">
                  <li v-for="req in selectedScholarship.requirements" :key="req" class="flex items-start gap-3">
                    <div class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i class="pi pi-check text-green-600 text-sm"></i>
                    </div>
                    <span class="text-gray-700">{{ req }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Scholarship {
  id: number
  name: string
  provider: string
  description: string
  amount: string
  eligibility: string
  duration: string
  deadline?: string
  icon: string
  requirements: string[]
}

const searchQuery = ref('')
const selectedType = ref('')
const selectedScholarship = ref<Scholarship | null>(null)

const scholarshipTypes = [
  'To\'liq grant',
  'Qisman grant',
  'Davlat granti',
  'Universitet granti'
]

const scholarships: Scholarship[] = [
  {
    id: 1,
    name: 'Korean Government Scholarship Program (KGSP)',
    provider: 'Koreya hukumati',
    description: 'Koreyada bakalavr, magistratura va doktoranturada o\'qish uchun to\'liq grant dasturi',
    amount: '100% o\'qish to\'lovi + oylik stipendiya',
    eligibility: 'Barcha xorijiy talabalar',
    duration: '4-6 yil',
    deadline: 'Mart 2025',
    icon: 'pi pi-shield',
    requirements: [
      'TOPIK 3+ yoki IELTS 5.5+',
      '3.0+ GPA',
      '40 yoshdan kichik',
      'Sog\'liq sertifikati'
    ]
  },
  {
    id: 2,
    name: 'Seoul National University Scholarship',
    provider: 'Seoul National University',
    description: 'SNU tomonidan eng iqtidorli xalqaro talabalar uchun to\'liq grant',
    amount: '100% o\'qish to\'lovi + yashash xarajatlari',
    eligibility: 'Yuqori ball bilan qabul qilingan talabalar',
    duration: '4 yil',
    deadline: 'Noyabr 2024',
    icon: 'pi pi-star',
    requirements: [
      'TOPIK 5+',
      '3.5+ GPA',
      'Ajoyib akademik natijalar',
      'Tavsiya xatlari'
    ]
  },
  {
    id: 3,
    name: 'KAIST International Student Scholarship',
    provider: 'KAIST',
    description: 'STEM yo\'nalishlarida o\'qish uchun to\'liq grant va tadqiqot imkoniyati',
    amount: '100% o\'qish to\'lovi + tadqiqot stipendiyasi',
    eligibility: 'STEM talabalar',
    duration: '2-4 yil',
    deadline: 'Dekabr 2024',
    icon: 'pi pi-bolt',
    requirements: [
      'IELTS 6.0+ yoki TOEFL 80+',
      'STEM ixtisosligi',
      'Tajriba (magistratura uchun)',
      'Tadqiqot loyihasi'
    ]
  },
  {
    id: 4,
    name: 'Yonsei University Global Leaders Fellowship',
    provider: 'Yonsei University',
    description: 'Etakchi xalqaro talabalar uchun stipendiya dasturi',
    amount: '50-100% o\'qish to\'lovi',
    eligibility: 'Yuqori akademik ko\'rsatgich',
    duration: '4 yil',
    deadline: 'Fevral 2025',
    icon: 'pi pi-users',
    requirements: [
      'TOPIK 4+ yoki IELTS 6.0+',
      '3.3+ GPA',
      'Liderlik tajribasi',
      'Motivatsiya xati'
    ]
  }
]

const tips = [
  {
    id: 1,
    icon: 'pi pi-clock',
    title: 'Erta boshlang',
    description: 'Grant uchun ariza topshirish jarayoni uzoq davom etadi. Kamida 6-8 oy oldin tayyorgarlikni boshlang.'
  },
  {
    id: 2,
    icon: 'pi pi-file-edit',
    title: 'Hujjatlarni to\'liq tayyorlang',
    description: 'Barcha talab qilinadigan hujjatlarni aniq va to\'liq tayyorlang. Tarjima va notarial tasdiqni unutmang.'
  },
  {
    id: 3,
    icon: 'pi pi-chart-line',
    title: 'Akademik natijalaringizni yaxshilang',
    description: 'Yuqori GPA va til sertifikati grant olish imkoniyatingizni sezilarli oshiradi.'
  },
  {
    id: 4,
    icon: 'pi pi-heart',
    title: 'Motivatsiya xatingizga e\'tibor bering',
    description: 'Nima uchun aynan shu grant va universitetni tanlaganingizni aniq va samimiy tushuntiring.'
  }
]

const filteredScholarships = computed(() => {
  return scholarships.filter(s => {
    const matchesSearch = !searchQuery.value ||
      s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesType = !selectedType.value ||
      (selectedType.value === 'To\'liq grant' && s.amount.includes('100%')) ||
      (selectedType.value === 'Qisman grant' && !s.amount.includes('100%')) ||
      (selectedType.value === 'Davlat granti' && s.provider.includes('hukumat')) ||
      (selectedType.value === 'Universitet granti' && s.provider.includes('University'))
    
    return matchesSearch && matchesType
  })
})

const openModal = (scholarship: Scholarship) => {
  selectedScholarship.value = scholarship
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedScholarship.value = null
  document.body.style.overflow = ''
}

const applyScholarship = () => {
  // Handle scholarship application
  alert('Ariza topshirish sahifasiga yo\'naltirilmoqda...')
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
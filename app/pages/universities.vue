<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section with Background Image -->
    <section
      class="relative text-white py-32"
      style="background-image: url('/images/unis.jpg'); background-size: cover; background-position: center;"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-400 opacity-80"></div>
      <div class="container mx-auto px-6 relative z-10">
        <h1 class="text-5xl font-bold mb-3">Koreya universitetlari</h1>
      </div>
    </section>

    <!-- Search Section - Overlapping Hero -->
    <section class="container mx-auto px-6 -mt-20 relative z-20">
      <div class="bg-white rounded-xl shadow-2xl p-8">
        <div class="relative mb-6">
          <i class="pi pi-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Universitetlarni qidirish..."
            class="w-full bg-white pl-14 pr-5 py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base"
          />
        </div>

        <div class="flex flex-wrap gap-4">
          <select
            v-model="selectedCity"
            class="pl-5 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base bg-white"
            aria-label="Shahar"
          >
            <option value="">Barcha shaharlar</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
          
          <select
            v-model="selectedType"
            class="pl-5 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base bg-white"
            aria-label="Turi"
          >
            <option value="">Barcha turlar</option>
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
          </select>
          
          <select
            v-model="selectedRanking"
            class="pl-5 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base bg-white"
            aria-label="Reyting"
          >
            <option value="">Barcha reytinglar</option>
            <option v-for="rank in rankings" :key="rank" :value="rank">{{ rank }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Universities Grid -->
    <section class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="university in filteredUniversities"
          :key="university.id"
          class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          @click="openModal(university)"
        >
          <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-12 text-center relative overflow-hidden">
            <div class="absolute inset-0 bg-white/5"></div>
            <div class="relative">
              <div class="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border border-white/20">
                <span class="text-3xl font-bold text-white">{{ university.shortName }}</span>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1646A2] transition-colors leading-tight">
              {{ university.name }}
            </h3>
            
            <div class="flex items-center text-gray-500 mb-4 text-sm">
              <i class="pi pi-map-marker mr-2 text-[#1646A2]"></i>
              <span>{{ university.city }}</span>
            </div>

            <div class="flex items-center justify-between mb-5">
              <span class="text-[#1646A2] font-semibold text-base">
                {{ university.ranking }}
              </span>
              <span class="text-sm text-gray-600">{{ university.tuition }}</span>
            </div>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="feature in university.features.slice(0, 2)"
                :key="feature"
                class="px-3 py-1 bg-blue-50 text-[#1646A2] rounded-md text-xs font-medium"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredUniversities.length === 0" class="text-center py-24">
        <i class="pi pi-search text-gray-200 mb-4 block" style="font-size: 4rem;"></i>
        <p class="text-gray-400 text-lg">Hech qanday natija topilmadi</p>
      </div>
    </section>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedUniversity"
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

            <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-12 text-white relative overflow-hidden">
              <div class="absolute inset-0 bg-white/5"></div>
              <div class="relative">
                <div class="w-28 h-28 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/20">
                  <span class="text-4xl font-bold">{{ selectedUniversity.shortName }}</span>
                </div>
                <h2 class="text-4xl font-bold mb-3">{{ selectedUniversity.name }}</h2>
                <div class="flex items-center text-blue-100">
                  <i class="pi pi-map-marker mr-2"></i>
                  <span>{{ selectedUniversity.city }}, {{ selectedUniversity.type }}</span>
                </div>
              </div>
            </div>

            <div class="p-10">
              <p class="text-gray-600 mb-8 text-base leading-relaxed">{{ selectedUniversity.description }}</p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-dollar text-[#1646A2] text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">To'lov</h4>
                    <p class="text-gray-600 text-sm">{{ selectedUniversity.tuition }}</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-star text-[#1646A2] text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Reyting</h4>
                    <p class="text-gray-600 text-sm">{{ selectedUniversity.ranking }}</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-book text-[#1646A2] text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Grant</h4>
                    <p class="text-gray-600 text-sm">{{ selectedUniversity.scholarships }}</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i class="pi pi-globe text-[#1646A2] text-xl"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">Til talabi</h4>
                    <p class="text-gray-600 text-sm">{{ selectedUniversity.language }}</p>
                  </div>
                </div>
              </div>

              <div class="mb-8">
                <h4 class="font-semibold text-gray-900 mb-4 text-lg">Dasturlar</h4>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="program in selectedUniversity.programs"
                    :key="program"
                    class="px-4 py-2 bg-blue-50 text-[#1646A2] rounded-lg text-sm font-medium"
                  >
                    {{ program }}
                  </span>
                </div>
              </div>

              <div class="mb-8">
                <h4 class="font-semibold text-gray-900 mb-4 text-lg">Xususiyatlar</h4>
                <div class="flex flex-wrap gap-3">
                  <span
                    v-for="feature in selectedUniversity.features"
                    :key="feature"
                    class="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium"
                  >
                    {{ feature }}
                  </span>
                </div>
              </div>

              <a
                :href="`https://${selectedUniversity.website}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center w-full px-6 py-4 bg-[#1646A2] text-white rounded-xl hover:bg-[#123e91] transition-colors font-semibold"
              >
                Rasmiy saytga o'tish
                <i class="pi pi-external-link ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface University {
  id: number
  name: string
  shortName: string
  city: string
  type: string
  ranking: string
  tuition: string
  features: string[]
  description: string
  programs: string[]
  scholarships: string
  language: string
  website: string
}

const searchQuery = ref('')
const selectedCity = ref('')
const selectedType = ref('')
const selectedRanking = ref('')
const selectedUniversity = ref<University | null>(null)

const cities = ['Seoul', 'Busan', 'Daejeon', 'Incheon', 'Gwangju']
const types = ['Davlat', 'Xususiy']
const rankings = ['Top 50', 'Top 100', 'Top 200']

const universities: University[] = [
  {
    id: 1,
    name: 'Seoul National University',
    shortName: 'SNU',
    city: 'Seoul',
    type: 'Davlat',
    ranking: 'QS #41',
    tuition: '$4,000-6,000/yil',
    features: ['TOPIK 4+', 'Grant bor', 'Ingliz dastur'],
    description: 'Janubiy Koreyaning eng prestijli universiteti. 1946 yilda tashkil etilgan.',
    programs: ['Muhandislik', 'Tibbiyot', 'Biznes', 'Gumanitar fanlar'],
    scholarships: '50-100% grant imkoniyati',
    language: 'Koreys tili (TOPIK 4+) yoki Ingliz tili (IELTS 6.5+)',
    website: 'www.snu.ac.kr'
  },
  {
    id: 2,
    name: 'Korea Advanced Institute of Science and Technology',
    shortName: 'KAIST',
    city: 'Daejeon',
    type: 'Davlat',
    ranking: 'QS #56',
    tuition: 'Bepul (grant)',
    features: ['Ingliz dastur', '100% grant', 'STEM'],
    description: 'Janubiy Koreyaning yetakchi texnologiya universiteti. STEM yo\'nalishlariga ixtisoslashgan.',
    programs: ['Kompyuter fanlari', 'Muhandislik', 'Biotexnologiya', 'Fizika'],
    scholarships: 'Barcha talabalar uchun 100% grant',
    language: 'Ingliz tili (TOEFL 83+ yoki IELTS 6.5+)',
    website: 'www.kaist.ac.kr'
  },
  {
    id: 3,
    name: 'Yonsei University',
    shortName: 'Yonsei',
    city: 'Seoul',
    type: 'Xususiy',
    ranking: 'QS #76',
    tuition: '$8,000-10,000/yil',
    features: ['TOPIK 3+', 'Grant bor', 'Ko\'p dasturlar'],
    description: 'SKY universitetlaridan biri. 1885 yilda tashkil etilgan eng qadimgi universitetlardan.',
    programs: ['Biznes', 'Xalqaro munosabatlar', 'Tibbiyot', 'Muhandislik'],
    scholarships: '30-70% grant imkoniyati',
    language: 'Koreys tili (TOPIK 3+) yoki Ingliz tili (IELTS 6.0+)',
    website: 'www.yonsei.ac.kr'
  },
  {
    id: 4,
    name: 'Korea University',
    shortName: 'KU',
    city: 'Seoul',
    type: 'Xususiy',
    ranking: 'QS #79',
    tuition: '$7,500-9,500/yil',
    features: ['TOPIK 4+', 'Grant bor', 'Ingliz dastur'],
    description: 'SKY universitetlaridan biri. Kuchli akademik dasturlar va xalqaro aloqalar.',
    programs: ['Huquqshunoslik', 'Biznes', 'Media va kommunikatsiya', 'Muhandislik'],
    scholarships: '40-80% grant imkoniyati',
    language: 'Koreys tili (TOPIK 4+) yoki Ingliz tili (IELTS 6.5+)',
    website: 'www.korea.edu'
  },
  {
    id: 5,
    name: 'Sungkyunkwan University',
    shortName: 'SKKU',
    city: 'Seoul',
    type: 'Xususiy',
    ranking: 'QS #145',
    tuition: '$6,000-8,000/yil',
    features: ['TOPIK 3+', 'Grant bor', 'Samsung hamkorlik'],
    description: '600 yillik tarixga ega. Samsung tomonidan qo\'llab-quvvatlanadi.',
    programs: ['Biznes', 'Muhandislik', 'Tabiiy fanlar', 'San\'at'],
    scholarships: '30-60% grant imkoniyati',
    language: 'Koreys tili (TOPIK 3+) yoki Ingliz tili (IELTS 6.0+)',
    website: 'www.skku.edu'
  },
  {
    id: 6,
    name: 'Hanyang University',
    shortName: 'HYU',
    city: 'Seoul',
    type: 'Xususiy',
    ranking: 'QS #164',
    tuition: '$6,500-8,500/yil',
    features: ['TOPIK 3+', 'Texnologiya', 'Ingliz dastur'],
    description: 'Muhandislik va texnologiya yo\'nalishlarida kuchli. Sanoat bilan yaqin aloqalar.',
    programs: ['Muhandislik', 'Arxitektura', 'Biznes', 'Dizayn'],
    scholarships: '30-70% grant imkoniyati',
    language: 'Koreys tili (TOPIK 3+) yoki Ingliz tili (IELTS 6.0+)',
    website: 'www.hanyang.ac.kr'
  },
  {
    id: 7,
    name: 'Kyung Hee University',
    shortName: 'KHU',
    city: 'Seoul',
    type: 'Xususiy',
    ranking: 'QS #270',
    tuition: '$5,000-7,000/yil',
    features: ['TOPIK 3+', 'Tibbiyot kuchli', 'Grant bor'],
    description: 'Tibbiyot va xalqaro tadqiqotlarda etakchi. Go\'zal kampus.',
    programs: ['Tibbiyot', 'Stomatologiya', 'Xalqaro munosabatlar', 'Turizm'],
    scholarships: '20-50% grant imkoniyati',
    language: 'Koreys tili (TOPIK 3+) yoki Ingliz tili (IELTS 5.5+)',
    website: 'www.khu.ac.kr'
  },
  {
    id: 8,
    name: 'Pusan National University',
    shortName: 'PNU',
    city: 'Busan',
    type: 'Davlat',
    ranking: 'QS #481',
    tuition: '$3,500-5,000/yil',
    features: ['TOPIK 3+', 'Grant bor', 'Arzon yashash'],
    description: 'Busandagi eng yaxshi universitet. Seulga qaraganda arzonroq yashash.',
    programs: ['Dengiz muhandisligi', 'Biznes', 'Tabiiy fanlar', 'Gumanitar fanlar'],
    scholarships: '30-70% grant imkoniyati',
    language: 'Koreys tili (TOPIK 3+)',
    website: 'www.pusan.ac.kr'
  }
]

const filteredUniversities = computed(() => {
  return universities.filter(uni => {
    const matchesSearch = !searchQuery.value || 
      uni.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCity = !selectedCity.value || uni.city === selectedCity.value
    const matchesType = !selectedType.value || uni.type === selectedType.value
    
    let matchesRanking = true
    if (selectedRanking.value === 'Top 50') {
      const rank = parseInt(uni.ranking.match(/\d+/)?.[0] || '999')
      matchesRanking = rank <= 50
    } else if (selectedRanking.value === 'Top 100') {
      const rank = parseInt(uni.ranking.match(/\d+/)?.[0] || '999')
      matchesRanking = rank <= 100
    } else if (selectedRanking.value === 'Top 200') {
      const rank = parseInt(uni.ranking.match(/\d+/)?.[0] || '999')
      matchesRanking = rank <= 200
    }
    
    return matchesSearch && matchesCity && matchesType && matchesRanking
  })
})

const openModal = (university: University) => {
  selectedUniversity.value = university
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedUniversity.value = null
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
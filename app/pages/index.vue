<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-400 text-white py-12 lg:py-24">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div class="hero-content text-center lg:text-left">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight px-4 lg:px-0">{{ $t('hero.title') }}</h1>
            <p class="text-lg lg:text-xl mb-6 lg:mb-8 opacity-95 px-4 lg:px-0">{{ $t('hero.subtitle') }}</p>
            <Button
              :label="$t('hero.cta')"
              :icon="'pi pi-arrow-right'"
              size="large"
              class="gap-2 text-white border-0 font-semibold mx-4 lg:mx-0 "
              @click="navigateTo('/contact')"
            />
          </div>
          <div class="hero-image order-first lg:order-last">
            <div 
              ref="heroImageContainer"
              class="bg-white bg-opacity-10 rounded-2xl p-4 lg:p-8 flex items-center justify-center backdrop-blur-sm mx-4 lg:mx-0 overflow-hidden"
            >
              <div class="relative w-full h-64 lg:h-80">
                <div
                  class="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                  :style="{ transform: `translateX(-${currentHeroSlide * 100}%)` }"
                >
                  <div
                    v-for="(image, index) in heroImages"
                    :key="index"
                    class="w-full h-full flex-shrink-0 flex items-center justify-center"
                  >
                    <img
                      :src="`/images/${image}`"
                      :alt="`Hero image ${index + 1}`"
                      class="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="section -mt-8 lg:mt-0 relative z-10">
      <div class="container">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 px-4 lg:px-0">
          <div v-for="stat in stats" :key="stat.id" class="bg-white p-6 lg:p-8 rounded-xl text-center shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <i :class="stat.icon" class="student-stat-icon text-primary-500 mb-3 lg:mb-4"></i>
            <h3 class="text-2xl lg:text-4xl font-bold text-primary-500 mb-1 lg:mb-2">{{ stat.value }}</h3>
            <p class="text-sm lg:text-base text-gray-600">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Students Success Stories Carousel -->
    <section class="section">
      <div class="container">
        <h2 class="text-center text-2xl lg:text-4xl font-bold mb-8 lg:mb-12 text-gray-900">Bizning talabalarimiz</h2>
        <div class="relative max-w-4xl mx-auto">
          <!-- Carousel Container -->
          <div class="overflow-hidden rounded-xl">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div
                v-for="story in studentStories"
                :key="story.name"
                class="w-full flex-shrink-0 bg-white border border-gray-100 rounded-xl p-8"
              >
                <div class="text-center mb-6">
                  <div class="w-20 h-20 bg-gradient-to-br from-[#1646A2] to-[#123e91] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i :class="story.icon" class="text-white text-3xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-1">{{ story.name }}</h3>
                  <p class="text-[#1646A2] font-medium mb-1">{{ story.university }}</p>
                  <p class="text-gray-500 text-sm">{{ story.year }}</p>
                </div>

                <blockquote class="text-gray-600 text-center leading-relaxed mb-6 italic">
                  "{{ story.story }}"
                </blockquote>

                <div class="flex flex-wrap justify-center gap-2">
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

          <!-- Carousel Indicators -->
          <div class="flex justify-center mt-6 space-x-2">
            <button
              v-for="(story, index) in studentStories"
              :key="index"
              @click="goToSlide(index)"
              :class="[
                'w-3 h-3 rounded-full transition-colors duration-300',
                currentSlide === index ? 'bg-[#1646A2]' : 'bg-gray-300'
              ]"
            ></button>
          </div>

          <!-- Navigation Arrows -->
          <button
            @click="prevSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <i class="pi pi-chevron-left text-gray-600"></i>
          </button>
          <button
            @click="nextSlide"
            class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <i class="pi pi-chevron-right text-gray-600"></i>
          </button>
        </div>

        <!-- CTA to Students Page -->
        <div class="text-center mt-8">
          <Button
            label="Barcha muvaffaqiyat tarixi"
            icon="pi pi-arrow-right"
            class="!bg-[#1646A2] !text-white !border-0 !hover:bg-[#123e91] !rounded-xl gap-2 p-2 px-4"
            @click="navigateTo('/students')"
          />
        </div>
      </div>
    </section>

    <!-- Pricing Plans Section -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="text-center text-2xl lg:text-4xl font-bold mb-8 lg:mb-12 text-gray-900">Bizning xizmat paketlarimiz</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div v-for="plan in pricingPlans" :key="plan.id" :class="[
            'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer',
            plan.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
          ]"
          @click="selectPlan(plan)">
            <!-- Popular Badge -->
            <div v-if="plan.popular" class="absolute top-0 left-0 right-0 bg-primary-500 text-white text-center py-2 text-sm font-semibold">
              OMMABOP TANLOV
            </div>
            
            <!-- Header -->
            <div class="text-center p-6 lg:p-8" :class="plan.popular ? 'pt-12' : ''">
              <h3 class="text-xl lg:text-2xl font-bold text-gray-900 mb-4">{{ plan.title }}</h3>
              <div class="mb-4">
                <div class="flex items-baseline justify-center gap-1">
                  <span class="text-3xl lg:text-4xl font-bold text-primary-500">{{ plan.price.toLocaleString() }}</span>
                  <span class="text-sm text-primary-500 font-semibold">SO'M</span>
                </div>
              </div>
              <div v-if="plan.originalPrice && plan.originalPrice !== plan.price" class="mb-4">
                <p class="text-sm text-gray-600 font-semibold mb-1">BOSHLANG'ICH TO'LOV:</p>
                <span class="text-lg text-primary-600 font-bold">{{ plan.originalPrice.toLocaleString() }} SO'M</span>
              </div>
            </div>

            <!-- Features and Notes -->
            <div class="px-6 lg:px-8 pb-6 flex flex-col h-full">
              <div class="space-y-3 mb-6">
                <div v-for="feature in plan.features" :key="feature.text" class="flex items-start gap-3">
                  <div class="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <i class="pi pi-check text-xs text-green-600"></i>
                  </div>
                  <div class="flex-1">
                    <span class="text-sm text-gray-700 leading-relaxed block">{{ feature.text }}</span>
                    <span v-if="feature.price && feature.price !== 'Bepul'" class="text-xs text-primary-500 font-semibold">
                      {{ typeof feature.price === 'number' ? feature.price.toLocaleString() + ' so\'m' : feature.price }}
                    </span>
                    <span v-else-if="feature.price === 'Bepul'" class="text-xs text-green-600 font-semibold">
                      Bepul
                    </span>
                  </div>
                </div>
              </div>

              <!-- Special Notes -->
              <div v-if="plan.notes && plan.notes.length > 0" class="space-y-3 mb-6">
                <!-- Info Notes -->
                <div v-for="note in plan.notes.filter(n => n.type === 'info')" :key="note.text" class="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div class="flex items-start gap-2">
                    <i class="pi pi-info-circle text-blue-500 text-sm mt-0.5"></i>
                    <span class="text-xs text-blue-700">{{ note.text }}</span>
                  </div>
                </div>
                
                <!-- Success Notes -->
                <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div v-for="note in plan.notes.filter(n => n.type === 'success')" :key="note.text" class="flex items-start gap-2 mb-2 last:mb-0">
                    <span class="text-xs text-green-700 font-medium">{{ note.text }}</span>
                  </div>
                </div>
              </div>
              <div class="flex-grow"></div>
              <!-- CTA Button at bottom -->
              <div class="mt-auto">
                <Button 
                  label="Tanladim" 
                  :class="[
                    'w-full font-semibold py-3',
                    plan.popular 
                      ? 'hover:bg-primary-600 hover:text-white !bg-primary-500 !text-white !border-1 rounded-xl !hover:bg-primary-600 !hover:text-white' 
                      : 'bg-white text-primary-500 border border-primary-500 hover:bg-primary-50 hover:text-primary-600'
                  ]"
                  @click="selectPlan(plan)"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Additional Info -->
        <div class="text-center mt-12">
          <p class="text-sm text-gray-600 mb-4">Barcha paketlarda 100% pul qaytarish kafolati</p>
          <div class="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <div class="flex items-center gap-2">
              <i class="pi pi-shield text-primary-500"></i>
              <span>Kafolatlangan xizmat</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="pi pi-headphones text-primary-500"></i>
              <span>24/7 qo'llab-quvvatlash</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="pi pi-star text-primary-500"></i>
              <span>Professional maslahatlar</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- JARAYON Section -->
    <section class="section">
      <div class="container px-4 lg:px-0">
        <h2 class="text-center text-6xl font-extrabold mb-12 text-primary-500 tracking-tight">JARAYON</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group">
            <div class="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-500">
              <i class="pi pi-lock student-stat-icon group-hover:text-white text-primary-500 transition-colors duration-300"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">1. Talabaga Konsultatsiya berish</h3>
            <p class="text-gray-600">Talabani qiziqtirgan barcha savollarga javob beriladi, shartnoma shartlari tanishtiriladi.</p>
          </div>
          <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group">
            <div class="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-500">
              <i class="pi pi-file student-stat-icon group-hover:text-white text-primary-500 transition-colors duration-300"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">2. Shartnoma tuzish</h3>
            <p class="text-gray-600">Talabani xolati o'rganilgach qulay ta'riflardan birida shartnoma tuzib, talabaga mos universitet tanlanadi.</p>
          </div>
          <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group">
            <div class="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-500">
              <i class="pi pi-graduation-cap student-stat-icon group-hover:text-white text-primary-500 transition-colors duration-300"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">3. Universitet</h3>
            <p class="text-gray-600">Talabaning Universitetga o'qishga kirishi, Kontrakt to'lashi, Admission olish jarayoni 100% nazorat qilinadi.</p>
          </div>
          <div class="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group">
            <div class="bg-blue-50 rounded-xl p-4 mb-6 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-500">
              <i class="pi pi-id-card student-stat-icon group-hover:text-white text-primary-500 transition-colors duration-300"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">4. Viza</h3>
            <p class="text-gray-600">Talabaning hujjatlari vizaga tayyorlanadi, topshiriladi. Viza chiqqanidan so'ng unga kvartira, avia bilet, sim karta, bank kartasi olib berishga yordam beriladi.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-400 text-white text-center py-12 lg:py-16">
      <div class="container px-4 lg:px-0">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-2xl lg:text-4xl font-bold text-white mb-3 lg:mb-4">Koreyada ta'lim olish orzusini amalga oshiring!</h2>
          <p class="text-base lg:text-xl mb-6 lg:mb-8 opacity-95">Bugun bepul konsultatsiya oling va muvaffaqiyatga birinchi qadamni qo'ying</p>
          <Button
            label="Bepul konsultatsiya olish"
            icon="pi pi-phone"
            size="large"
            class="text-white !border-2 !border-solid !border-white rounded-2xl gap-2 font-semibold p-2 px-4"
            @click="navigateTo('/contact')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const { navigateTo, t } = useNavigation()

// Hero image carousel state
const currentHeroSlide = ref(0)
const heroImageContainer = ref<HTMLElement>()
let heroCarouselInterval: ReturnType<typeof setInterval> | null = null

// Hero images for carousel
const heroImages = ['main1.jpg', 'main2.png', 'main3.jpg', 'main4.jpg']

// Student carousel state
const currentSlide = ref(0)
let carouselInterval: ReturnType<typeof setInterval> | null = null

const stats = [
  { id: 1, icon: 'pi pi-users', value: '300+', label: 'Talabalar' },
  { id: 2, icon: 'pi pi-building', value: '40+', label: 'Universitetlar' },
  { id: 3, icon: 'pi pi-star', value: '95%', label: 'Muvaffaqiyat' },
  { id: 4, icon: 'pi pi-globe', value: '3+', label: 'Yillik tajriba' }
]

// Student success stories for carousel
const studentStories = [
  {
    name: 'Aziza Karimova',
    university: 'Seoul National University',
    year: '2024',
    story: 'TOPIK 5 darajasi bilan Seoul National University kompyuter fanlari bo\'limiga 100% grant bilan qabul qilindim. Har bir qadamda menga professional yordam berildi.',
    achievements: ['100% grant', 'TOPIK 5', 'Kompyuter fanlari'],
    icon: 'pi pi-star'
  },
  {
    name: 'Bobur Usmanov',
    university: 'KAIST',
    year: '2024',
    story: 'KAIST - bu mening orzuim edi. Menga grant olishda va barcha hujjatlarni tayyorlashda juda katta yordam ko\'rsatildi.',
    achievements: ['To\'liq grant', 'Magistratura', 'AI ixtisosligi'],
    icon: 'pi pi-graduation-cap'
  },
  {
    name: 'Nilufar Rahimova',
    university: 'Yonsei University',
    year: '2023',
    story: 'Yonsei University biznes menejmentda o\'qiyapman. Menga to\'g\'ri yo\'nalish berildi va universitet tanlashda professional maslahat olindim.',
    achievements: ['50% stipendiya', 'Biznes', 'Ingliz dastur'],
    icon: 'pi pi-briefcase'
  },
  {
    name: 'Sardor Aliyev',
    university: 'Korea University',
    year: '2023',
    story: 'Korea University yuridik fakultetida o\'qiyapman. Grant olishda va visa jarayonida yordam bebaho edi.',
    achievements: ['Yuridik fakultet', '70% grant', 'TOPIK 4'],
    icon: 'pi pi-book'
  }
]

// Hero carousel functions
const nextHeroSlide = () => {
  currentHeroSlide.value = (currentHeroSlide.value + 1) % heroImages.length
}

const startHeroCarousel = () => {
  heroCarouselInterval = setInterval(() => {
    nextHeroSlide()
  }, 4000) // 4 seconds
}

const stopHeroCarousel = () => {
  if (heroCarouselInterval) {
    clearInterval(heroCarouselInterval)
    heroCarouselInterval = null
  }
}

// GSAP floating animation
const startFloatingAnimation = () => {
  if (heroImageContainer.value) {
    gsap.to(heroImageContainer.value, {
      y: -15,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })
  }
}

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % studentStories.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? studentStories.length - 1 : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

// Auto-advance carousel
const startCarousel = () => {
  carouselInterval = setInterval(() => {
    nextSlide()
  }, 5000) // 5 seconds
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

// Lifecycle
onMounted(() => {
  startCarousel()
  startHeroCarousel()
  startFloatingAnimation()
})

onUnmounted(() => {
  stopCarousel()
  stopHeroCarousel()
})

const pricingPlans = [
  {
    id: 1,
    title: 'STANDART',
    price: 13000000,
    originalPrice: 6500000,
    popular: false,
    features: [
      { text: 'Mijozning Universitet talab qilgan barcha hujjatlarini tayyorlash (Apostil, Tarjima, Notarius)', price: 1000000, included: true },
      { text: 'Mijozni 3 ta Universitetga onlayn ro\'yxatdan o\'tkazish (Apply)', price: 1300000, included: true },
      { text: '2 ta Universitet uchun Application fee (100 000 KRW gacha)', price: 1000000, included: true },
      { text: 'Universitetga hujjatlarni o\'z vaqtida yetkazib berish xizmati', price: 500000, included: true },
      { text: 'Talabaga Universitet uchun 1 kunlik bank hisobi (Kapital, Milliy bank)', price: 400000, included: true },
      { text: 'Elchixona talab qilgan hujjatlarni tayyorlash xizmati', price: 1500000, included: true },
      { text: 'Ota-ona uchun 1 kunlik bank hisobiga pul qo\'yish (Kapital, Milliy bank)', price: 800000, included: true },
      { text: 'Arzon avia bilet, kvartira topib berish xizmati', included: true },
      { text: 'Koreya orqali Universitetga to\'lov qilib berish xizmati', price: 'Bepul', included: true }
    ],
    notes: [
      { text: 'Viza chiqsa: 6.5 million so\'m to\'lov qilinadi.', type: 'success' },
      { text: 'Viza chiqmasa barcha to\'lov 100% qaytariladi!', type: 'success' }
    ],
    successRate: 'Viza chiqsa: 6.5 million so\'m to\'lov qilinadi.'
  },
  {
    id: 2,
    title: 'PREMIUM',
    price: 32500000,
    originalPrice: 32500000,
    popular: true,
    features: [
      { text: 'STANDART TA\'RIFIDAGI BARCHA XIZMATLAR!', included: true },
      { text: '2 ta Universitet uchun Application fee (150 000 KRW gacha)', price: 1500000, included: true },
      { text: 'Talabaga 1 OYLIK KDB BANK HISOBI QILIB BERILADI', included: true },
      { text: 'Elchixona uchun hujjatlarni tayyorlab berish, elchixona to\'lovini qilib berish', price: 3000000, included: true }
    ],
    notes: [
      { text: 'Ushbu ta\'rif kimlar uchun: Elchixona viza bermasa 1 oylik bankshotga kuyishni xoxlamaganlar uchun!', type: 'info' },
      { text: 'Universitetdan ko\'proq grant olishga ko\'zi yetadiganlar uchun!', type: 'info' },
      { text: 'Viza chiqsa: To\'lov yo\'q.', type: 'success' },
      { text: 'Viza chiqmasa barcha to\'lov 100% qaytariladi!', type: 'success' }
    ],
    successRate: 'Viza chiqsa: To\'lov yo\'q.'
  },
  {
    id: 3,
    title: 'VISA PLUS',
    price: 65000000,
    originalPrice: 65000000,
    popular: false,
    features: [
      { text: 'PREMIUM TA\'RIFIDAGI BARCHA XIZMATLAR!', included: true },
      { text: 'Talabaga 1 OYLIK KDB BANK HISOBI QILIB BERILADI', included: true },
      { text: 'Universitet kontrakti to\'lab beriladi. (Limit: 1800$ - 23 000 000 so\'mgacha)', included: true },
      { text: 'Tashkent-Seoul To\'g\'ridan-to\'g\'ri reysga Aviabilet olib beriladi', included: true },
      { text: 'Talaba Aeroportda kutib olinadi', included: true },
      { text: 'Universitetga yaqin joydan kvartira topib beriladi', included: true }
    ],
    notes: [
      { text: 'Ushbu ta\'rif kimlar uchun: Elchixona viza bermasa, hech qanday harajatga kuymaslikni xoxlovchilar uchun!', type: 'info' },
      { text: 'Viza chiqsa: To\'lov yo\'q.', type: 'success' },
      { text: 'Viza chiqmasa barcha to\'lov 100% qaytariladi!', type: 'success' }
    ],
    successRate: 'Viza chiqsa: To\'lov yo\'q.'
  }
]

const selectPlan = (plan: any) => {
  navigateTo(`/contact?plan=${plan.id}`)
}

const quickLinks = [
  {
    id: 1,
    icon: 'pi pi-star',
    title: 'Bizning talabalarimiz',
    description: 'Muvaffaqiyat tarixi va talabalar sharhlari',
    path: '/students'
  },
  {
    id: 2,
    icon: 'pi pi-question-circle',
    title: 'Ko\'p so\'raladigan savollar',
    description: 'Eng muhim savollarga javoblar',
    path: '/faq'
  },
  {
    id: 3,
    icon: 'pi pi-book',
    title: 'Resurslar kutubxonasi',
    description: 'Foydali qo\'llanmalar va materiallar',
    path: '/resources'
  },
  {
    id: 4,
    icon: 'pi pi-file-edit',
    title: 'Yangiliklar va blog',
    description: 'Eng so\'nggi yangiliklar va maslahatlar',
    path: '/blog'
  }
]
</script>

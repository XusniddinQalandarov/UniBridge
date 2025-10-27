<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-400 text-white py-24">
      <div class="container mx-auto px-6">
        <h1 class="text-5xl font-bold mb-3">Ko'p so'raladigan savollar</h1>
        <p class="text-blue-100 text-lg">Eng muhim savollarga javoblar</p>
      </div>
    </section>

    <!-- Search Section -->
    <section class="container mx-auto px-6 -mt-12">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="relative">
          <i class="pi pi-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Savollarni qidirish..."
            class="w-full pl-14 pr-5 bg-white py-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors text-base"
          />
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="container mx-auto px-6 py-12">
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-6 py-3 rounded-lg font-medium transition-all text-base',
            selectedCategory === category.id
              ? 'bg-[#1646A2] text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-[#1646A2] hover:text-[#1646A2]'
          ]"
        >
          {{ category.name }}
        </button>
      </div>
    </section>

    <!-- FAQ List -->
    <section class="container mx-auto px-6 pb-16">
      <div class="max-w-4xl mx-auto space-y-4">
        <div
          v-for="(faq, index) in filteredFaqs"
          :key="faq.id"
          class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-start gap-4 flex-1">
              <i class="pi pi-question-circle text-[#1646A2] text-xl mt-1 flex-shrink-0"></i>
              <span class="text-lg font-semibold text-gray-900 leading-relaxed">{{ faq.question }}</span>
            </div>
            <i 
              :class="[
                'pi text-gray-400 text-xl transition-transform duration-300 flex-shrink-0 ml-4',
                openFaqs.includes(index) ? 'pi-chevron-up' : 'pi-chevron-down'
              ]"
            ></i>
          </button>
          
          <div 
            :class="[
              'overflow-hidden transition-all duration-500 ease-in-out',
              openFaqs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            ]"
          >
            <div class="px-8 pb-8">
              <div class="pl-9 pt-2 text-gray-600 leading-relaxed text-base border-l-2 border-blue-100 ml-2">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredFaqs.length === 0" class="text-center py-24">
        <i class="pi pi-search text-gray-200 mb-4 block" style="font-size: 4rem;"></i>
        <p class="text-gray-400 text-lg">Hech qanday natija topilmadi</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-4">
      <div class="container mx-auto px-6">
        <div class="max-w-2xl mx-auto bg-white p-12 text-center ">
          <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="pi pi-question-circle text-[#1646A2] text-3xl"></i>
          </div>
          <h3 class="text-3xl font-bold text-gray-900 mb-4">Javob topa olmadingizmi?</h3>
          <p class="text-gray-600 text-lg mb-8">Biz bilan bog'laning, sizga yordam beramiz!</p>
          <button
                    @click="goTo('/contact')"
            class="inline-flex items-center justify-center px-8 py-4 bg-[#1646A2] text-white rounded-xl hover:bg-[#123e91] transition-colors font-semibold text-base"
          >
            <i class="pi pi-phone mr-2"></i>
            Bog'lanish
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Use Nuxt's client-side navigation to avoid full page reloads and reduce
// chances of SSR/client markup mismatches during navigation.
const goTo = (path: string) => {
  // `navigateTo` is provided by Nuxt as a global helper in setup.
  // It performs client-side routing when possible.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  navigateTo(path)
}

const searchQuery = ref('')
const selectedCategory = ref(0)
const openFaqs = ref<number[]>([])

const categories = [
  { id: 0, name: 'Hammasi' },
  { id: 1, name: 'Qabul' },
  { id: 2, name: 'Visa' },
  { id: 3, name: 'Hujjatlar' },
  { id: 4, name: 'Koreyada hayot' }
]

const faqs = [
  {
    id: 1,
    category: 1,
    question: 'Qabul jarayoni qanday kechadi?',
    answer: 'Qabul jarayoni bir necha bosqichdan iborat: universitet tanlash, hujjatlar tayyorlash, online ariza berish, kutish va natijalarni olish. Biz har bir bosqichda sizga yordam beramiz.'
  },
  {
    id: 2,
    category: 1,
    question: 'Qachon ariza topshirish kerak?',
    answer: 'Odatda Koreya universitetlarida ikki mahal qabul bo\'ladi: mart va sentyabr oylari. Ariza topshirish odatda 3-4 oy oldin boshlanadi.'
  },
  {
    id: 3,
    category: 2,
    question: 'Talabalar vizasi olish qiyin emasmi?',
    answer: 'Agar barcha hujjatlar to\'g\'ri tayyorlangan bo\'lsa, talabalar vizasi (D-2) olish odatda muammosiz kechadi. Biz sizga hujjatlar to\'plamini to\'g\'ri tayyorlashda yordam beramiz.'
  },
  {
    id: 4,
    category: 2,
    question: 'Visa uchun qancha vaqt kerak?',
    answer: 'Visa jarayoni odatda 2-4 hafta davom etadi. Lekin ta\'til kunlari va yuqori yuklama davrlarida bu muddat uzayishi mumkin.'
  },
  {
    id: 5,
    category: 3,
    question: 'Qanday hujjatlar kerak?',
    answer: 'Asosiy hujjatlar: pasport, diplom/attestat va tarjimasi, til sertifikati (TOPIK/IELTS), moliyaviy kafolat, sog\'liqni tasdiqlash va boshqalar. To\'liq ro\'yxat universitet talablariga bog\'liq.'
  },
  {
    id: 6,
    category: 3,
    question: 'Hujjatlarni tarjima qildirish kerakmi?',
    answer: 'Ha, barcha hujjatlar koreys yoki ingliz tillariga tarjima qilinishi va notarial tasdiqlangan bo\'lishi kerak.'
  },
  {
    id: 7,
    category: 4,
    question: 'Yashash xarajatlari qancha?',
    answer: 'Soulda oylik yashash xarajatlari taxminan $800-1200 orasida, boshqa shaharlarda esa $600-900. Bu uy-joy, ovqat, transport va boshqa xarajatlarni o\'z ichiga oladi.'
  },
  {
    id: 8,
    category: 4,
    question: 'O\'qish bilan birga ishlash mumkinmi?',
    answer: 'Ha, talabalar haftasiga 20 soatgacha ishlash huquqiga ega. Tatil paytida bu chegara 40 soatgacha oshadi.'
  },
  {
    id: 9,
    category: 1,
    question: 'TOPIK sertifikati majburiyatmi?',
    answer: 'Koreys tilida o\'qish uchun odatda TOPIK 3-4 darajasi talab qilinadi. Ingliz tilida o\'qish uchun IELTS yoki TOEFL kerak bo\'ladi.'
  },
  {
    id: 10,
    category: 4,
    question: 'Talabalar uchun grant bormi?',
    answer: 'Ha, bir qancha grant dasturlari mavjud: KGSP (Korean Government Scholarship Program), universitet grantlari va boshqalar. Biz sizga mos grantni topishda yordam beramiz.'
  }
]

const filteredFaqs = computed(() => {
  let filtered = faqs

  if (selectedCategory.value !== 0) {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq =>
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

const toggleFaq = (index: number) => {
  const faqIndex = openFaqs.value.indexOf(index)
  if (faqIndex > -1) {
    openFaqs.value.splice(faqIndex, 1)
  } else {
    openFaqs.value.push(index)
  }
}
</script>
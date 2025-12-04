<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-400 text-white py-16 text-center">
      <div class="container">
        <h1 class="text-4xl lg:text-5xl font-bold text-white mb-4">Biz haqimizda</h1>
        <p class="text-xl opacity-95">Koreyada ta'lim olish bo'yicha professional yordam</p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div class="space-y-6">
            <p class="text-lg leading-relaxed text-gray-700">
              Biz 2023-yildan beri O'zbekistonlik talabalarning 
              Koreyaning eng yaxshi universitetlarida ta'lim olishlariga yordam beramiz. 
              Bizning maqsadimiz - har bir talabaning orzusini amalga oshirishda 
              professional yordam ko'rsatish.
            </p>
            <p class="text-lg leading-relaxed text-gray-700">
              Biz nafaqat universitet tanlash va hujjat tayyorlashda, balki 
              Koreyada yashash, o'qish va moslashish bo'yicha to'liq qo'llab-quvvatlash 
              xizmatini taqdim etamiz.
            </p>
          </div>
          <div class="flex justify-center">
            <div class="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
              <!-- Image removed -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section section-alt">
      <div class="container">
        <h2 class="text-center text-3xl lg:text-4xl font-bold mb-12 text-gray-900">Bizning qadriyatlarimiz</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <Card v-for="value in values" :key="value.id" class="text-center border-2 border-primary-500 p-2 py-4 rounded-2xl bg-white">
            <template #header>
              <div class="text-primary-500 text-4xl p-8 flex items-center justify-center">
                <i :class="value.icon"></i>
              </div>
            </template>
            <template #title>
              <div class="font-semibold text-lg mb-2">{{ value.title }}</div>
            </template>
            <template #content>
              <p class="text-gray-600">{{ value.description }}</p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section">
      <div class="container">
        <h2 class="text-center text-3xl lg:text-4xl font-bold mb-12 text-gray-900">Bizning jamoa</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <Card v-for="member in team" :key="member.id" class="text-center">
            <template #header>
              <div class="rounded-lg bg-gray-50 p-12 flex items-center justify-center text-5xl text-primary-500">
                <i class="pi pi-user"></i>
              </div>
            </template>
            <template #title>{{ member.name }}</template>
            <template #subtitle>{{ member.position }}</template>
            <template #content>
              <p class="text-gray-600 mt-2">{{ member.bio }}</p>
            </template>
          </Card>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="section bg-gray-50">
      <div class="container">
        <h2 class="text-center text-3xl lg:text-4xl font-bold mb-12 text-gray-900">Hamkorlarimiz</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div v-for="partner in partners" :key="partner.id" class="bg-white p-8 rounded-xl text-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <div class="text-4xl text-primary-500 mb-4">
              <i :class="partner.icon"></i>
            </div>
            <h4 class="text-lg font-semibold text-gray-900">{{ partner.name }}</h4>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const values = [
  {
    id: 1,
    icon: 'pi pi-check-circle',
    title: 'Professional yondashuv',
    description: 'Har bir talaba bilan individual ishlash va professional maslahat berish'
  },
  {
    id: 2,
    icon: 'pi pi-shield',
    title: 'Ishonch va xavfsizlik',
    description: 'To\'liq shaffoflik va hujjatlarning xavfsiz qayta ishlanishi'
  },
  {
    id: 3,
    icon: 'pi pi-heart',
    title: 'G\'amxo\'rlik',
    description: 'Boshidan oxirigacha to\'liq qo\'llab-quvvatlash va yordam'
  },
  {
    id: 4,
    icon: 'pi pi-star',
    title: 'Yuqori sifat',
    description: 'Eng yuqori sifatli xizmat va natijaga yo\'naltirilganlik'
  }
]

const team = [
  {
    id: 1,
    name: 'Dilshod Azimov',
    position: 'Asoschisi va Direktor',
    bio: 'Koreyada 7 yillik tajriba. Seoul National University mezuni.'
  },
  {
    id: 2,
    name: 'Nilufar Karimova',
    position: 'Ta\'lim maslahatchi',
    bio: 'Yonsei University magistratura. 5 yillik maslahat berish tajribasi.'
  },
  {
    id: 3,
    name: 'Akmal Rahimov',
    position: 'Hujjatlar bo\'yicha mutaxassis',
    bio: 'Korea University mezuni. Visa va migratsiya bo\'yicha mutaxassis.'
  },
  {
    id: 4,
    name: 'Madina Yusupova',
    position: 'TOPIK instruktori',
    bio: 'TOPIK 6 darajasi. 3 yillik o\'qitish tajribasi.'
  }
]

const partners = [
  { id: 1, name: 'Seoul National University', icon: 'pi pi-building' },
  { id: 2, name: 'Korea University', icon: 'pi pi-building' },
  { id: 3, name: 'Yonsei University', icon: 'pi pi-building' },
  { id: 4, name: 'KAIST', icon: 'pi pi-building' },
  { id: 5, name: 'Hanyang University', icon: 'pi pi-building' },
  { id: 6, name: 'Sungkyunkwan University', icon: 'pi pi-building' }
]
</script>

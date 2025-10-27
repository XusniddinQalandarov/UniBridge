<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-400 text-white py-24">
      <div class="container mx-auto px-6">
        <h1 class="text-5xl font-bold mb-3">Yangiliklar va blog</h1>
        <p class="text-blue-100 text-lg">Eng so'nggi yangiliklar, maslahatlar va muvaffaqiyat hikoyalari</p>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="container mx-auto px-6 -mt-12">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-6 py-2 rounded-full text-sm font-medium transition-all',
              selectedCategory === category.id
                ? 'bg-[#1646A2] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group"
          @click="openPost(post)"
        >
          <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-12 text-center relative">
            <div class="absolute inset-0 bg-white/5"></div>
            <div class="relative">
              <i :class="post.icon" class="text-white text-6xl"></i>
            </div>
            <span class="absolute top-4 right-4 px-3 py-1 bg-white/90 text-[#1646A2] rounded-md text-xs font-medium">
              {{ post.category }}
            </span>
          </div>

          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1646A2] transition-colors">
              {{ post.title }}
            </h3>

            <div class="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
              <span class="flex items-center gap-2">
                <i class="pi pi-calendar text-[#1646A2]"></i>
                {{ post.date }}
              </span>
              <span class="flex items-center gap-2">
                <i class="pi pi-user text-[#1646A2]"></i>
                {{ post.author }}
              </span>
            </div>

            <p class="text-gray-600 mb-6 leading-relaxed text-sm flex-1">
              {{ post.excerpt }}
            </p>

            <div class="flex items-center justify-between pt-6 border-t border-gray-100">
              <div class="flex gap-4 text-sm text-gray-500">
                <span class="flex items-center gap-2">
                  <i class="pi pi-eye text-[#1646A2]"></i>
                  {{ post.views }}
                </span>
              </div>
              <span class="text-[#1646A2] font-medium text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                O'qish
                <i class="pi pi-arrow-right text-xs"></i>
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-if="filteredPosts.length === 0" class="text-center py-24">
        <i class="pi pi-book text-gray-200 mb-4 block" style="font-size: 4rem;"></i>
        <p class="text-gray-400 text-lg">Maqolalar topilmadi</p>
      </div>
    </section>

    <!-- Post Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="selectedPost"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="closePost"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-md" @click="closePost"></div>
          
          <div class="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              @click="closePost"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-100 rounded-full transition-colors z-10 shadow-lg"
            >
              <i class="pi pi-times text-xl text-gray-600"></i>
            </button>

            <div class="bg-gradient-to-br from-[#1646A2] to-[#123e91] p-16 text-center relative">
              <div class="absolute inset-0 bg-white/5"></div>
              <div class="relative">
                <i :class="selectedPost.icon" class="text-white text-7xl mb-4"></i>
                <span class="inline-block px-4 py-2 bg-white/90 text-[#1646A2] rounded-lg text-sm font-medium">
                  {{ selectedPost.category }}
                </span>
              </div>
            </div>

            <div class="p-10">
              <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ selectedPost.title }}</h2>
              
              <div class="flex flex-wrap gap-6 mb-6 text-sm text-gray-500 pb-6 border-b border-gray-200">
                <span class="flex items-center gap-2">
                  <i class="pi pi-calendar text-[#1646A2]"></i>
                  {{ selectedPost.date }}
                </span>
                <span class="flex items-center gap-2">
                  <i class="pi pi-user text-[#1646A2]"></i>
                  {{ selectedPost.author }}
                </span>
                <span class="flex items-center gap-2">
                  <i class="pi pi-eye text-[#1646A2]"></i>
                  {{ selectedPost.views }} ko'rishlar
                </span>
              </div>

              <div class="prose max-w-none">
                <p class="text-gray-700 leading-relaxed text-lg mb-6">
                  {{ selectedPost.excerpt }}
                </p>
                <p class="text-gray-700 leading-relaxed mb-6">
                  Bu yerda maqolaning to'liq matni joylashadi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p class="text-gray-700 leading-relaxed mb-6">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <div class="mt-8 pt-8 border-t border-gray-200">
                <button
                  @click="closePost"
                  class="w-full px-6 py-3 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium"
                >
                  Yopish
                </button>
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

interface Post {
  id: number
  category: string
  categoryId: number
  title: string
  excerpt: string
  date: string
  author: string
  views: string
  comments: string
  icon: string
}

const searchQuery = ref('')
const selectedCategory = ref(0)
const selectedPost = ref<Post | null>(null)

const categories = [
  { id: 0, name: 'Hammasi' },
  { id: 1, name: 'Yangiliklar' },
  { id: 2, name: 'Maslahatlar' },
  { id: 3, name: 'Muvaffaqiyat tarixi' },
  { id: 4, name: 'Hayot Koreyada' }
]

const posts: Post[] = [
  {
    id: 1,
    category: 'Yangiliklar',
    categoryId: 1,
    title: '2025-yil uchun yangi grant dasturlari e\'lon qilindi',
    excerpt: 'Koreya hukumati 2025-yil uchun xalqaro talabalar uchun yangi grant dasturlarini e\'lon qildi. KGSP dasturi 30% ko\'paytirildi...',
    date: '25 oktyabr 2024',
    author: 'UniBridge Team',
    views: '1,245',
    comments: '23',
    icon: 'pi pi-megaphone'
  },
  {
    id: 2,
    category: 'Maslahatlar',
    categoryId: 2,
    title: 'TOPIK imtihoniga qanday tayyorlanish kerak?',
    excerpt: 'TOPIK imtihonida yuqori ball olish uchun 10 ta eng muhim maslahat. Tajribali mutaxassislar va muvaffaqiyatli talabalardan maslahatlar...',
    date: '20 oktyabr 2024',
    author: 'Madina Yusupova',
    views: '2,890',
    comments: '45',
    icon: 'pi pi-book'
  },
  {
    id: 3,
    category: 'Muvaffaqiyat tarixi',
    categoryId: 3,
    title: 'Aziza\'ning SNU ga kirish tarixi',
    excerpt: 'O\'zbekistonlik talaba Aziza Karimova Seoul National University\'ga 100% grant bilan qabul qilindi. Uning muvaffaqiyat siri...',
    date: '15 oktyabr 2024',
    author: 'Aziza Karimova',
    views: '3,450',
    comments: '67',
    icon: 'pi pi-star'
  },
  {
    id: 4,
    category: 'Hayot Koreyada',
    categoryId: 4,
    title: 'Soulda talaba sifatida yashash: xarajatlar va maslahatlar',
    excerpt: 'Soulda talaba sifatida yashash qanday? Oylik xarajatlar, yashash joylari, part-time ish va boshqa foydali ma\'lumotlar...',
    date: '10 oktyabr 2024',
    author: 'Bobur Usmanov',
    views: '2,120',
    comments: '38',
    icon: 'pi pi-home'
  },
  {
    id: 5,
    category: 'Yangiliklar',
    categoryId: 1,
    title: 'KAIST yangi ixtisoslashuvlarni taqdim etdi',
    excerpt: 'Korea Advanced Institute of Science and Technology 2025-yilda AI va Data Science bo\'yicha yangi magistratura dasturlarini boshlaydi...',
    date: '5 oktyabr 2024',
    author: 'UniBridge Team',
    views: '1,780',
    comments: '29',
    icon: 'pi pi-bolt'
  },
  {
    id: 6,
    category: 'Maslahatlar',
    categoryId: 2,
    title: 'Motivatsiya xati yozish bo\'yicha 7 maslahat',
    excerpt: 'Universitetga ariza topshirishda motivatsiya xati eng muhim hujjatlardan biri. Qanday qilib ajoyib motivatsiya xati yozish mumkin?',
    date: '1 oktyabr 2024',
    author: 'Nilufar Karimova',
    views: '3,120',
    comments: '52',
    icon: 'pi pi-file-edit'
  }
]

const filteredPosts = computed(() => {
  return selectedCategory.value === 0 
    ? posts 
    : posts.filter(p => p.categoryId === selectedCategory.value)
})

const openPost = (post: Post) => {
  selectedPost.value = post
  document.body.style.overflow = 'hidden'
}

const closePost = () => {
  selectedPost.value = null
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
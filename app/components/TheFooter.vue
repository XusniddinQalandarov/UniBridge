<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="bg-[#2A374A] text-white py-8">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div class="space-y-4">
          <h3 class="text-2xl font-bold text-white"></h3>
          <p class="text-gray-300 leading-relaxed">
            Koreyaning TOP universitetlarida ta'lim olishda professional yordam
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-white">{{ $t('nav.forStudents') }}</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/universities" class="text-gray-300 hover:text-primary-400 transition-colors duration-300">{{ $t('nav.universities') }}</NuxtLink></li>
            <li><NuxtLink to="/faq" class="text-gray-300 hover:text-primary-400 transition-colors duration-300">{{ $t('nav.faq') }}</NuxtLink></li>
            <li><NuxtLink to="/scholarships" class="text-gray-300 hover:text-primary-400 transition-colors duration-300">{{ $t('nav.scholarships') }}</NuxtLink></li>
            <li><NuxtLink to="/resources" class="text-gray-300 hover:text-primary-400 transition-colors duration-300">{{ $t('nav.resources') }}</NuxtLink></li>
            <li><NuxtLink to="/events" class="text-gray-300 hover:text-primary-400 transition-colors duration-300">{{ $t('nav.events') }}</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="space-y-6">
          <div>
            <h4 class="text-lg font-semibold text-white mb-3">{{ $t('footer.phone') }}</h4>
            <a href="tel:+998931050011" class="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-300">
              <i class="pi pi-phone"></i>
              <span>+998 93 105-00-11</span>
            </a>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-white mb-3">{{ $t('footer.followUs') }}</h4>
            <div class="flex space-x-4">
              <a href="#" target="_blank" rel="noopener" aria-label="Instagram" 
                 class="w-10 h-10 bg-primary-500 hover:bg-primary-400 rounded-full flex items-center justify-center transition-colors duration-300">
                <i class="pi pi-instagram"></i>
              </a>
              <a href="#" target="_blank" rel="noopener" aria-label="Telegram"
                 class="w-10 h-10 bg-primary-500 hover:bg-primary-400 rounded-full flex items-center justify-center transition-colors duration-300">
                <i class="pi pi-send"></i>
              </a>
              <a href="#" target="_blank" rel="noopener" aria-label="YouTube"
                 class="w-10 h-10 bg-primary-500 hover:bg-primary-400 rounded-full flex items-center justify-center transition-colors duration-300">
                <i class="pi pi-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-4 text-center">
        <p class="text-gray-400">{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

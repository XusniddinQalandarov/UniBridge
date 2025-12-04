<template>
  <header class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <NuxtLink :to="localePath('/')" class="no-underline flex items-center">
          <!-- Logo removed -->
        </NuxtLink>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="lg:hidden flex flex-col justify-around w-8 h-8 p-1 cursor-pointer relative"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <span 
          :class="[
            'w-full h-0.5 bg-primary-500 transition-all duration-300 origin-center',
            isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
          ]"
        ></span>
        <span 
          :class="[
            'w-full h-0.5 bg-primary-500 transition-all duration-300',
            isMobileMenuOpen ? 'opacity-0' : ''
          ]"
        ></span>
        <span 
          :class="[
            'w-full h-0.5 bg-primary-500 transition-all duration-300 origin-center',
            isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
          ]"
        ></span>
      </button>

      <!-- Navigation -->
      <nav 
        :class="[
          'lg:flex items-center gap-8 fixed lg:static top-20 lg:top-auto left-0 lg:left-auto right-0 lg:right-auto bottom-0 lg:bottom-auto bg-white lg:bg-transparent flex-col lg:flex-row p-8 lg:p-0 transform transition-transform duration-300 overflow-y-auto lg:overflow-visible z-40',
          isMobileMenuOpen ? 'flex translate-x-0' : 'hidden lg:flex -translate-x-full lg:translate-x-0'
        ]"
      >
        <ul class="flex list-none m-0 p-0 items-center flex-col lg:flex-row gap-0 lg:gap-8 w-full lg:w-auto mb-8 lg:mb-0">
          <!-- About -->
          <li class="relative w-full lg:w-auto border-b border-gray-100 lg:border-none">
            <NuxtLink
              :to="localePath('/about')"
              :class="[
                'block py-4 lg:py-2 font-montserrat transition-colors duration-300 text-lg lg:text-base w-full',
                $route.path === localePath('/about') ? 'text-[#1646A2] font-semibold' : 'text-gray-900 hover:text-[#1646A2]'
              ]"
              @click="closeMobileMenu"
            >
              {{ $t('nav.about') }}
            </NuxtLink>
          </li>

          <!-- For Students Dropdown -->
          <li class="relative w-full lg:w-auto border-b border-gray-100 lg:border-none group" @mouseenter="handleDropdownEnter" @mouseleave="handleDropdownLeave">
            <button 
              class="flex items-center justify-between py-4 lg:py-2 font-montserrat text-gray-900 hover:text-primary-500 transition-colors duration-300 text-lg lg:text-base w-full bg-none border-none cursor-pointer"
              @click="toggleDropdown"
              :aria-expanded="showDropdown"
              type="button"
            >
              {{ $t('nav.forStudents') }}
              <Icon name="chevron-down" class="w-3 h-3 transition-transform duration-300" :class="{ 'rotate-180': showDropdown }" />
            </button>
            <div 
              v-show="showDropdown" 
              class="lg:absolute lg:top-full lg:left-0 lg:rounded-lg lg:shadow-xl p-2 min-w-56 z-50 mt-2 bg-gray-50 lg:bg-white rounded-md" 
              @click="closeMobileMenu"
            >
              <NuxtLink :to="localePath('/universities')" class="block py-3 px-4 text-gray-900 hover:bg-gray-50 hover:text-primary-500 transition-all duration-300 font-montserrat text-sm rounded-md">
                {{ $t('nav.universities') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/scholarships')" class="block py-3 px-4 text-gray-900 hover:bg-gray-50 hover:text-primary-500 transition-all duration-300 font-montserrat text-sm rounded-md">
                {{ $t('nav.scholarships') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/resources')" class="block py-3 px-4 text-gray-900 hover:bg-gray-50 hover:text-primary-500 transition-all duration-300 font-montserrat text-sm rounded-md">
                {{ $t('nav.resources') }}
              </NuxtLink>
              <NuxtLink :to="localePath('/events')" class="block py-3 px-4 text-gray-900 hover:bg-gray-50 hover:text-primary-500 transition-all duration-300 font-montserrat text-sm rounded-md">
                {{ $t('nav.events') }}
              </NuxtLink>
            </div>
          </li>

          <!-- Our Students -->
          <li class="w-full lg:w-auto border-b border-gray-100 lg:border-none">
            <NuxtLink
              :to="localePath('/students')"
              :class="[
                'block py-4 lg:py-2 font-montserrat transition-colors duration-300 text-lg lg:text-base w-full',
                $route.path === localePath('/students') ? 'text-[#1646A2] font-semibold' : 'text-gray-900 hover:text-[#1646A2]'
              ]"
              @click="closeMobileMenu"
            >
              {{ $t('nav.ourStudents') }}
            </NuxtLink>
          </li>


          <!-- News & Blog -->
          <li class="w-full lg:w-auto border-b border-gray-100 lg:border-none">
            <NuxtLink
              :to="localePath('/blog')"
              :class="[
                'block py-4 lg:py-2 font-montserrat transition-colors duration-300 text-lg lg:text-base w-full',
                $route.path === localePath('/blog') ? 'text-[#1646A2] font-semibold' : 'text-gray-900 hover:text-[#1646A2]'
              ]"
              @click="closeMobileMenu"
            >
              {{ $t('nav.blog') }}
            </NuxtLink>
          </li>

          <!-- FAQ -->
          <li class="w-full lg:w-auto border-b border-gray-100 lg:border-none">
            <NuxtLink
              :to="localePath('/faq')"
              :class="[
                'block py-4 lg:py-2 font-montserrat transition-colors duration-300 text-lg lg:text-base w-full',
                $route.path === localePath('/faq') ? 'text-[#1646A2] font-semibold' : 'text-gray-900 hover:text-[#1646A2]'
              ]"
              @click="closeMobileMenu"
            >
              {{ $t('nav.faq') }}
            </NuxtLink>
          </li>

          <!-- Contact -->
          <li class="w-full lg:w-auto">
            <NuxtLink
              :to="localePath('/contact')"
              :class="[
                'block py-4 lg:py-2 font-montserrat transition-colors duration-300 text-lg lg:text-base w-full',
                $route.path === localePath('/contact') ? 'text-[#1646A2] font-semibold' : 'text-gray-900 hover:text-[#1646A2]'
              ]"
              @click="closeMobileMenu"
            >
              {{ $t('nav.contact') }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Language Switcher -->
        <div class="flex items-center w-full lg:w-auto relative">
          <!-- Custom Language Dropdown -->
          <div class="relative w-full lg:w-auto language-dropdown">
            <button
              @click="toggleLanguageDropdown"
              :aria-expanded="showLanguageDropdown"
              class="w-full lg:w-auto p-3 lg:p-2 border border-gray-200 rounded-md bg-white text-gray-900 font-montserrat text-base lg:text-sm cursor-pointer hover:border-primary-500 focus:border-primary-500 focus:outline-none transition-colors duration-300 flex items-center justify-between"
              type="button"
            >
              <span>{{ getCurrentLanguageName() }}</span>
              <Icon name="chevron-down" class="w-3 h-3 transition-transform duration-300" :class="{ 'rotate-180': showLanguageDropdown }" />
            </button>
            
            <!-- Language Options -->
            <div
              v-if="showLanguageDropdown"
              class="absolute top-full left-0 right-0 lg:-ml-12 lg:right-auto lg:w-48 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden"
              @click="closeLanguageDropdown"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="selectLanguage(lang.code)"
                :class="[
                  'w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors font-montserrat text-sm border-b border-gray-100 last:border-b-0',
                  selectedLocale === lang.code ? 'bg-blue-50 text-[#1646A2]' : 'text-gray-700'
                ]"
                type="button"
              >
                {{ lang.name }}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Composables
const { locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

// Reactive state
const isMobileMenuOpen = ref(false);
const showDropdown = ref(false);
const showLanguageDropdown = ref(false);
const selectedLocale = ref(locale.value);
let dropdownTimeout: ReturnType<typeof setTimeout> | null = null;

// Language options
const languages = [
  { code: 'uz', name: "O'zbekcha" },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' }
];

// Methods
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = "";
  showDropdown.value = false;
  showLanguageDropdown.value = false;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const handleDropdownEnter = () => {
  if (dropdownTimeout) {
    clearTimeout(dropdownTimeout);
    dropdownTimeout = null;
  }
  showDropdown.value = true;
};

const handleDropdownLeave = () => {
  dropdownTimeout = setTimeout(() => {
    showDropdown.value = false;
  }, 100);
};

const switchLanguage = () => {
  navigateTo(switchLocalePath(selectedLocale.value));
};

// Language dropdown methods
const toggleLanguageDropdown = () => {
  showLanguageDropdown.value = !showLanguageDropdown.value;
};

const closeLanguageDropdown = () => {
  showLanguageDropdown.value = false;
};

const selectLanguage = (langCode: string) => {
  const validLangCode = langCode as 'uz' | 'ru' | 'en';
  selectedLocale.value = validLangCode;
  showLanguageDropdown.value = false;
  navigateTo(switchLocalePath(validLangCode));
};

const getCurrentLanguageName = () => {
  const currentLang = languages.find(lang => lang.code === selectedLocale.value);
  return currentLang ? currentLang.name : "O'zbekcha";
};

// Close mobile menu on route change
watch(
  () => useRoute().fullPath,
  () => {
    closeMobileMenu();
  }
);

// Watch for locale changes and update selectedLocale
watch(
  () => locale.value,
  (newLocale) => {
    selectedLocale.value = newLocale;
  }
);

// Close mobile menu on window resize
onMounted(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  };

  const handleClickOutside = (event: Event) => {
    const target = event.target as Element;
    if (!target.closest('.language-dropdown') && showLanguageDropdown.value) {
      showLanguageDropdown.value = false;
    }
  };

  window.addEventListener("resize", handleResize);
  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("click", handleClickOutside);
    document.body.style.overflow = "";
  });
});
</script>

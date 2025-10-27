<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-primary-500 to-primary-400 text-white py-24">
      <div class="container mx-auto px-6">
        <h1 class="text-5xl font-bold mb-3">Biz bilan bog'laning</h1>
        <p class="text-blue-100 text-lg">Savollaringiz bormi? Biz yordam berishga tayyormiz!</p>
      </div>
    </section>

    <!-- Main Content -->
    <section class="container mx-auto px-6 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div class="bg-white border border-gray-100 rounded-xl p-8 shadow-lg">
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Xabar yuboring</h2>
            <form @submit.prevent="submitForm" class="flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <label for="name" class="font-semibold text-gray-700">Ismingiz *</label>
                <input
                  id="name"
                  v-model="formData.name"
                  required
                  minlength="2"
                  placeholder="Ismingizni kiriting"
                  :class="[
                    'w-full px-4 py-3 bg-white border rounded-lg focus:outline-none transition-colors',
                    errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1646A2]'
                  ]"
                  @blur="validateName"
                  @input="errors.name = ''"
                />
                <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
              </div>

              <div class="flex flex-col gap-2">
                <label for="phone" class="font-semibold text-gray-700">Telefon raqami *</label>
                <div class="relative flex">
                  <div class="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg">
                    <span class="text-gray-700 font-medium">+998</span>
                  </div>
                  <input
                    id="phone"
                    v-model="phoneInput"
                    required
                    placeholder="90 123 45 67"
                    type="tel"
                    pattern="[0-9\s\-\(\)]+"
                    maxlength="11"
                    :class="[
                      'flex-1 px-4 py-3 bg-white border rounded-r-lg focus:outline-none transition-colors',
                      errors.phone ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1646A2]'
                    ]"
                    @blur="validatePhone"
                    @input="formatPhoneInput"
                  />
                </div>
                <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</span>
              </div>

              <div class="flex flex-col gap-2">
                <label for="email" class="font-semibold text-gray-700">Email</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  placeholder="email@example.com"
                  :class="[
                    'w-full px-4 py-3 bg-white border rounded-lg focus:outline-none transition-colors',
                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1646A2]'
                  ]"
                  @blur="validateEmail"
                  @input="errors.email = ''"
                />
                <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
              </div>

              <div class="flex flex-col gap-2">
                <label for="subject" class="font-semibold text-gray-700">Mavzu</label>
                <select
                  id="subject"
                  v-model="formData.subject"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#1646A2] transition-colors"
                >
                  <option value="" disabled>Mavzuni tanlang</option>
                  <option v-for="subject in subjects" :key="subject" :value="subject">
                    {{ subject }}
                  </option>
                </select>
              </div>

              <div class="flex flex-col gap-2">
                <label for="message" class="font-semibold text-gray-700">Xabar *</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  required
                  minlength="10"
                  rows="5"
                  placeholder="Xabaringizni yozing..."
                  :class="[
                    'w-full px-4 py-3 bg-white border rounded-lg focus:outline-none transition-colors resize-none',
                    errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#1646A2]'
                  ]"
                  @blur="validateMessage"
                  @input="errors.message = ''"
                ></textarea>
                <span v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</span>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-6 py-4 bg-[#1646A2] text-white rounded-lg hover:bg-[#123e91] transition-colors font-medium text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i v-if="!isSubmitting" class="pi pi-send"></i>
                <i v-else class="pi pi-spinner pi-spin"></i>
                {{ isSubmitting ? 'Yuborilmoqda...' : 'Yuborish' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-6">
          <!-- Contact Details Card -->
          <div class="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h2 class="text-2xl font-bold mb-8 text-gray-900">Aloqa ma'lumotlari</h2>
            
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-phone text-xl text-[#1646A2]"></i>
                </div>
                <div>
                  <h4 class="font-semibold mb-1 text-gray-800">Telefon</h4>
                  <a href="tel:+998931050011" class="text-[#1646A2] hover:underline">+998 93 105-00-11</a>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-envelope text-xl text-[#1646A2]"></i>
                </div>
                <div>
                  <h4 class="font-semibold mb-1 text-gray-800">Email</h4>
                  <a href="mailto:info@unibridge.uz" class="text-[#1646A2] hover:underline">info@unibridge.uz</a>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-map-marker text-xl text-[#1646A2]"></i>
                </div>
                <div>
                  <h4 class="font-semibold mb-1 text-gray-800">Manzil</h4>
                  <p class="text-gray-600 mb-2">Toshkent shahri, Amir Temur shox ko'chasi</p>
                  <a
                    href="https://maps.google.com/?q=41.311081,69.240562"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-[#1646A2] hover:underline text-sm flex items-center gap-1"
                  >
                    <i class="pi pi-external-link text-xs"></i>
                    Xaritada ko'rish
                  </a>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-clock text-xl text-[#1646A2]"></i>
                </div>
                <div>
                  <h4 class="font-semibold mb-1 text-gray-800">Ish vaqti</h4>
                  <p class="text-gray-600 text-sm mb-1">Dushanba - Juma: 9:00 - 18:00</p>
                  <p class="text-gray-600 text-sm">Shanba: 10:00 - 14:00</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media Card -->
          <div class="bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 class="text-xl font-bold mb-6 text-gray-900">Ijtimoiy tarmoqlar</h3>
            <div class="flex flex-col gap-3">
              <a
                href="https://instagram.com/unibridge.uz"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-all group"
              >
                <i class="pi pi-instagram text-xl text-gray-600 group-hover:text-pink-500"></i>
                <span class="font-medium text-gray-700 group-hover:text-pink-500">Instagram</span>
              </a>
              <a
                href="https://t.me/unibridge_uz"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
              >
                <i class="pi pi-send text-xl text-gray-600 group-hover:text-blue-500"></i>
                <span class="font-medium text-gray-700 group-hover:text-blue-500">Telegram</span>
              </a>
              <a
                href="https://youtube.com/@unibridge"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all group"
              >
                <i class="pi pi-youtube text-xl text-gray-600 group-hover:text-red-500"></i>
                <span class="font-medium text-gray-700 group-hover:text-red-500">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showSuccess"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click.self="showSuccess = false"
        >
          <div class="absolute inset-0 bg-black/50 backdrop-blur-md" @click="showSuccess = false"></div>
          
          <div class="relative bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <button
              @click="showSuccess = false"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <i class="pi pi-times text-xl text-gray-600"></i>
            </button>

            <div class="p-10 text-center">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i class="pi pi-check text-green-600 text-4xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">Xabar yuborildi!</h3>
              <p class="text-gray-600 mb-6">
                Xabaringiz muvaffaqiyatli yuborildi. Tez orada siz bilan bog'lanamiz.
              </p>
              <button
                @click="showSuccess = false"
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
import { ref } from 'vue'

const formData = ref({
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: ''
})

const errors = ref({
  name: '',
  phone: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)
const phoneInput = ref('')

const subjects = [
  'Universitet tanlash',
  'Hujjat tayyorlash',
  'Visa masalalari',
  'Grant va stipendiya',
  'Boshqa'
]

const validateName = () => {
  if (!formData.value.name) {
    errors.value.name = 'Ism kiritish majburiy'
    return false
  }
  if (formData.value.name.length < 2) {
    errors.value.name = 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'
    return false
  }
  errors.value.name = ''
  return true
}

const validatePhone = () => {
  const fullPhone = '+998' + phoneInput.value.replace(/\s/g, '')
  formData.value.phone = fullPhone
  
  if (!phoneInput.value) {
    errors.value.phone = 'Telefon raqami kiritish majburiy'
    return false
  }
  const phoneRegex = /^[0-9\s]{9,11}$/
  if (!phoneRegex.test(phoneInput.value)) {
    errors.value.phone = 'Telefon raqami noto\'g\'ri formatda'
    return false
  }
  errors.value.phone = ''
  return true
}

const formatPhoneInput = () => {
  errors.value.phone = ''
  // Remove any non-digit characters
  let value = phoneInput.value.replace(/\D/g, '')
  
  // Limit to 9 digits (after +998)
  if (value.length > 9) {
    value = value.slice(0, 9)
  }
  
  // Format as XX XXX XX XX
  if (value.length >= 2) {
    value = value.slice(0, 2) + ' ' + value.slice(2)
  }
  if (value.length >= 6) {
    value = value.slice(0, 6) + ' ' + value.slice(6)
  }
  if (value.length >= 9) {
    value = value.slice(0, 9) + ' ' + value.slice(9)
  }
  
  phoneInput.value = value
}

const validateEmail = () => {
  if (formData.value.email && formData.value.email.length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.value.email)) {
      errors.value.email = 'Email manzil noto\'g\'ri formatda'
      return false
    }
  }
  errors.value.email = ''
  return true
}

const validateMessage = () => {
  if (!formData.value.message) {
    errors.value.message = 'Xabar kiritish majburiy'
    return false
  }
  if (formData.value.message.length < 10) {
    errors.value.message = 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak'
    return false
  }
  errors.value.message = ''
  return true
}

const submitForm = async () => {
  // Validate all fields
  const isNameValid = validateName()
  const isPhoneValid = validatePhone()
  const isEmailValid = validateEmail()
  const isMessageValid = validateMessage()

  if (!isNameValid || !isPhoneValid || !isEmailValid || !isMessageValid) {
    return
  }

  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Show success modal
  showSuccess.value = true
  document.body.style.overflow = 'hidden'
  
  // Reset form
  formData.value = {
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  }
  
  phoneInput.value = ''
  
  // Reset errors
  errors.value = {
    name: '',
    phone: '',
    email: '',
    message: ''
  }
  
  isSubmitting.value = false
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
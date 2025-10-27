export default defineNuxtPlugin(() => {
  // This plugin only runs on client-side due to .client.ts suffix
  // Ensure PrimeIcons CSS is loaded
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdn.jsdelivr.net/npm/primeicons@7.0.0/primeicons.css'
  link.crossOrigin = 'anonymous'
  document.head.appendChild(link)
  
  // Add CSS to ensure proper icon sizing and button styling
  const style = document.createElement('style')
  style.textContent = `
    /* Ensure PrimeIcons load correctly */
    .pi {
      font-family: 'primeicons' !important;
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      line-height: 1 !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
      display: inline-block !important;
    }
    
    /* PrimeVue Button fixes */
    .p-button {
      font-family: inherit !important;
      font-weight: 500 !important;
      line-height: 1.5 !important;
      border-radius: 0.375rem !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    .p-button .p-button-icon {
      font-size: 1rem !important;
      width: auto !important;
      height: auto !important;
    }
    
    .p-button:not(.p-button-text):not(.p-button-outlined) {
      background-color: rgb(22, 70, 162) !important;
      border-color: rgb(22, 70, 162) !important;
      color: white !important;
    }
    
    .p-button:not(.p-button-text):not(.p-button-outlined):hover {
      background-color: rgb(18, 62, 145) !important;
      border-color: rgb(18, 62, 145) !important;
    }
    
    /* Icon size utilities */
    .pi.text-xs { font-size: 0.75rem !important; }
    .pi.text-sm { font-size: 0.875rem !important; }
    .pi.text-base { font-size: 1rem !important; }
    .pi.text-lg { font-size: 1.125rem !important; }
    .pi.text-xl { font-size: 1.25rem !important; }
    .pi.text-2xl { font-size: 1.5rem !important; }
    .pi.text-3xl { font-size: 1.875rem !important; }
    .pi.text-4xl { font-size: 2.25rem !important; }
  `
  document.head.appendChild(style)
})
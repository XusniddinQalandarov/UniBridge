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
    
    /* PrimeVue Button fixes - simplified since LiveChat uses scoped styles */
    .p-button,
    .p-button:not(.p-button-text):not(.p-button-outlined),
    button.p-component.p-button,
    .p-component.p-button {
      background-color: rgb(22, 70, 162) !important;
      border-color: rgb(22, 70, 162) !important;
      color: white !important;
      border-width: 1px !important;
      border-style: solid !important;
      padding: 0.75rem 1.5rem !important;
      font-weight: 600 !important;
      border-radius: 0.5rem !important;
      transition: all 0.3s ease !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      font-family: inherit !important;
      line-height: 1.5 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 0.5rem !important;
    }
    
    .p-button:hover,
    .p-button:not(.p-button-text):not(.p-button-outlined):hover,
    button.p-component.p-button:hover,
    .p-component.p-button:hover {
      background-color: rgb(18, 62, 145) !important;
      border-color: rgb(18, 62, 145) !important;
      color: white !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1) !important;
    }

    .p-button:focus,
    button.p-component.p-button:focus {
      box-shadow: 0 0 0 3px rgba(22, 70, 162, 0.2) !important;
      outline: none !important;
    }
    
    .p-button .p-button-icon {
      font-size: 1rem !important;
      width: auto !important;
      height: auto !important;
    }
    
    /* Enhanced icon size utilities */
    .pi.text-xs { font-size: 0.75rem !important; }
    .pi.text-sm { font-size: 0.875rem !important; }
    .pi.text-base { font-size: 1rem !important; }
    .pi.text-lg { font-size: 1.125rem !important; }
    .pi.text-xl { font-size: 1.25rem !important; }
    .pi.text-2xl { font-size: 1.5rem !important; }
    .pi.text-3xl { font-size: 1.875rem !important; }
    .pi.text-4xl { font-size: 2.5rem !important; }
    .pi.text-5xl { font-size: 3rem !important; }
    .pi.text-6xl { font-size: 3.75rem !important; }
    
    /* Force proper sizing for icons */
    .text-4xl .pi,
    .text-5xl .pi,
    .text-6xl .pi {
      font-size: inherit !important;
    }
    
    /* Stats section icons - make them larger */
    .stats-icon,
    i.text-4xl,
    i.text-5xl {
      font-size: 3rem !important;
      width: auto !important;
      height: auto !important;
    }
    
    /* Card component fixes */
    .p-card {
      border-radius: 0.75rem !important;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
      background: white !important;
      border: 1px solid rgba(229, 231, 235, 1) !important;
      overflow: hidden !important;
    }
    
    .p-card .p-card-header {
      background: transparent !important;
      border-bottom: none !important;
      padding: 1.5rem !important;
      padding-bottom: 0 !important;
    }
    
    .p-card .p-card-body {
      padding: 1.5rem !important;
    }
    
    .p-card .p-card-content {
      padding: 0 !important;
    }
    
    .p-card .p-card-footer {
      background: transparent !important;
      border-top: none !important;
      padding: 1.5rem !important;
      padding-top: 0 !important;
    }
  `
  document.head.appendChild(style)
})
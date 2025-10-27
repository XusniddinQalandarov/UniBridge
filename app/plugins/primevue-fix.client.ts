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
    
    /* Custom icon classes for consistent sizing */
    .student-stat-icon {
      font-size: 3rem !important;
      width: 3rem !important;
      height: 3rem !important;
      line-height: 1 !important;
    }
    
    .student-timeline-icon {
      font-size: 1.5rem !important;
      width: 1.5rem !important;
      height: 1.5rem !important;
      line-height: 1 !important;
    }
    
    /* Ensure icons inherit proper sizes */
    .text-4xl .pi,
    .text-5xl .pi,
    .text-6xl .pi {
      font-size: inherit !important;
    }
    
    /* PrimeVue Card styling fixes */
    .p-card {
      border-radius: 0.75rem !important;
      border: 1px solid #e5e7eb !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
    }

    .p-card .p-card-body {
      border-radius: 0.75rem !important;
    }

    .p-card .p-card-content {
      border-radius: 0.75rem !important;
    }
  `
  document.head.appendChild(style)
  
  // Apply fixes to any existing buttons after a short delay - exclude LiveChat buttons
  setTimeout(() => {
    const buttons = document.querySelectorAll('.p-button:not(.fixed):not([class*="w-12"]):not([class*="w-8"]):not([class*="w-10"]):not([class*="rounded-full"]):not([class*="bg-transparent"]), button.p-component:not(.fixed):not([class*="w-12"]):not([class*="w-8"]):not([class*="w-10"]):not([class*="rounded-full"]):not([class*="bg-transparent"])')
    buttons.forEach((button: Element) => {
      const btn = button as HTMLElement
      btn.style.setProperty('background-color', 'rgb(22, 70, 162)', 'important')
      btn.style.setProperty('border-color', 'rgb(22, 70, 162)', 'important')
      btn.style.setProperty('color', 'white', 'important')
      btn.style.setProperty('border-width', '1px', 'important')
      btn.style.setProperty('border-style', 'solid', 'important')
      btn.style.setProperty('padding', '0.75rem 1.5rem', 'important')
      btn.style.setProperty('font-weight', '600', 'important')
      btn.style.setProperty('border-radius', '0.5rem', 'important')
      btn.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 'important')
      btn.style.setProperty('display', 'inline-flex', 'important')
      btn.style.setProperty('align-items', 'center', 'important')
      btn.style.setProperty('justify-content', 'center', 'important')
      btn.style.setProperty('gap', '0.5rem', 'important')
    })
    
    // Apply Card styling fixes
    const cards = document.querySelectorAll('.p-card')
    cards.forEach((card: Element) => {
      const cardEl = card as HTMLElement
      cardEl.style.setProperty('border-radius', '0.75rem', 'important')
      cardEl.style.setProperty('border', '1px solid #e5e7eb', 'important')
      cardEl.style.setProperty('box-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 'important')
      
      // Also apply to card body and content
      const cardBody = cardEl.querySelector('.p-card-body') as HTMLElement
      const cardContent = cardEl.querySelector('.p-card-content') as HTMLElement
      
      if (cardBody) {
        cardBody.style.setProperty('border-radius', '0.75rem', 'important')
      }
      if (cardContent) {
        cardContent.style.setProperty('border-radius', '0.75rem', 'important')
      }
    })
  }, 100)
})
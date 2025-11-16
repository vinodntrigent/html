// Application State
const AppState = {
  showAdmin: false,
  messages: [
    { role: 'assistant', text: 'Hello! What are you looking for today?' }
  ],
  products: [
    { id: '20456', title: 'COMPREHENSIVE GLOVE PROGRAM', description: 'Disposable, Work, and Industrial Gloves', image: 'images/glovesprogram_catalogimage.png', quantity: 1, price: 100.00 },
    { id: '2551', title: 'FLEET TREAT™', description: 'Ultra-Concentrated, Multi-Functional Diesel Fuel Additive', image: 'images/fleettreat_catalog_image.png', quantity: 1, price: 536.20 },
    { id: '20064', title: 'TITAN TACK™', description: 'Heavy-Duty, Moly-Fortified Aluminum Complex Grease', image: 'images/titantack2_catalog_image.png', quantity: 1, price: 520.00 },
    { id: '20165', title: 'TITAN SEIZE NOT™ PASTE', description: 'Copper and Graphite Fortified, High-Performance Anti-Seize', image: 'images/titanseizenotpaste_catalog_image.png', quantity: 1, price: 110.00 },
    { id: '2478', title: 'NUTCRACKER PLUS™ AEROSOL', description: 'High-Performance Penetrating Lubricant', image: 'images/nutcrackerplusaerosol_catalog_image.png', quantity: 1, price: 200.00 },
    { id: '2541', title: 'BRUTE™', description: 'Hyper-Concentrated Truck, Trailer, and Car Wash', image: 'images/brute_catalog_image.png', quantity: 1, price: 400.00 },
    { id: '5737', title: 'BOA WRAP', description: 'Cable, Wire, and Hose Abrasion Protection Wrap', image: 'images/boawrap__catalog_.png', quantity: 1, price: 90.00 },
    { id: '2484', title: 'PYTHON FUSION TAPE', description: 'Cable, Hose, and Wire Repair Tape', image: 'images/python__catalog_.png', quantity: 1, price: 50.00 },
  ],
  cart: {},
  showRecs: false,
  showCart: false,
  showGloveProgram: false,
  selectedOptions: {},
  isThinking: false,
  isMobile: false,
  showOffcanvas: false,
  activeIds: new Set()
}

const promptHints = [
  'i have an appt with a commercial plumbing and underground utility company. they do all the underground piping for subdivisions, distribution centers (amazon), and hospitals. my appt is not until the last week in october but i want to be prepared. they also do all of their equipment maintenance on site.. which i know what to show when it comes to that. i just need help with the commercial plumbing and underground utility work. can someone help me out on what products to talk about',
  'Add glove program catalog',
  'Show products for Double Duty Towels',
  'i am working on a lead from sealed air - i was told that some other reps currently sell to them. he is asking about our foaming acid cleaner - can i get some locations, any issues or concerns you have run into (for small talk) - and products you sell to them please',
  'Lighting options for job sites at night'
]

const options = [
  '1/325 GL (2505LB)',
  '1/54 GL (METAL DRUM)',
  '1/5 GL (38 LBS NET)',
  '4/1 GL',
  'SAMPLE GL',
  'SAMPLE PT'
]

// Utility Functions
function getPriceForOption(productId, option, basePrice) {
  if (option === '1/325 GL (2505LB)') {
    return basePrice * 325 * 0.75
  } else if (option === '1/54 GL (METAL DRUM)') {
    return basePrice * 54 * 0.85
  } else if (option === '1/5 GL (38 LBS NET)') {
    return basePrice * 5 * 0.9
  } else if (option === '4/1 GL') {
    return basePrice * 4 * 0.95
  } else if (option === 'SAMPLE GL') {
    return basePrice
  } else if (option === 'SAMPLE PT') {
    return basePrice * 0.125
  }
  return basePrice
}

function getCartCount() {
  return Object.values(AppState.cart).reduce((a, b) => a + b, 0)
}

function getVisibleProducts() {
  return AppState.products.filter(p => {
    if (p.title === 'COMPREHENSIVE GLOVE PROGRAM') {
      return AppState.showGloveProgram
    }
    return true
  })
}

// DOM Helper Functions
function createElement(tag, className, content) {
  const el = document.createElement(tag)
  if (className) el.className = className
  if (typeof content === 'string') {
    el.textContent = content
  }
  return el
}

// Render Functions
function renderMessages() {
  const messagesContainer = document.getElementById('messages')
  messagesContainer.innerHTML = ''
  
  AppState.messages.forEach((msg) => {
    const isUser = msg.role === 'user'
    const msgDiv = createElement('div', `msg ${isUser ? 'user' : ''}`)
    
    if (!isUser) {
      const avatar = createElement('div', 'avatar')
      avatar.innerHTML = '<span class="material-symbols-rounded">auto_awesome</span>'
      msgDiv.appendChild(avatar)
    }
    
    const bubble = createElement('div', 'bubble')
    bubble.textContent = msg.text
    msgDiv.appendChild(bubble)
    
    if (isUser) {
      const avatar = createElement('div', 'avatar')
      avatar.innerHTML = '<span class="material-symbols-rounded">person</span>'
      msgDiv.appendChild(avatar)
    }
    
    messagesContainer.appendChild(msgDiv)
  })
  
  if (AppState.isThinking) {
    const msgDiv = createElement('div', 'msg')
    const avatar = createElement('div', 'avatar')
    avatar.innerHTML = '<span class="material-symbols-rounded">auto_awesome</span>'
    msgDiv.appendChild(avatar)
    
    const bubble = createElement('div', 'bubble thinking')
    for (let i = 0; i < 3; i++) {
      const dot = createElement('span', 'thinking-dot')
      bubble.appendChild(dot)
    }
    msgDiv.appendChild(bubble)
    messagesContainer.appendChild(msgDiv)
  }
  
  // Auto-scroll
  setTimeout(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }, 100)
}

function renderPromptHints() {
  const hintsContainer = document.getElementById('prompt-hints')
  hintsContainer.innerHTML = ''
  
  promptHints.forEach((hint) => {
    const hintBtn = createElement('button', 'hint', hint)
    hintBtn.addEventListener('mousedown', (e) => {
      e.preventDefault()
      const input = document.getElementById('message-input')
      input.value = hint
      hintsContainer.style.display = 'none'
    })
    hintsContainer.appendChild(hintBtn)
  })
}

function renderRecommendations(container) {
  container.innerHTML = ''
  
  const panel = createElement('div', 'panel recs-panel')
  const header = createElement('div', 'recs-header flex items-center justify-between')
  const title = createElement('span', '', 'Recommendations')
  header.appendChild(title)
  
  const headerActions = createElement('div', '', '')
  headerActions.style.cssText = 'display: flex; align-items: center; gap: 8px;'
  
  const cartCount = getCartCount()
  if (cartCount > 0) {
    const cartBtn = createElement('button', 'btn cart', '')
    cartBtn.setAttribute('data-count', cartCount)
    cartBtn.innerHTML = '<span class="material-symbols-rounded">shopping_cart</span>'
    cartBtn.addEventListener('click', () => {
      AppState.showCart = true
      renderApp()
    })
    headerActions.appendChild(cartBtn)
  }
  
  if (container.id === 'offcanvas') {
    const closeBtn = createElement('button', 'btn close-btn', '')
    closeBtn.setAttribute('aria-label', 'Close')
    closeBtn.innerHTML = '<span class="material-symbols-rounded">close</span>'
    closeBtn.addEventListener('click', () => {
      AppState.showOffcanvas = false
      renderApp()
    })
    headerActions.appendChild(closeBtn)
  }
  
  header.appendChild(headerActions)
  
  const recs = createElement('div', 'recs')
  const visibleProducts = getVisibleProducts()
  
  visibleProducts.forEach(item => {
    const rec = createElement('div', 'rec')
    const recRow = createElement('div', 'rec-row')
    
    const thumb = createElement('div', 'thumb')
    const img = document.createElement('img')
    img.src = item.image
    img.alt = item.title
    thumb.appendChild(img)
    
    const meta = createElement('div', 'meta')
    const titleEl = createElement('div', 'title', item.title)
    const desc = createElement('div', 'desc', item.description)
    const selectedOption = AppState.selectedOptions[item.id] || options[0]
    const currentPrice = getPriceForOption(item.id, selectedOption, item.price)
    const price = createElement('div', 'price', '')
    price.innerHTML = `Unit Price: <strong>${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentPrice)}</strong>`
    
    meta.appendChild(titleEl)
    meta.appendChild(desc)
    meta.appendChild(price)
    
    recRow.appendChild(thumb)
    recRow.appendChild(meta)
    
    const ctaRow = createElement('div', 'cta-row')
    
    if (AppState.activeIds.has(item.id)) {
      const stepper = createElement('div', 'stepper')
      const decBtn = createElement('button', '', '')
      decBtn.innerHTML = '<span class="material-symbols-rounded">remove</span>'
      decBtn.addEventListener('click', () => {
        handleDec(item.id)
        renderApp()
      })
      
      const qty = createElement('span', '', String(item.quantity))
      
      const incBtn = createElement('button', '', '')
      incBtn.innerHTML = '<span class="material-symbols-rounded">add</span>'
      incBtn.addEventListener('click', () => {
        handleInc(item.id)
        renderApp()
      })
      
      stepper.appendChild(decBtn)
      stepper.appendChild(qty)
      stepper.appendChild(incBtn)
      ctaRow.appendChild(stepper)
    } else {
      const optionSelect = createElement('div', 'option-select')
      const select = document.createElement('select')
      select.className = 'product-select'
      select.value = selectedOption
      select.addEventListener('change', (e) => {
        AppState.selectedOptions[item.id] = e.target.value
        renderApp()
      })
      options.forEach(opt => {
        const option = document.createElement('option')
        option.value = opt
        option.textContent = opt
        select.appendChild(option)
      })
      optionSelect.appendChild(select)
      
      const addBtn = createElement('button', 'add', '')
      addBtn.innerHTML = '<span class="material-symbols-rounded">add_shopping_cart</span>'
      addBtn.addEventListener('click', () => {
        AppState.activeIds.add(item.id)
        handleAdd(item.id)
        renderApp()
      })
      
      ctaRow.appendChild(optionSelect)
      ctaRow.appendChild(addBtn)
    }
    
    rec.appendChild(recRow)
    rec.appendChild(ctaRow)
    recs.appendChild(rec)
  })
  
  panel.appendChild(header)
  panel.appendChild(recs)
  container.appendChild(panel)
}

function renderCart(container) {
  container.innerHTML = ''
  
  const panel = createElement('div', 'panel recs-panel')
  const header = createElement('div', 'recs-header flex items-center justify-between')
  const backBtn = createElement('button', 'btn', '')
  const backIcon = createElement('span', 'material-symbols-rounded', 'arrow_back')
  backBtn.appendChild(backIcon)
  backBtn.addEventListener('click', () => {
    AppState.showCart = false
    renderApp()
  })
  header.appendChild(backBtn)
  
  const cartTitle = createElement('span', '', 'Cart')
  header.appendChild(cartTitle)
  
  const spacer = createElement('span', '', '')
  header.appendChild(spacer)
  
  const recs = createElement('div', 'recs')
  const cartItems = AppState.products.filter(it => AppState.cart[it.id] > 0)
  
  if (cartItems.length === 0) {
    const empty = createElement('div', 'rec')
    empty.innerHTML = '<div class="desc">Your cart is empty.</div>'
    recs.appendChild(empty)
  } else {
    cartItems.forEach(it => {
      const rec = createElement('div', 'rec')
      const recRow = createElement('div', 'rec-row')
      const thumb = createElement('div', 'thumb')
      const img = document.createElement('img')
      img.src = it.image
      img.alt = it.title
      thumb.appendChild(img)
      
      const meta = createElement('div', 'meta')
      const title = createElement('div', 'title', it.title)
      const desc = createElement('div', 'desc', `Qty: ${AppState.cart[it.id]}`)
      meta.appendChild(title)
      meta.appendChild(desc)
      
      recRow.appendChild(thumb)
      recRow.appendChild(meta)
      rec.appendChild(recRow)
      recs.appendChild(rec)
    })
  }
  
  const footer = createElement('div', 'cart-footer')
  const placeOrder = document.createElement('a')
  placeOrder.className = 'place-order'
  placeOrder.href = 'place-order.html'
  placeOrder.textContent = 'Place Order'
  footer.appendChild(placeOrder)
  
  panel.appendChild(header)
  panel.appendChild(recs)
  panel.appendChild(footer)
  container.appendChild(panel)
}

function renderAdminDashboard() {
  const metricsGrid = document.getElementById('metrics-grid')
  metricsGrid.innerHTML = ''
  
  const metrics = {
    totalQueries: 1247,
    successfulResponses: 1189,
    avgResponseTime: '1.2s',
    activeUsers: 23
  }
  
  const metricCards = [
    { icon: 'query_stats', value: metrics.totalQueries.toLocaleString(), label: 'Total Queries' },
    { icon: 'check_circle', value: metrics.successfulResponses.toLocaleString(), label: 'Successful Responses' },
    { icon: 'speed', value: metrics.avgResponseTime, label: 'Avg Response Time' },
    { icon: 'people', value: metrics.activeUsers, label: 'Active Users' }
  ]
  
  metricCards.forEach(metric => {
    const card = createElement('div', 'metric-card')
    card.innerHTML = `
      <div class="metric-icon"><span class="material-symbols-rounded">${metric.icon}</span></div>
      <div class="metric-value">${metric.value}</div>
      <div class="metric-label">${metric.label}</div>
    `
    metricsGrid.appendChild(card)
  })
}

// Event Handlers
function handleSend(text) {
  AppState.messages.push({ role: 'user', text })
  AppState.isThinking = true
  renderApp()
  
  setTimeout(() => {
    AppState.isThinking = false
    const t = text.toLowerCase()
    let response = ''
    
    if (t.includes('i have an appt with a commercial plumbing and underground utility company. they do all the underground piping for subdivisions, distribution centers (amazon), and hospitals. my appt is not until the last week in october but i want to be prepared. they also do all of their equipment maintenance on site.. which i know what to show when it comes to that. i just need help with the commercial plumbing and underground utility work. can someone help me out on what products to talk about')) {
      response = `If they are installing underground plumbing and utilities,then they are sure to have heavy equipment (i.e. All-In-One Fleet Treat, Titan Tack, Titan Seize Not,
Nutcracker, Brute, Boa Wrap, Python Tape, etc.) and they may need dust suppression and erosion
control (MinCryl X-50) and they will need work gloves (Comprehensive Glove Program) and PPE
(Safetyman). They are sure to have spills (Fuel & Oil Be Gone is great for rainbows on puddles,
Insta-Zorb is great for removing muddy water from holes and Siege is great for hydraulic oil and
fuel spill). After they install pipes, they typically jet them to remove dirt and debris (Muddog or
Devour Ultra). They are working in dirty environments, so they'll need waterless hand cleaners 
(Double Duty Towels, Nutcase). For pipe fittings, they can use Moly DSD Aerosol and Titan 2250.
I'm sure they'd love to have some Aqua Lights and Vision Pro Lights. Everyone loves Index-Tend Pry Bars. Hope that helps!`
    } else if (t.includes('i am working on a lead from sealed air - i was told that some other reps currently sell to them. he is asking about our foaming acid cleaner - can i get some locations, any issues or concerns you have run into (for small talk) - and products you sell to them please')) {
      response = `Collin Brown, Carter Conley might be able to assist on this, but here are some products I know we've sold to Sealed Air (Bristol PA, Lyman SC, Hudson NC,
Lenoir NC, Simpsonville SC, and Iowa Park TX) in the past: Ivory 3333, Citra-Soy, Siege, Stallion
Aerosol, Miracle Tool, Grrreat Grape, Assassin Aerosol, Forever Soft, Gask-It, Seal-It, Foam-Away
Aerosol, and a bunch of Handyman tools." In his answer, he was able to give him what other
locations of "Sealed Air" (a company with multiple locations) have purchased in the past. I would
like our LLM to be able to provide his high level of information based on sales history. I'm about to
import SIC and NAICS codes for many customers in the system. I would like for the LLM to also
have access to this data so that it can recommend products that other companies in similar
industries have purchased.`
    } else if (t.includes('add glove program catalog')) {
      AppState.showGloveProgram = true
      response = 'Added Comprehensive Glove Program catalog to the list'
    } else if (t.includes('show products for double duty towels')) {
      response = '2 products are available - Double Duty Towels, Superco One Step Heavy Duty Towels. Which product would you like to add to list'
    } else {
      response = 'Great! I will help you with appropriate product recommendations'
    }
    
    AppState.messages.push({ role: 'assistant', text: response })
    AppState.showRecs = true
    
    if (window.innerWidth <= 767) {
      AppState.showOffcanvas = true
    }
    
    renderApp()
  }, 800)
}

function handleInc(id) {
  const product = AppState.products.find(p => p.id === id)
  if (product) {
    product.quantity += 1
    if (AppState.cart[id] > 0) {
      AppState.cart[id] = product.quantity
    }
  }
}

function handleDec(id) {
  const product = AppState.products.find(p => p.id === id)
  if (product) {
    product.quantity = Math.max(0, product.quantity - 1)
    if (AppState.cart[id] > 0) {
      if (product.quantity === 0) {
        delete AppState.cart[id]
        AppState.activeIds.delete(id)
      } else {
        AppState.cart[id] = product.quantity
      }
    }
  }
}

function handleAdd(id) {
  const product = AppState.products.find(p => p.id === id)
  if (product) {
    AppState.cart[id] = (AppState.cart[id] || 0) + product.quantity
  }
}

// Main Render Function
function renderApp() {
  const adminDashboard = document.getElementById('admin-dashboard')
  const appContainer = document.getElementById('app-container')
  const mainGrid = document.getElementById('main-grid')
  const asideDesktop = document.getElementById('aside-desktop')
  const offcanvas = document.getElementById('offcanvas')
  const offcanvasOverlay = document.getElementById('offcanvas-overlay')
  const mobileRecBtn = document.getElementById('mobile-rec-btn')
  const mobileCartBadge = document.getElementById('mobile-cart-badge')
  
  // Show/hide admin dashboard
  if (AppState.showAdmin) {
    adminDashboard.style.display = 'block'
    appContainer.style.display = 'none'
    renderAdminDashboard()
    return
  } else {
    adminDashboard.style.display = 'none'
    appContainer.style.display = 'block'
  }
  
  // Update main grid classes
  if (AppState.showRecs && !AppState.isMobile) {
    mainGrid.classList.add('with-aside')
  } else {
    mainGrid.classList.remove('with-aside')
  }
  
  // Render messages
  renderMessages()
  
  // Update mobile rec button visibility
  if (AppState.showRecs) {
    // mobileRecBtn.style.display = 'flex'
     mobileRecBtn.style.display = 'none'
    const cartCount = getCartCount()
    if (cartCount > 0) {
      mobileCartBadge.textContent = cartCount
      mobileCartBadge.style.display = 'flex'
    } else {
      mobileCartBadge.style.display = 'none'
    }
  } else {
    mobileRecBtn.style.display = 'none'
  }
  
  // Desktop aside
  asideDesktop.innerHTML = ''
  if (AppState.showRecs && !AppState.showCart) {
    renderRecommendations(asideDesktop)
  } else if (AppState.showRecs && AppState.showCart) {
    renderCart(asideDesktop)
  }
  
  // Mobile offcanvas
  if (AppState.isMobile && AppState.showRecs) {
    if (AppState.showOffcanvas) {
      offcanvasOverlay.style.display = 'block'
      offcanvas.classList.add('open')
      
      offcanvas.innerHTML = ''
      if (!AppState.showCart) {
        renderRecommendations(offcanvas)
      } else {
        renderCart(offcanvas)
      }
    } else {
      offcanvasOverlay.style.display = 'none'
      offcanvas.classList.remove('open')
    }
  } else {
    offcanvasOverlay.style.display = 'none'
    offcanvas.classList.remove('open')
  }
}

// Initialize
function init() {
  // Detect mobile
  function checkMobile() {
    AppState.isMobile = window.innerWidth <= 767
    renderApp()
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Update activeIds when quantities change
  const next = new Set(AppState.activeIds)
  AppState.products.forEach(it => {
    if (next.has(it.id) && it.quantity === 0) {
      next.delete(it.id)
    }
  })
  AppState.activeIds = next
  
  // Event listeners
  const adminBtn = document.getElementById('admin-btn')
  adminBtn.addEventListener('click', () => {
    AppState.showAdmin = true
    renderApp()
  })
  
  const adminBackBtn = document.getElementById('admin-back-btn')
  adminBackBtn.addEventListener('click', () => {
    AppState.showAdmin = false
    renderApp()
  })
  
  const newChatBtn = document.getElementById('new-chat-btn')
  newChatBtn.addEventListener('click', () => {
    window.location.reload()
  })
  
  const mobileRecBtn = document.getElementById('mobile-rec-btn')
  mobileRecBtn.addEventListener('click', () => {
    AppState.showOffcanvas = true
    renderApp()
  })
  
  const offcanvasOverlay = document.getElementById('offcanvas-overlay')
  offcanvasOverlay.addEventListener('click', () => {
    AppState.showOffcanvas = false
    renderApp()
  })
  
  const messageInput = document.getElementById('message-input')
  const sendBtn = document.getElementById('send-btn')
  const promptHints = document.getElementById('prompt-hints')
  let showHints = false
  
  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      showHints = false
      promptHints.style.display = 'none'
      if (messageInput.value.trim()) {
        handleSend(messageInput.value.trim())
        messageInput.value = ''
      }
    } else if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault()
      showHints = !showHints
      promptHints.style.display = showHints ? 'flex' : 'none'
      if (showHints) {
        renderPromptHints()
      }
    } else if (e.key === 'Escape') {
      showHints = false
      promptHints.style.display = 'none'
    }
  })
  
  messageInput.addEventListener('blur', () => {
    setTimeout(() => {
      showHints = false
      promptHints.style.display = 'none'
    }, 100)
  })
  
  sendBtn.addEventListener('click', () => {
    if (messageInput.value.trim()) {
      handleSend(messageInput.value.trim())
      messageInput.value = ''
    }
  })
  
  // Initial render
  renderApp()
}

// Start app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

import { useState, useEffect } from 'react'

function Header({ cartCount = 0, onAdminClick }) {
  return (
    <div className="app-header">
      <div className="brand">
        {/* <span className="material-symbols-rounded">auto_awesome</span> */}
       <img src='/images/momar-haystack-icon.png' alt='logo' className='logo' />
        <span>AI Product Assistant</span>
      </div>
      <div className="tools">
        <button className="btn" onClick={onAdminClick}>Admin Dashboard</button>
        <button className="btn" onClick={() => window.location.reload()}>New Chat</button>
      </div>
    </div>
  )
}

function ChatThread({ messages, onSend, cartCount, onAdminClick }) {
  const [text, setText] = useState('')
  const [showHints, setShowHints] = useState(false)
  const promptHints = [
    'i have an appt with a commercial plumbing and underground utility company. they do all the underground piping for subdivisions, distribution centers (amazon), and hospitals. my appt is not until the last week in october but i want to be prepared. they also do all of their equipment maintenance on site.. which i know what to show when it comes to that. i just need help with the commercial plumbing and underground utility work. can someone help me out on what products to talk about',
    'Add glove program catalog',
    'Show products for Double Duty Towels',
    'i am working on a lead from sealed air - i was told that some other reps currently sell to them. he is asking about our foaming acid cleaner - can i get some locations, any issues or concerns you have run into (for small talk) - and products you sell to them please',
    'Lighting options for job sites at night'
  ]
  const send = () => { if (text.trim()) { onSend(text.trim()); setText('') } }
  return (
    <div className="panel chat-panel">
      <div className="chat-header"><Header cartCount={cartCount} onAdminClick={onAdminClick} /></div>
      <div className="messages">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user'
          return (
            <div className={`msg ${isUser ? 'user' : ''}`} key={idx}>
              {!isUser && <div className="avatar"><span className="material-symbols-rounded">auto_awesome</span></div>}
              <div className="bubble">{m.text}</div>
              {isUser && <div className="avatar"><span className="material-symbols-rounded">person</span></div>}
            </div>
          )
        })}
      </div>
      <div className="composer">
        {showHints && (
          <div className="prompt-hints" role="listbox">
            {promptHints.map((p, i) => (
              <button key={i} className="hint" onMouseDown={() => { setText(p); setShowHints(false) }}>{p}</button>
            ))}
          </div>
        )}
        <textarea className="input" rows={3} value={text} placeholder="Ask anything ..." onChange={(e) => setText(e.target.value)} onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); setShowHints(false); send() }
          if (e.key === '?' || (e.key === '/' && e.shiftKey)) { e.preventDefault(); setShowHints((v) => !v) }
          if (e.key === 'Escape') { setShowHints(false) }
        }} onBlur={() => setTimeout(() => setShowHints(false), 100)} />
        <button className="icon-btn" aria-label="Voice input"><span className="material-symbols-rounded">mic</span></button>
        <button className="icon-btn primary" aria-label="Send" onClick={send}><span className="material-symbols-rounded">send</span></button>
      </div>
    </div>
  )
}

function Recommendations({ items, onAdd, onInc, onDec, cartCount = 0, onOpenCart }) {
  const [activeIds, setActiveIds] = useState(new Set())

  useEffect(() => {
    const next = new Set(activeIds)
    items.forEach((it) => {
      if (next.has(it.id) && it.quantity === 0) {
        next.delete(it.id)
      }
    })
    if (next.size !== activeIds.size) {
      setActiveIds(next)
    }
  }, [items])

  const activate = (id) => {
    const next = new Set(activeIds)
    next.add(id)
    setActiveIds(next)
  }

  return (
    <div className="panel recs-panel">
      <div className="recs-header flex items-center justify-between">
        <span>Recommendations</span>
        {cartCount > 0 && (
          <button className="btn cart" data-count={cartCount} onClick={onOpenCart}><span className="material-symbols-rounded">shopping_cart</span></button>
        )}
      </div>
      <div className="recs">
        {items.map((it) => (
          <div className="rec" key={it.id}>
            <div className="rec-row">
              <div className="thumb"><img src={it.image} alt={it.title} /></div>
              <div className="meta">
                <div className="title">{it.title}</div>
                <div className="desc">{it.description}</div>
                <div className="price">Unit Price: <strong>${it.price}</strong></div>
              </div>
            </div>
            <div className="cta-row">
              {activeIds.has(it.id) && (
                <div className="stepper">
                  <button onClick={() => onDec(it.id)}><span className="material-symbols-rounded">remove</span></button>
                  <span>{it.quantity}</span>
                  <button onClick={() => onInc(it.id)}><span className="material-symbols-rounded">add</span></button>
                </div>
              )}
              {!activeIds.has(it.id) && (
                <button className="add" onClick={() => { activate(it.id); onAdd(it.id) }}><span className="material-symbols-rounded text-base">add_shopping_cart</span> Add to Cart</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Cart({ items, cart, onBack }) {
  const cartItems = items.filter(it => cart[it.id] > 0)
  return (
    <div className="panel recs-panel">
      <div className="recs-header flex items-center justify-between">
        <button className="btn" onClick={onBack}><span className="material-symbols-rounded">arrow_back</span></button>
        <span>Cart</span>
        <span></span>
      </div>
      <div className="recs">
        {cartItems.length === 0 && (
          <div className="rec">
            <div className="desc">Your cart is empty.</div>
          </div>
        )}
        {cartItems.map(it => (
          <div className="rec" key={it.id}>
            <div className="rec-row">
              <div className="thumb"><img src={it.image} alt={it.title} /></div>
              <div className="meta">
                <div className="title">{it.title}</div>
                <div className="desc">Qty: {cart[it.id]}</div>
                {/* <div className="price">Unit Price: <strong>$200.00</strong></div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <a href="/place-order.html" className="place-order">Place Order</a>
      </div>
    </div>
  )
}

function AdminDashboard({ onBack }) {
  const [metrics, setMetrics] = useState({
    totalQueries: 1247,
    successfulResponses: 1189,
    avgResponseTime: '1.2s',
    activeUsers: 23
  })

  return (
    <div className="container">
      <div className="admin-header">
        <div className="brand">
          <span className="material-symbols-rounded">admin_panel_settings</span>
          <span>Admin Dashboard</span>
        </div>
        <button className="btn btn-back" onClick={onBack}>
          <span className="material-symbols-rounded">arrow_back</span> Back to Assistant
        </button>
      </div>
      
      <div className="admin-grid">
        <div className="admin-section">
          <h2>Basic Monitoring</h2>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon"><span className="material-symbols-rounded">query_stats</span></div>
              <div className="metric-value">{metrics.totalQueries.toLocaleString()}</div>
              <div className="metric-label">Total Queries</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon"><span className="material-symbols-rounded">check_circle</span></div>
              <div className="metric-value">{metrics.successfulResponses.toLocaleString()}</div>
              <div className="metric-label">Successful Responses</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon"><span className="material-symbols-rounded">speed</span></div>
              <div className="metric-value">{metrics.avgResponseTime}</div>
              <div className="metric-label">Avg Response Time</div>
            </div>
            <div className="metric-card">
              <div className="metric-icon"><span className="material-symbols-rounded">people</span></div>
              <div className="metric-value">{metrics.activeUsers}</div>
              <div className="metric-label">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! What are you looking for today?' },
  ])

  const [products, setProducts] = useState([
    { id: '20456', title: 'COMPREHENSIVE GLOVE PROGRAM', description: 'Disposable, Work, and Industrial Gloves', image: '/images/glovesprogram_catalogimage.png', quantity: 1, price:100.00 },
    { id: '2551', title: 'FLEET TREAT™', description: 'Ultra-Concentrated, Multi-Functional Diesel Fuel Additive', image: '/images/fleettreat_catalog_image.png', quantity: 1, price:536.20 },
    { id: '20064', title: 'TITAN TACK™', description: 'Heavy-Duty, Moly-Fortified Aluminum Complex Grease', image: '/images/titantack2_catalog_image.png', quantity: 1, price:520.00 },
    { id: '20165', title: 'TITAN SEIZE NOT™ PASTE', description: 'Copper and Graphite Fortified, High-Performance Anti-Seize', image: '/images/titanseizenotpaste_catalog_image.png', quantity: 1, price:110.00 },
    { id: '2478', title: 'NUTCRACKER PLUS™ AEROSOL', description: 'High-Performance Penetrating Lubricant', image: '/images/nutcrackerplusaerosol_catalog_image.png', quantity: 1, price:200.00 },
    { id: '2541', title: 'BRUTE™', description: 'Hyper-Concentrated Truck, Trailer, and Car Wash', image: '/images/brute_catalog_image.png', quantity: 1, price:400.00 },
    { id: '5737', title: 'BOA WRAP', description: 'Cable, Wire, and Hose Abrasion Protection Wrap', image: '/images/boawrap__catalog_.png', quantity: 1 , price:90.00 },
    { id: '2484', title: 'PYTHON FUSION TAPE', description: 'Cable, Hose, and Wire Repair Tape', image: '/images/python__catalog_.png', quantity: 1, price:50.00 },
  ])

  const [cart, setCart] = useState({})
  const [showRecs, setShowRecs] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showGloveProgram, setShowGloveProgram] = useState(false)

  const handleSend = (text) => {
    setMessages((prev) => {
      const next = [...prev, { role: 'user', text }]
      const t = text.toLowerCase()
      if (t.includes('i have an appt with a commercial plumbing and underground utility company. they do all the underground piping for subdivisions, distribution centers (amazon), and hospitals. my appt is not until the last week in october but i want to be prepared. they also do all of their equipment maintenance on site.. which i know what to show when it comes to that. i just need help with the commercial plumbing and underground utility work. can someone help me out on what products to talk about')) {
        next.push({
          role: 'assistant',
          text: `If they are installing underground plumbing and utilities,then they are sure to have heavy equipment (i.e. All-In-One Fleet Treat, Titan Tack, Titan Seize Not,
Nutcracker, Brute, Boa Wrap, Python Tape, etc.) and they may need dust suppression and erosion
control (MinCryl X-50) and they will need work gloves (Comprehensive Glove Program) and PPE
(Safetyman). They are sure to have spills (Fuel & Oil Be Gone is great for rainbows on puddles,
Insta-Zorb is great for removing muddy water from holes and Siege is great for hydraulic oil and
fuel spill). After they install pipes, they typically jet them to remove dirt and debris (Muddog or
Devour Ultra). They are working in dirty environments, so they'll need waterless hand cleaners 
(Double Duty Towels, Nutcase). For pipe fittings, they can use Moly DSD Aerosol and Titan 2250.
I'm sure they'd love to have some Aqua Lights and Vision Pro Lights. Everyone loves Index-Tend Pry Bars. Hope that helps!`
        })
      } else if (t.includes('i am working on a lead from sealed air - i was told that some other reps currently sell to them. he is asking about our foaming acid cleaner - can i get some locations, any issues or concerns you have run into (for small talk) - and products you sell to them please')) {
        next.push({
          role: 'assistant',
          text: `Collin Brown, Carter Conley might be able to assist on this, but here are some products I know we've sold to Sealed Air (Bristol PA, Lyman SC, Hudson NC,
Lenoir NC, Simpsonville SC, and Iowa Park TX) in the past: Ivory 3333, Citra-Soy, Siege, Stallion
Aerosol, Miracle Tool, Grrreat Grape, Assassin Aerosol, Forever Soft, Gask-It, Seal-It, Foam-Away
Aerosol, and a bunch of Handyman tools." In his answer, he was able to give him what other
locations of "Sealed Air" (a company with multiple locations) have purchased in the past. I would
like our LLM to be able to provide his high level of information based on sales history. I'm about to
import SIC and NAICS codes for many customers in the system. I would like for the LLM to also
have access to this data so that it can recommend products that other companies in similar
industries have purchased.`
        })
      } else if (t.includes('add glove program catalog')) {
        setShowGloveProgram(true)
        next.push({
          role: 'assistant',
          text: 'Added Comprehensive Glove Program catalog to the list'
        })
      } else if (t.includes('show products for double duty towels')) {
        next.push({
          role: 'assistant',
          text: '2 products are available - Double Duty Towels, Superco One Step Heavy Duty Towels. Which product would you like to add to list'
        })
      } else {
        next.push({
          role: 'assistant',
          text: 'Great! I will help you with appropriate product recommendations'
        })
      }
      return next
    })
    setShowRecs(true)
  }
  const inc = (id) => {
    setProducts((prev) => {
      const updated = prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
      const product = updated.find(p => p.id === id)
      setCart((prevCart) => {
        if (prevCart[id] > 0 && product) {
          return { ...prevCart, [id]: product.quantity }
        }
        return prevCart
      })
      return updated
    })
  }
  const dec = (id) => {
    setProducts((prev) => {
      const updated = prev.map(p => p.id === id ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p)
      const product = updated.find(p => p.id === id)
      setCart((prevCart) => {
        if (prevCart[id] > 0 && product) {
          if (product.quantity === 0) {
            const { [id]: removed, ...rest } = prevCart
            return rest
          }
          return { ...prevCart, [id]: product.quantity }
        }
        return prevCart
      })
      return updated
    })
  }
  const add = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + (products.find(p => p.id === id)?.quantity || 1) }))

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)

  const visibleProducts = products.filter(p => {
    if (p.title === 'COMPREHENSIVE GLOVE PROGRAM') {
      return showGloveProgram
    }
    return true
  })

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />
  }

  return (
    <div className="container">
      <div className={`main-grid ${showRecs ? 'with-aside' : ''}`}>
        <div>
          <ChatThread messages={messages} onSend={handleSend} cartCount={cartCount} onAdminClick={() => setShowAdmin(true)} />
        </div>
        <aside>
          {showRecs && !showCart && (
            <Recommendations items={visibleProducts} onAdd={add} onInc={inc} onDec={dec} cartCount={cartCount} onOpenCart={() => setShowCart(true)} />
          )}
          {showRecs && showCart && (
            <Cart items={products} cart={cart} onBack={() => setShowCart(false)} />
          )}
        </aside>
      </div>
    </div>
  )
}

export default App

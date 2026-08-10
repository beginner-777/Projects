'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft, ArrowRight, Camera as Instagram, Check, ChevronDown, ChevronRight, Heart,
  Layers3, MapPin, Menu, MessageCircle, Minus, MoveHorizontal, PackageCheck,
  Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Star, Truck, X,
} from 'lucide-react'
import { BUSINESS, categories, formatPrice, products, reviews, services, whatsappLink } from '../lib/data'

const StoreContext = createContext(null)
const useStore = () => useContext(StoreContext)

function StoreProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [toast, setToast] = useState('')

  const notify = (message) => {
    setToast(message)
    window.clearTimeout(window.__rajaToast)
    window.__rajaToast = window.setTimeout(() => setToast(''), 2400)
  }
  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { ...product, quantity }]
    })
    notify(`${product.name} added to your bag`)
  }
  const updateQuantity = (id, delta) => setCart((current) => current
    .map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
    .filter((item) => item.quantity > 0))
  const toggleWishlist = (id) => {
    setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    notify(wishlist.includes(id) ? 'Removed from saved items' : 'Saved to your collection')
  }
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return <StoreContext.Provider value={{ cart, wishlist, cartOpen, setCartOpen, searchOpen, setSearchOpen, toast, addToCart, updateQuantity, toggleWishlist, cartCount, cartTotal, notify }}>
    {children}
  </StoreContext.Provider>
}

function ScrollToTop() {
  const pathname = usePathname()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function Announcement() {
  return <div className="announcement">
    <span>Complimentary style consultation on custom orders</span>
    <span className="announcement-center">Pearl tones · bronze details · tailored craftsmanship</span>
    <a href={BUSINESS.instagram} target="_blank" rel="noreferrer">Follow {BUSINESS.instagramLabel}</a>
  </div>
}

function Logo() {
  return <Link href="/" className="logo" aria-label={`${BUSINESS.name} home`}>
    <img src="/assets/bait-al-nuas-logo.png" alt="Bait Al-Nu'as Curtains & Majlis" />
  </Link>
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, setCartOpen, setSearchOpen } = useStore()
  const pathname = usePathname()
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])
  const nav = [
    ['Collection', '/shop'], ['Majlis', '/gallery/sofas'], ['Curtains', '/gallery/curtains'],
    ['Gallery', '/gallery'], ['Services', '/services'], ['Our story', '/about'],
  ]
  return <>
    <Announcement />
    <header className="header">
      <button className="icon-button mobile-only" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map(([label, href]) => <Link className={pathname === href ? 'active' : ''} key={label} href={href}>{label}</Link>)}
      </nav>
      <div className="header-actions">
        <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search"><Search /></button>
        <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Shopping bag with ${cartCount} items`}>
          <ShoppingBag /><span>Bag</span><em>{cartCount}</em>
        </button>
      </div>
    </header>
    <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
      <button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
      <Logo />
      <nav>{nav.map(([label, href], index) => <Link key={label} href={href}><span>0{index + 1}</span>{label}<ChevronRight /></Link>)}</nav>
      <div className="mobile-social"><a href={BUSINESS.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={BUSINESS.x} target="_blank" rel="noreferrer">X / Twitter</a></div>
    </div>
  </>
}

function PageBackButton() {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <Link className="page-back" href="/" aria-label="Return to home page"><ArrowLeft /><span>Back home</span></Link>
}

function Art({ type, className = '', children }) {
  return <div className={`art art-${type} ${className}`} role="img" aria-label="Premium interior furnishing photography">{children}</div>
}

function Hero() {
  return <section className="hero hero-editorial">
    <div className="hero-copy">
      <p className="eyebrow">Bait Al-Nu'as · Since 2016</p>
      <h1><span>The art of</span><br /><em>gathering.</em></h1>
      <p>We shape curtains and majlis spaces as an atmosphere—not simply an arrangement. Soft light, generous form and the quiet glow of bronze.</p>
      <div className="hero-actions">
        <Link className="button button-ink" href="/shop">Enter the collection <ArrowRight /></Link>
        <Link className="text-link" href="/contact">Private consultation <ArrowRight /></Link>
      </div>
      <div className="hero-signature"><i /><span>Tailored in pearl, bronze<br />and warm neutral tones</span></div>
    </div>
    <div className="hero-stage">
      <div className="hero-arch">
        <Art type="hero" className="hero-art" />
        <div className="curtain curtain-left" aria-hidden="true" />
        <div className="curtain curtain-right" aria-hidden="true" />
        <span className="hero-frame-number">01</span>
      </div>
    </div>
    <div className="hero-vertical">CURTAINS · MAJLIS · INTERIORS</div>
    <div className="hero-scroll"><i /><span>Scroll to enter</span></div>
  </section>
}

function Marquee() {
  const items = ['MAJLIS', 'CURTAINS', 'WALL DÉCOR', 'BEDS & TABLES', 'SOFA COVERS', 'WEDDING HALLS']
  return <div className="marquee" aria-hidden="true"><div>{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></div>
}

function SectionTitle({ eyebrow, title, copy, link, linkLabel = 'View all' }) {
  return <div className="section-title">
    <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{copy && <p className="section-copy">{copy}</p>}</div>
    {link && <Link className="text-link" href={link}>{linkLabel}<ArrowRight /></Link>}
  </div>
}

function CategoryGrid() {
  return <section className="section shell">
    <SectionTitle eyebrow="Shop your space" title={<>One home. <em>Endless character.</em></>} copy="Thoughtful pieces and complete styling, curated around how you actually live." />
    <div className="category-grid">
      {categories.map((category, index) => <Link href={`/shop?category=${category.slug}`} className={`category-card category-${index + 1}`} key={category.slug}>
        <Art type={category.art} />
        <span className="category-number">0{index + 1}</span>
        <div className="category-content"><small>{category.count} designs</small><h3>{category.name}</h3><p>{category.note}</p></div>
        <i className="category-arrow"><ArrowRight /></i>
      </Link>)}
    </div>
  </section>
}

function Rating({ value, count }) {
  return <div className="rating" aria-label={`${value} out of 5 stars`}><span><Star fill="currentColor" /> {value}</span>{count && <small>({count})</small>}</div>
}

function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore()
  return <article className="product-card">
    <Link href={`/product/${product.slug}`} className="product-image">
      <Art type={product.art} />
      {product.badge && <span className="badge">{product.badge}</span>}
    </Link>
    <button className={`heart ${wishlist.includes(product.id) ? 'active' : ''}`} onClick={() => toggleWishlist(product.id)} aria-label="Save product"><Heart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button>
    <button className="quick-add" onClick={() => addToCart(product)}>Quick add <Plus /></button>
    <div className="product-info">
      <div><Link href={`/product/${product.slug}`}><h3>{product.name}</h3></Link><p>{formatPrice(product.price)} {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</p></div>
      <Rating value={product.rating} count={product.reviews} />
    </div>
  </article>
}

function ProductGrid({ items = products }) {
  return <div className="product-grid">{items.map((product) => <ProductCard product={product} key={product.id} />)}</div>
}

function FeaturedProducts() {
  const [tab, setTab] = useState('all')
  const tabs = [['all', 'All pieces'], ['sofas', 'Sofas'], ['curtains', 'Curtains'], ['sofa-covers', 'Covers']]
  const filtered = tab === 'all' ? products.slice(0, 8) : products.filter((item) => item.category === tab).slice(0, 8)
  return <section className="section shell featured-products">
    <SectionTitle eyebrow="The edit" title={<>Pieces worth <em>living with.</em></>} link="/shop" />
    <div className="filter-tabs" role="tablist">{tabs.map(([value, label]) => <button className={tab === value ? 'active' : ''} onClick={() => setTab(value)} key={value}>{label}</button>)}</div>
    <ProductGrid items={filtered} />
  </section>
}

function ServiceRibbon() {
  return <section className="service-ribbon shell">
    <div><Truck /><span><strong>Home delivery</strong><small>Across the twin cities</small></span></div>
    <div><Layers3 /><span><strong>Made to measure</strong><small>Designed for your dimensions</small></span></div>
    <div><PackageCheck /><span><strong>Professional fitting</strong><small>Clean, careful installation</small></span></div>
    <div><MessageCircle /><span><strong>Design support</strong><small>Personal advice on WhatsApp</small></span></div>
  </section>
}

function BeforeAfter() {
  const [position, setPosition] = useState(56)
  return <section className="section transformation-section">
    <div className="shell transformation-copy">
      <p className="eyebrow light">Real room transformation</p>
      <h2>See what thoughtful<br /><em>styling can do.</em></h2>
      <p>We work with the room you already have—then reshape its mood through proportion, texture, colour and detail.</p>
      <Link className="button button-cream" href="/gallery">Explore before & after <ArrowRight /></Link>
    </div>
    <div className="compare-wrap">
      <div className="compare-image before"><span>Before</span></div>
      <div className="compare-image after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><span>After</span></div>
      <div className="compare-line" style={{ left: `${position}%` }}><i><MoveHorizontal /></i></div>
      <input aria-label="Before and after comparison" type="range" min="5" max="95" value={position} onChange={(event) => setPosition(Number(event.target.value))} />
    </div>
  </section>
}

function StorySplit() {
  return <section className="section shell story-split">
    <div className="story-image"><Art type="q3" /><div className="experience-seal"><strong>10+</strong><span>years of<br />craft & care</span></div></div>
    <div className="story-copy">
      <p className="eyebrow">Made personal</p>
      <h2>Not just furnished.<br /><em>Considered.</em></h2>
      <p>Great interiors are not about filling a room. They are about finding the right balance—between softness and structure, beauty and everyday life.</p>
      <p>Our team brings design advice, skilled making and reliable installation together in one uncomplicated experience.</p>
      <Link className="text-link" href="/about">Meet Bait Al-Nu'as <ArrowRight /></Link>
      <div className="story-metrics"><span><strong>250+</strong><small>Spaces completed</small></span><span><strong>4.9/5</strong><small>Customer rating</small></span><span><strong>48h</strong><small>Visit scheduling</small></span></div>
    </div>
  </section>
}

function Reviews() {
  return <section className="section reviews-section">
    <div className="shell">
      <SectionTitle eyebrow="The word at home" title={<>Loved in <em>real rooms.</em></>} link="/reviews" linkLabel="Read all reviews" />
      <div className="reviews-grid">{reviews.map((review, index) => <article className="review-card" key={review.name}>
        <div className="quote-mark">“</div><Rating value={review.rating} /><blockquote>{review.quote}</blockquote>
        <div className="review-author"><span>{review.initials}</span><div><strong>{review.name}</strong><small>{review.location} · {review.item}</small></div></div>
        <em>0{index + 1}</em>
      </article>)}</div>
    </div>
  </section>
}

function SocialStrip() {
  return <section className="social-strip">
    <div className="social-copy"><Instagram /><p>See the latest rooms, details and installations</p><a href={BUSINESS.instagram} target="_blank" rel="noreferrer">{BUSINESS.instagramLabel}<ArrowRight /></a></div>
    <div className="social-images">{['q1', 'q3', 'q4', 'hero-crop'].map((type, index) => <a href={BUSINESS.instagram} target="_blank" rel="noreferrer" key={type + index}><Art type={type} /><Instagram /></a>)}</div>
  </section>
}

function HomeStatement() {
  return <section className="home-statement shell">
    <p className="eyebrow">Our practice</p>
    <h2>We compose rooms slowly—through proportion, textile, tone and the details that make everyday life feel considered.</h2>
    <Link className="text-link" href="/about">Discover our story <ArrowRight /></Link>
  </section>
}

function HomeCollections() {
  return <section className="home-collections">
    <Link href="/gallery/curtains" className="home-collection-card curtain-card">
      <Art type="q3" />
      <div><span>01 / Window atelier</span><h2>Curtains</h2><p>Light, privacy and softness—tailored precisely to the room.</p><i><ArrowRight /></i></div>
    </Link>
    <Link href="/gallery/sofas" className="home-collection-card majlis-card">
      <Art type="q1" />
      <div><span>02 / Made for gathering</span><h2>Majlis</h2><p>Generous seating shaped around comfort, culture and conversation.</p><i><ArrowRight /></i></div>
    </Link>
  </section>
}

function HomeInvitation() {
  return <section className="home-invitation shell">
    <span>Private consultation</span>
    <h2>Let us consider<br /><em>your space.</em></h2>
    <p>From one window to a complete room, our team helps you find the right material, scale and finish.</p>
    <Link className="button button-ink" href="/contact">Begin a conversation <ArrowRight /></Link>
  </section>
}

export function HomePage() {
  return <><Hero /><HomeStatement /><HomeCollections /><HomeInvitation /></>
}

function PageHero({ eyebrow, title, copy, image = 'hero-crop' }) {
  return <section className="page-hero shell">
    <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div><Art type={image} />
  </section>
}

export function ShopPage({ searchMode = false }) {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const selectedCategory = params.get('category') || 'all'
  const query = params.get('q') || ''
  const color = params.get('color') || 'all'
  const maxPrice = Number(params.get('max') || 250000)
  const [sort, setSort] = useState('featured')
  const setParam = (key, value, empty = 'all') => {
    const next = new URLSearchParams(params.toString())
    if (!value || value === empty) next.delete(key); else next.set(key, value)
    router.push(`${pathname}${next.toString() ? `?${next}` : ''}`, { scroll: false })
  }
  const clearFilters = () => router.push(pathname, { scroll: false })
  let filtered = products.filter((product) => (selectedCategory === 'all' || product.category === selectedCategory)
    && (color === 'all' || product.color === color)
    && product.price <= maxPrice
    && product.name.toLowerCase().includes(query.toLowerCase()))
  if (sort === 'low') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price)
  const colors = [...new Set(products.map((item) => item.color))]
  return <>
    <PageHero eyebrow={searchMode ? 'Search results' : 'The full collection'} title={searchMode ? <>Your search, <em>beautifully edited.</em></> : <>Find your room's <em>finishing piece.</em></>} copy={searchMode ? `Browse every result for “${query || 'all pieces'}” and refine by category, colour or price.` : 'Browse made-to-order majlis seating, tailored curtains and design services. Every piece can be personalised for your home.'} image="q1" />
    <section className="shop-layout shell section">
      <button className="button filter-mobile" onClick={() => setFiltersOpen(true)}><SlidersHorizontal /> Filters</button>
      <aside className={`filters ${filtersOpen ? 'is-open' : ''}`}>
        <button className="close-button filter-close" onClick={() => setFiltersOpen(false)}><X /></button>
        <div className="filter-heading"><h3>Filter collection</h3><button onClick={clearFilters}>Clear all</button></div>
        <label className="filter-search"><Search /><input value={query} onChange={(event) => setParam('q', event.target.value, '')} placeholder="Search products" /></label>
        <div className="filter-group"><h4>Category</h4>
          <label><input type="radio" checked={selectedCategory === 'all'} onChange={() => setParam('category', 'all')} /> All pieces <span>{products.length}</span></label>
          {categories.map((category) => <label key={category.slug}><input type="radio" checked={selectedCategory === category.slug} onChange={() => setParam('category', category.slug)} /> {category.name}<span>{products.filter((item) => item.category === category.slug).length}</span></label>)}
        </div>
        <div className="filter-group"><h4>Colour</h4><div className="color-list">
          <button className={color === 'all' ? 'active' : ''} onClick={() => setParam('color', 'all')}>All</button>
          {colors.map((item) => <button className={color === item ? 'active' : ''} onClick={() => setParam('color', item)} key={item}><i className={`swatch swatch-${item.toLowerCase()}`} />{item}</button>)}
        </div></div>
        <div className="filter-group"><h4>Maximum price</h4><input type="range" min="10000" max="250000" step="5000" value={maxPrice} onChange={(event) => setParam('max', event.target.value, '250000')} /><p>Up to <strong>{formatPrice(maxPrice)}</strong></p></div>
        <button className="button button-ink apply-filters" onClick={() => setFiltersOpen(false)}>Show {filtered.length} results</button>
      </aside>
      <div className="shop-results">
        <div className="results-bar"><p><strong>{filtered.length}</strong> pieces found</p><label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select><ChevronDown /></label></div>
        {filtered.length ? <ProductGrid items={filtered} /> : <div className="empty-state"><Search /><h3>No pieces matched</h3><p>Try a different category, colour or price range.</p><button onClick={clearFilters} className="button button-ink">Reset filters</button></div>}
      </div>
    </section>
  </>
}

export function ProductPage() {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const { addToCart, wishlist, toggleWishlist } = useStore()
  const [quantity, setQuantity] = useState(1)
  if (!product) return <NotFound />
  const category = categories.find((item) => item.slug === product.category)
  return <>
    <section className="product-detail shell">
      <div className="breadcrumbs"><Link href="/">Home</Link><ChevronRight /><Link href={`/shop?category=${product.category}`}>{category?.name}</Link><ChevronRight /><span>{product.name}</span></div>
      <div className="product-detail-grid">
        <div className="product-gallery"><Art type={product.art} /><Art type={product.art} className="gallery-detail-secondary" /><button><Search /> Zoom</button></div>
        <div className="product-summary">
          {product.badge && <span className="badge inline-badge">{product.badge}</span>}
          <h1>{product.name}</h1><Rating value={product.rating} count={`${product.reviews} verified reviews`} />
          <div className="detail-price">{formatPrice(product.price)} {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
          <p>{product.description}</p>
          <div className="detail-option"><span>Colour <strong>{product.color}</strong></span><div><button className="color-choice selected"><i className={`swatch swatch-${product.color.toLowerCase()}`} /></button><button className="color-choice"><i className="swatch swatch-sand" /></button><button className="color-choice"><i className="swatch swatch-ivory" /></button></div></div>
          <div className="custom-note"><Sparkles /><div><strong>Made for your room</strong><span>Fabric, finish and dimensions can be personalised during consultation.</span></div></div>
          <div className="purchase-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus /></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><Plus /></button></div><button className="button button-ink add-detail" onClick={() => addToCart(product, quantity)}>Add to bag <ShoppingBag /></button><button className={`save-detail ${wishlist.includes(product.id) ? 'active' : ''}`} onClick={() => toggleWishlist(product.id)}><Heart fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button></div>
          <a className="button whatsapp-enquiry" href={whatsappLink(`Hello Bait Al-Nu'as, I would like details about ${product.name} (${formatPrice(product.price)}).`)} target="_blank" rel="noreferrer"><MessageCircle /> Enquire on WhatsApp</a>
          <div className="detail-points"><span><Check /> Home measurement available</span><span><Check /> Professional installation</span><span><Check /> Care guidance included</span></div>
        </div>
      </div>
    </section>
    <section className="section shell"><SectionTitle eyebrow="Pairs beautifully with" title="Complete the room." /><ProductGrid items={products.filter((item) => item.id !== product.id).slice(0, 4)} /></section>
  </>
}

export function AboutPage() {
  return <>
    <PageHero eyebrow="Our point of view" title={<>A home should feel <em>collected, not decorated.</em></>} copy="Bait Al-Nu'as brings curtains, majlis craft and interior styling together—so creating a beautiful room feels personal, practical and enjoyable." image="hero-crop" />
    <section className="section shell about-manifesto"><p>We believe</p><h2>Good design is not a luxury reserved for show homes. It is the quiet comfort of a sofa shaped around your family, curtains that fall exactly right, and a room that finally feels complete.</h2></section>
    <StorySplit />
    <section className="values shell section">{[['01','Listen first','Your taste, routines and space guide every decision.'],['02','Make it well','Skilled hands and considered materials create lasting value.'],['03','Finish properly','Precise installation and styling are part of the design.']].map(([number,title,text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</section>
  </>
}

export function ServicesPage() {
  return <>
    <PageHero eyebrow="What we do" title={<>From one window to a <em>complete transformation.</em></>} copy="Choose a single service or let us bring every element together. Our team manages measuring, making, sourcing, fitting and final styling." image="q3" />
    <section className="section shell services-list">{services.map((service, index) => <article key={service.number}><div><span>{service.number}</span><h2>{service.title}</h2></div><p>{service.text}</p><Art type={['q3','q1','hero-crop','q2','transform-after','q4'][index]} /><a href={whatsappLink(`Hello Bait Al-Nu'as, I would like to discuss your ${service.title} service.`)} target="_blank" rel="noreferrer"><ArrowRight /></a></article>)}</section>
    <section className="process-section"><div className="shell"><SectionTitle eyebrow="A simple process" title={<>From hello to <em>handover.</em></>} />
      <div className="process-grid">{[['01','Share your space','Send photos, measurements or arrange a visit.'],['02','Shape the direction','We align on style, materials, timeline and budget.'],['03','Make & prepare','Your selected pieces are tailored and quality checked.'],['04','Install & style','Our team completes the space and final details.']].map(([n,t,p]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{p}</p></article>)}</div>
    </div></section>
  </>
}

export function GalleryPage({ initialTab = 'transformations' }) {
  const [tab, setTab] = useState(initialTab)
  useEffect(() => {
    setTab(initialTab)
  }, [initialTab])
  const [lightbox, setLightbox] = useState(null)
  const art = tab === 'sofas' ? ['q1','q2','q1','q2','q1','q2'] : tab === 'curtains' ? ['q3','q3','hero-crop','q3','hero-crop','q3'] : ['transform-before','transform-after','hero-crop','q1','q3','q4']
  return <>
    <PageHero eyebrow="The room edit" title={<>Details, installations & <em>real transformations.</em></>} copy="Browse a selection of completed spaces, custom furniture and made-to-measure window treatments." image="transform-after" />
    <section className="section shell gallery-page">
      <div className="gallery-tabs">{[['transformations','Before & after'],['sofas','Sofa gallery'],['curtains','Curtain gallery']].map(([value,label]) => <button className={tab === value ? 'active' : ''} onClick={() => setTab(value)} key={value}>{label}</button>)}</div>
      {tab === 'transformations' && <BeforeAfter />}
      <div className="gallery-grid">{art.map((type,index) => <button onClick={() => setLightbox(type)} key={`${type}-${index}`} className={`gallery-tile tile-${index + 1}`}><Art type={type} /><span><Search /> View detail</span></button>)}</div>
    </section>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)}><X /></button><Art type={lightbox} /></div>}
  </>
}

export function ReviewsPage() {
  return <>
    <PageHero eyebrow="Client stories" title={<>Luxury is how a room <em>makes you feel.</em></>} copy="Real notes from homes shaped with custom curtains, majlis seating and considered finishing details." image="q2" />
    <section className="section reviews-section reviews-page"><div className="shell">
      <div className="reviews-grid">{reviews.map((review, index) => <article className="review-card" key={review.name}>
        <div className="quote-mark">“</div><Rating value={review.rating} /><blockquote>{review.quote}</blockquote>
        <div className="review-author"><span>{review.initials}</span><div><strong>{review.name}</strong><small>{review.location} · {review.item}</small></div></div><em>0{index + 1}</em>
      </article>)}</div>
    </div></section>
  </>
}

export function ContactPage() {
  const [status, setStatus] = useState('idle')
  const submit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (!BUSINESS.email) { setStatus('email-needed'); return }
    const subject = `New interior enquiry from ${form.get('name')}`
    const body = [`Name: ${form.get('name')}`, `Phone: ${form.get('phone')}`, `Email: ${form.get('email')}`, `Service: ${form.get('service')}`, `Area: ${form.get('area')}`, '', 'Project details:', form.get('message')].join('\n')
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus('ready')
  }
  return <>
    <section className="contact-editorial"><div className="contact-editorial-copy"><p className="eyebrow">The private design desk</p><h1>Begin with<br /><em>a conversation.</em></h1><p>Tell us about the room, the light and how you want the space to feel. We will guide the next step personally.</p><span>Response within 1–2 business days</span></div><Art type="q3" className="contact-editorial-art" /><div className="contact-monogram">ب</div>
    </section>
    <section className="contact-details-strip shell"><a href={whatsappLink("Hello Bait Al-Nu'as, I would like to discuss an interior project.")} target="_blank" rel="noreferrer"><MessageCircle /><span><strong>WhatsApp</strong><small>Project & product assistance</small></span><ArrowRight /></a><div><MapPin /><span><strong>Visit area</strong><small>{BUSINESS.serviceArea}</small></span></div><a href={BUSINESS.instagram} target="_blank" rel="noreferrer"><Instagram /><span><strong>Instagram</strong><small>{BUSINESS.instagramLabel}</small></span><ArrowRight /></a></section>
    <section className="contact-layout shell section contact-layout-premium">
      <form onSubmit={submit} className="contact-form">
        {status === 'ready' ? <div className="form-success"><span><Check /></span><h2>Your email is ready.</h2><p>Your mail application has opened with the project details. Review it and press Send.</p><button type="button" className="button button-ink" onClick={() => setStatus('idle')}>Write another enquiry</button></div> : <>
          <div className="form-heading"><span>01</span><div><h2>Tell us about your space</h2><p>Measurements are helpful, but not required at this stage.</p></div></div>
          {status === 'email-needed' && <p className="form-notice">Add the receiving email in <strong>lib/data.js</strong> to activate email delivery.</p>}
          <div className="form-grid"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Phone number<input name="phone" required type="tel" placeholder="03XX XXXXXXX" /></label><label>Email address<input name="email" required type="email" placeholder="you@example.com" /></label><label>Service interested in<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.title}>{service.title}</option>)}</select></label><label className="full">Your area<input name="area" placeholder="Area / city" /></label><label className="full">Project brief<textarea name="message" required rows="6" placeholder="Room type, preferred colours, dimensions, timeline or anything else you would like us to know…" /></label></div>
          <button className="button button-ink" type="submit">Send enquiry <ArrowRight /></button>
        </>}
      </form>
      <aside className="contact-aside"><span>02</span><h2>What happens next?</h2><ol><li><strong>We review your brief</strong><p>Our team studies your room, requirement and preferred direction.</p></li><li><strong>A personal call</strong><p>We discuss materials, measurements, schedule and an initial budget range.</p></li><li><strong>Home consultation</strong><p>When needed, we arrange an on-site visit across the twin cities.</p></li></ol><div className="contact-hours"><small>Consultation hours</small><strong>Monday—Saturday</strong><span>10:00 AM—7:00 PM</span></div></aside>
    </section>
  </>
}

function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const router = useRouter()
  const inputRef = useRef(null)
  useEffect(() => {
    if (!searchOpen) return undefined
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 100)
    return () => window.clearTimeout(focusTimer)
  }, [searchOpen])
  const results = query ? products.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4) : products.slice(0, 4)
  const submit = (event) => { event.preventDefault(); setSearchOpen(false); router.push(`/search?q=${encodeURIComponent(query)}`) }
  return <div className={`search-overlay ${searchOpen ? 'is-open' : ''}`} aria-hidden={!searchOpen}>
    <button className="close-button" onClick={() => setSearchOpen(false)}><X /></button>
    <div className="search-inner"><p className="eyebrow">Find your piece</p><form onSubmit={submit}><Search /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “curtains” or “olive sofa”" /><button>Search <ArrowRight /></button></form>
      <p className="search-label">{query ? 'Matching pieces' : 'Popular right now'}</p><div className="search-results">{results.map((product) => <Link href={`/product/${product.slug}`} onClick={() => setSearchOpen(false)} key={product.id}><Art type={product.art} /><span><strong>{product.name}</strong><small>{formatPrice(product.price)}</small></span><ArrowRight /></Link>)}</div>
    </div>
  </div>
}

function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQuantity, cartTotal } = useStore()
  return <><div className={`drawer-backdrop ${cartOpen ? 'is-open' : ''}`} onClick={() => setCartOpen(false)} /><aside className={`cart-drawer ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen}>
    <div className="cart-head"><div><p className="eyebrow">Your selection</p><h2>Shopping bag</h2></div><button onClick={() => setCartOpen(false)}><X /></button></div>
    <div className="cart-items">{cart.length ? cart.map((item) => <article key={item.id}><Art type={item.art} /><div><Link href={`/product/${item.slug}`} onClick={() => setCartOpen(false)}>{item.name}</Link><small>{item.color}</small><strong>{formatPrice(item.price)}</strong><div className="cart-quantity"><button onClick={() => updateQuantity(item.id, -1)}><Minus /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus /></button></div></div><button className="remove-cart" onClick={() => updateQuantity(item.id, -item.quantity)}>Remove</button></article>) : <div className="empty-cart"><ShoppingBag /><h3>Your bag is waiting</h3><p>Explore pieces designed to make your room feel complete.</p><Link className="button button-ink" href="/shop" onClick={() => setCartOpen(false)}>Start shopping</Link></div>}</div>
    {cart.length > 0 && <div className="cart-footer"><div><span>Subtotal</span><strong>{formatPrice(cartTotal)}</strong></div><p>Delivery and customisation are confirmed during consultation.</p><a className="button button-ink" href={whatsappLink(`Hello Bait Al-Nu'as, I would like to enquire about my cart worth ${formatPrice(cartTotal)}.`)} target="_blank" rel="noreferrer">Enquire to order <MessageCircle /></a></div>}
  </aside></>
}

function WhatsAppButton() {
  return <a className="whatsapp-float" href={whatsappLink("Hello Bait Al-Nu'as, I would like help choosing something for my home.")} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle /><span>Let’s talk interiors</span></a>
}

function Footer() {
  return <footer className="footer">
    <div className="footer-top shell"><div className="footer-lead"><Logo /><h2>Bring your room<br /><em>into focus.</em></h2><a className="button button-sun" href={whatsappLink("Hello Bait Al-Nu'as, I would like to book a design consultation.")} target="_blank" rel="noreferrer">Start a project <ArrowRight /></a></div>
      <div className="footer-links"><div><h3>Shop</h3><Link href="/shop?category=sofas">Majlis & sofas</Link><Link href="/shop?category=curtains">Curtains</Link><Link href="/shop?category=sofa-covers">Sofa covers</Link><Link href="/shop?category=beds-tables">Beds & tables</Link></div><div><h3>Discover</h3><Link href="/about">Our story</Link><Link href="/services">Services</Link><Link href="/gallery">Gallery</Link><Link href="/reviews">Reviews</Link><Link href="/contact">Contact</Link></div><div><h3>Follow</h3><a href={BUSINESS.instagram} target="_blank" rel="noreferrer">Instagram <small>{BUSINESS.instagramLabel}</small></a><a href={BUSINESS.x} target="_blank" rel="noreferrer">X / Twitter <small>{BUSINESS.xLabel}</small></a></div></div>
    </div>
    <div className="footer-bottom shell"><span>© {new Date().getFullYear()} Bait Al-Nu'as. Frontend store concept.</span><span>Curtains & majlis, made with detail.</span></div>
  </footer>
}

function NotFound() {
  return <section className="not-found shell"><span>404</span><h1>This room is still empty.</h1><p>The page you are looking for has moved or does not exist.</p><Link className="button button-ink" href="/">Return home</Link></section>
}

function SiteShellContent({ children }) {
  const { toast } = useStore()
  return <><ScrollToTop /><Header /><PageBackButton /><main className="page-enter">{children}</main><Footer /><SearchOverlay /><CartDrawer /><WhatsAppButton /><div className={`toast ${toast ? 'show' : ''}`}><Check />{toast}</div></>
}

export function SiteShell({ children }) {
  return <StoreProvider><SiteShellContent>{children}</SiteShellContent></StoreProvider>
}

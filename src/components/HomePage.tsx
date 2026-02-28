import { useState, useEffect, useRef } from 'react'
import './HomePage.css'
import { DecodeText } from './DecodeText'

const NAV_DECODE_DURATION_MS = 1000
const MAIN_REVEAL_OFFSET_MS = 500

const STATEMENT_HEADLINE = 'Our software powers real-time, AI-driven decisions in critical government and commercial enterprises in the West, from the factory floors to the front lines.'
const STATEMENT_ACCENT_START = 28  // 'AI-driven' start
const STATEMENT_ACCENT_END = 37    // 'AI-driven' end
const TYPING_INTERVAL_MS = 38
const STATEMENT_IMAGE_ANIMATION_MS = 1800

const INDUSTRIES_DECODE_DURATION_MS = 900
const INDUSTRIES_LABEL_DECODE_MS = 700
const INDUSTRIES_DECODE_DELAY_MS = 1500

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [revealPhase, setRevealPhase] = useState<'black' | 'logo' | 'nav' | 'all'>('black')
  const [statementInView, setStatementInView] = useState(false)
  const [statementTypingStarted, setStatementTypingStarted] = useState(false)
  const [statementTypingCount, setStatementTypingCount] = useState(0)
  const [industriesInView, setIndustriesInView] = useState(false)
  const statementRef = useRef<HTMLElement>(null)
  const industriesRef = useRef<HTMLElement>(null)
  const lookAheadRef = useRef<HTMLElement>(null)
  const [lookAheadInView, setLookAheadInView] = useState(false)
  const lookAheadRatioRef = useRef(0)

  useEffect(() => {
    const t1 = setTimeout(() => setRevealPhase('logo'), 500)
    const t2 = setTimeout(() => setRevealPhase('nav'), 1000)
    const t3 = setTimeout(() => setRevealPhase('all'), 1000 + MAIN_REVEAL_OFFSET_MS)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    const el = statementRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatementInView(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = industriesRef.current
    if (!el) return
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setIndustriesInView(true), INDUSTRIES_DECODE_DELAY_MS)
        } else {
          if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
          }
          setIndustriesInView(false)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    )
    observer.observe(el)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = lookAheadRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const r = entry.intersectionRatio
        const prev = lookAheadRatioRef.current
        lookAheadRatioRef.current = r
        if (r >= 0.55) setLookAheadInView(true)
        else if (r <= 0.05) setLookAheadInView(false)
        else if (r > prev && r >= 0.25) setLookAheadInView(true)  // scrolling up: turn white once section is 25% in view
      },
      { threshold: [0.05, 0.25, 0.55], rootMargin: '0px 0px -20% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!statementInView) return
    const t = setTimeout(() => setStatementTypingStarted(true), STATEMENT_IMAGE_ANIMATION_MS)
    return () => clearTimeout(t)
  }, [statementInView])

  useEffect(() => {
    if (!statementTypingStarted) return
    const interval = setInterval(() => {
      setStatementTypingCount((prev) => {
        if (prev >= STATEMENT_HEADLINE.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, TYPING_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [statementTypingStarted])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`homepage homepage--${revealPhase}`}>
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${lookAheadInView ? 'navbar--light' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/citistek_logo_cropped.png" alt="CITISTEK" className="nav-logo-img" />
          </div>
          <div className="nav-links">
            <a href="#capabilities"><DecodeText key={`nav-capabilities-${revealPhase}`} text="Capabilities" duration={NAV_DECODE_DURATION_MS} isActive={revealPhase === 'nav'} className="nav-link-inner" /></a>
            <a href="#products"><DecodeText key={`nav-products-${revealPhase}`} text="Products" duration={NAV_DECODE_DURATION_MS} isActive={revealPhase === 'nav'} className="nav-link-inner" /></a>
            <a href="#about"><DecodeText key={`nav-about-${revealPhase}`} text="About" duration={NAV_DECODE_DURATION_MS} isActive={revealPhase === 'nav'} className="nav-link-inner" /></a>
            <a href="#careers"><DecodeText key={`nav-careers-${revealPhase}`} text="Careers" duration={NAV_DECODE_DURATION_MS} isActive={revealPhase === 'nav'} className="nav-link-inner" /></a>
            <a href="#news"><DecodeText key={`nav-news-${revealPhase}`} text="News" duration={NAV_DECODE_DURATION_MS} isActive={revealPhase === 'nav'} className="nav-link-inner" /></a>
          </div>
          <button type="button" className="nav-cta">
            <DecodeText key={`nav-contact-${revealPhase}`} text="Contact" duration={NAV_DECODE_DURATION_MS} isActive={revealPhase === 'nav'} className="nav-cta-inner" />
          </button>
        </div>
      </nav>

      {/* Main content: hero, sections, footer */}
      <div className="homepage__main">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Transforming Defense Capabilities
            <br />
            with Advanced Technology
          </h1>
          <p className="hero-subtitle">
            Building autonomous systems and AI-powered platforms that solve
            critical defense challenges at the tactical edge.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Capabilities</button>
            <button className="btn-secondary">Watch Video</button>
          </div>
        </div>
        <div className="hero-visual">
          <video
            className="hero-video"
            src="/2025_Home-Page_Masthead_V3_autooptimized_1920x1080.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
          <div className="hero-gradient" />
        </div>
      </section>

      {/* Statement Section (below hero) */}
      <section
        ref={statementRef}
        className={`statement ${statementInView ? 'statement--in-view' : ''}`}
        id="capabilities"
      >
        <div className="statement-row">
          <div className="statement-container">
            {/* Ghost headline: full text, invisible, reserves height so image doesn't grow */}
            <h2 className="statement-headline statement-headline--ghost" aria-hidden>
              Our software powers real-time, <span className="statement-headline-accent">AI-driven</span> decisions in critical government and commercial enterprises in the West, from the factory floors to the front lines.
            </h2>
            {/* Visible typing headline, overlaid */}
            <h2 className="statement-headline statement-headline--typing" aria-label={STATEMENT_HEADLINE}>
              {(() => {
                const n = statementTypingCount
                const before = STATEMENT_HEADLINE.slice(0, Math.min(STATEMENT_ACCENT_START, n))
                const accent = STATEMENT_HEADLINE.slice(STATEMENT_ACCENT_START, Math.min(STATEMENT_ACCENT_END, n))
                const after = STATEMENT_HEADLINE.slice(STATEMENT_ACCENT_END, n)
                return (
                  <>
                    {before}
                    {accent && <span className="statement-headline-accent">{accent}</span>}
                    {after}
                    {n < STATEMENT_HEADLINE.length && <span className="statement-headline-cursor" aria-hidden>|</span>}
                  </>
                )
              })()}
            </h2>
          </div>
          <div className="statement-visual">
            <img
              src="/MMAUV-thumb.jpg"
              alt=""
              className="statement-image"
            />
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section ref={industriesRef} className={`industries ${industriesInView ? 'industries--decode-active' : ''}`} id="industries">
        <div className="industries-container">
          <h2 className="industries-title">
            <DecodeText
              key={`industries-title-${industriesInView}`}
              text="Industries"
              duration={INDUSTRIES_DECODE_DURATION_MS}
              isActive={industriesInView}
              className="industries-title-inner"
            />
          </h2>
          <div className="industries-panels">
            <a href="#air" className="industries-panel industries-panel--air">
              <span className="industries-panel-label">
                <DecodeText key={`ind-air-${industriesInView}`} text="Air" duration={INDUSTRIES_LABEL_DECODE_MS} isActive={industriesInView} />
              </span>
              <span className="industries-panel-arrow" aria-hidden>→</span>
            </a>
            <a href="#land" className="industries-panel industries-panel--land">
              <span className="industries-panel-label">
                <DecodeText key={`ind-land-${industriesInView}`} text="Land" duration={INDUSTRIES_LABEL_DECODE_MS} isActive={industriesInView} />
              </span>
              <span className="industries-panel-arrow" aria-hidden>→</span>
            </a>
            <a href="#sea" className="industries-panel industries-panel--sea">
              <span className="industries-panel-label">
                <DecodeText key={`ind-sea-${industriesInView}`} text="Sea" duration={INDUSTRIES_LABEL_DECODE_MS} isActive={industriesInView} />
              </span>
              <span className="industries-panel-arrow" aria-hidden>→</span>
            </a>
            <a href="#space" className="industries-panel industries-panel--space">
              <span className="industries-panel-label">
                <DecodeText key={`ind-space-${industriesInView}`} text="Space" duration={INDUSTRIES_LABEL_DECODE_MS} isActive={industriesInView} />
              </span>
              <span className="industries-panel-arrow" aria-hidden>→</span>
            </a>
            <a href="#cyber" className="industries-panel industries-panel--cyber">
              <span className="industries-panel-label">
                <DecodeText key={`ind-cyber-${industriesInView}`} text="Cyber" duration={INDUSTRIES_LABEL_DECODE_MS} isActive={industriesInView} />
              </span>
              <span className="industries-panel-arrow" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Look Ahead Section – white, nav-aligned content band */}
      <section ref={lookAheadRef} className="look-ahead" id="look-ahead">
        <div className="look-ahead-container">
          <div className="look-ahead-header">
            <h2 className="look-ahead-title">2026 Look Ahead</h2>
            <p className="look-ahead-subtitle">Delivering the Next Era of Defense</p>
            <a href="#contact" className="look-ahead-cta">LEARN MORE →</a>
          </div>
          <div className="look-ahead-visual">
            {/* Placeholder: replace with image or video when asset is ready */}
            <div className="look-ahead-visual-placeholder" aria-hidden />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="mission-content">
          <div className="mission-text">
            <h2>Mission-Driven Innovation</h2>
            <p>
              We bring together talented engineers and veterans to solve defense
              problems at the tactical edge. Our AI platforms power diverse
              applications from troop protection to wildfire fighting and search
              & rescue missions.
            </p>
            <button className="btn-primary">Learn More</button>
          </div>
          <div className="mission-visual">
            <div className="mission-gradient"></div>
          </div>
        </div>
      </section>

      {/* News/Updates Section */}
      <section className="news" id="news">
        <div className="section-container">
          <h2 className="section-title">Latest Updates</h2>
          <div className="news-grid">
            <article className="news-card">
              <div className="news-date">Dec 2024</div>
              <h3>How Defense Technology Actually Gets Built</h3>
              <p>
                Exploring the engineering and development process behind modern
                defense systems.
              </p>
              <a href="#" className="news-link">
                Read More →
              </a>
            </article>
            <article className="news-card">
              <div className="news-date">Nov 2024</div>
              <h3>Advancing Autonomous Capabilities</h3>
              <p>
                Latest developments in AI-powered autonomous systems for defense
                applications.
              </p>
              <a href="#" className="news-link">
                Read More →
              </a>
            </article>
            <article className="news-card">
              <div className="news-date">Oct 2024</div>
              <h3>Partnership Announcements</h3>
              <p>
                Strategic collaborations to accelerate defense technology
                innovation.
              </p>
              <a href="#" className="news-link">
                Read More →
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#news">News</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Capabilities</h4>
            <ul>
              <li><a href="#lattice">Lattice</a></li>
              <li><a href="#autonomous">Autonomous Systems</a></li>
              <li><a href="#auv">AUVs</a></li>
              <li><a href="#counter-uas">Counter-UAS</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <div className="footer-logo">CITISTEK</div>
            <p className="footer-copyright">
              © 2024 Citistek. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}

export default HomePage



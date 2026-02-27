import { useState, useEffect } from 'react'
import './HomePage.css'

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">CITISTEK</span>
          </div>
          <div className="nav-links">
            <a href="#capabilities">Capabilities</a>
            <a href="#products">Products</a>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#news">News</a>
          </div>
          <button className="nav-cta">Contact</button>
        </div>
      </nav>

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
          <div className="hero-gradient"></div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="capabilities" id="capabilities">
        <div className="section-container">
          <h2 className="section-title">Core Capabilities</h2>
          <div className="capabilities-grid">
            <div className="capability-card">
              <div className="capability-icon">⚡</div>
              <h3>Lattice Platform</h3>
              <p>
                Integrated command and control providing persistent awareness
                across land, sea, and air.
              </p>
            </div>
            <div className="capability-card">
              <div className="capability-icon">🚁</div>
              <h3>Autonomous Systems</h3>
              <p>
                Air systems for intelligence, surveillance, and reconnaissance
                missions.
              </p>
            </div>
            <div className="capability-card">
              <div className="capability-icon">🌊</div>
              <h3>Underwater Vehicles</h3>
              <p>
                AUVs for littoral and deep-water survey and inspection
                operations.
              </p>
            </div>
            <div className="capability-card">
              <div className="capability-icon">🛡️</div>
              <h3>Counter-UAS</h3>
              <p>
                Advanced systems to detect, identify, track, and neutralize drone
                threats.
              </p>
            </div>
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
  )
}

export default HomePage



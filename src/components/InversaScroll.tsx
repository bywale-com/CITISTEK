import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ease = (x: number) => x * x * (3 - 2 * x)

export function InversaScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const heroImgElementRef = useRef<HTMLDivElement>(null)
  const heroMaskRef = useRef<HTMLDivElement>(null)
  const heroGridOverlayRef = useRef<HTMLDivElement>(null)
  const marker1Ref = useRef<HTMLDivElement>(null)
  const marker2Ref = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const heroContent = heroContentRef.current
    const heroImg = heroImgRef.current
    const heroImgElement = heroImgElementRef.current
    const heroMask = heroMaskRef.current
    const heroGridOverlay = heroGridOverlayRef.current
    const marker1 = marker1Ref.current
    const marker2 = marker2Ref.current
    const progressBar = progressBarRef.current

    if (
      !heroContent ||
      !heroImg ||
      !heroImgElement ||
      !heroMask ||
      !heroGridOverlay ||
      !marker1 ||
      !marker2 ||
      !progressBar
    ) {
      return
    }

    const heroContentHeight = heroContent.offsetHeight
    const viewportHeight = window.innerHeight
    const heroContentMoveDistance = heroContentHeight - viewportHeight

    const heroImgHeight = heroImg.offsetHeight
    const heroImgMoveDistance = heroImgHeight - viewportHeight

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${window.innerHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(progressBar, { '--progress': self.progress } as gsap.TweenVars)

        gsap.set(heroContent, {
          y: -self.progress * heroContentMoveDistance,
        })

        let heroImgProgress: number
        if (self.progress <= 0.45) {
          heroImgProgress = ease(self.progress / 0.45) * 0.65
        } else if (self.progress <= 0.75) {
          heroImgProgress = 0.65
        } else {
          heroImgProgress = 0.65 + ease((self.progress - 0.75) / 0.25) * 0.35
        }

        gsap.set(heroImg, {
          y: heroImgProgress * heroImgMoveDistance,
        })

        let heroMaskScale: number
        let heroImgSaturation: number
        let heroImgOverlayOpacity: number

        if (self.progress <= 0.4) {
          heroMaskScale = 2.5
          heroImgSaturation = 1
          heroImgOverlayOpacity = 0.35
        } else if (self.progress <= 0.5) {
          const phaseProgress = ease((self.progress - 0.4) / 0.1)
          heroMaskScale = 2.5 - phaseProgress * 1.5
          heroImgSaturation = 1 - phaseProgress
          heroImgOverlayOpacity = 0.35 + phaseProgress * 0.35
        } else if (self.progress <= 0.75) {
          heroMaskScale = 1
          heroImgSaturation = 0
          heroImgOverlayOpacity = 0.7
        } else if (self.progress <= 0.85) {
          const phaseProgress = ease((self.progress - 0.75) / 0.1)
          heroMaskScale = 1 + phaseProgress * 1.5
          heroImgSaturation = phaseProgress
          heroImgOverlayOpacity = 0.7 - phaseProgress * 0.35
        } else {
          heroMaskScale = 2.5
          heroImgSaturation = 1
          heroImgOverlayOpacity = 0.35
        }

        gsap.set(heroMask, { scale: heroMaskScale })
        gsap.set(heroImgElement, {
          filter: `saturate(${heroImgSaturation})`,
        })
        gsap.set(heroImg, {
          '--overlay-opacity': heroImgOverlayOpacity,
        } as gsap.TweenVars)

        let heroGridOpacity: number
        if (self.progress <= 0.475) {
          heroGridOpacity = 0
        } else if (self.progress <= 0.5) {
          heroGridOpacity = ease((self.progress - 0.475) / 0.025)
        } else if (self.progress <= 0.75) {
          heroGridOpacity = 1
        } else if (self.progress <= 0.775) {
          heroGridOpacity = 1 - ease((self.progress - 0.75) / 0.025)
        } else {
          heroGridOpacity = 0
        }
        gsap.set(heroGridOverlay, { opacity: heroGridOpacity })

        let marker1Opacity: number
        if (self.progress <= 0.5) {
          marker1Opacity = 0
        } else if (self.progress <= 0.525) {
          marker1Opacity = ease((self.progress - 0.5) / 0.025)
        } else if (self.progress <= 0.7) {
          marker1Opacity = 1
        } else if (self.progress <= 0.75) {
          marker1Opacity = 1 - ease((self.progress - 0.7) / 0.05)
        } else {
          marker1Opacity = 0
        }
        gsap.set(marker1, { opacity: marker1Opacity })

        let marker2Opacity: number
        if (self.progress <= 0.55) {
          marker2Opacity = 0
        } else if (self.progress <= 0.575) {
          marker2Opacity = ease((self.progress - 0.55) / 0.025)
        } else if (self.progress <= 0.7) {
          marker2Opacity = 1
        } else if (self.progress <= 0.75) {
          marker2Opacity = 1 - ease((self.progress - 0.7) / 0.05)
        } else {
          marker2Opacity = 0
        }
        gsap.set(marker2, { opacity: marker2Opacity })
      },
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="look-ahead-inversa">
      <div className="inversa-hero-img" ref={heroImgRef}>
        <div
          ref={heroImgElementRef}
          className="inversa-hero-img-inner"
          style={{ background: 'linear-gradient(135deg, #7a5229 0%, #9B6836 50%, #b07d45 100%)' }}
        />
      </div>

      <div className="inversa-hero-mask" ref={heroMaskRef} aria-hidden />

      <div className="inversa-hero-grid-overlay" ref={heroGridOverlayRef}>
        <img src="/inversa-grid-overlay.svg" alt="" aria-hidden />
      </div>

      <div className="inversa-marker inversa-marker-1" ref={marker1Ref}>
        <span className="inversa-marker-icon" aria-hidden />
        <p className="inversa-marker-label">Anchor Field</p>
      </div>

      <div className="inversa-marker inversa-marker-2" ref={marker2Ref}>
        <span className="inversa-marker-icon" aria-hidden />
        <p className="inversa-marker-label">Drift Field</p>
      </div>

      <div className="inversa-hero-content" ref={heroContentRef}>
        <div className="inversa-hero-content-block">
          <div className="inversa-hero-content-copy">
            <h2 className="inversa-hero-title">Location Framework</h2>
          </div>
        </div>
        <div className="inversa-hero-content-block">
          <div className="inversa-hero-content-copy">
            <h3 className="inversa-hero-h3">Coordinate Mapping</h3>
            <p>
              Terrain data is interpreted through directional vectors. Movement
              responds to relative position rather than absolute distance.
            </p>
          </div>
        </div>
        <div className="inversa-hero-content-block">
          <div className="inversa-hero-content-copy">
            <h3 className="inversa-hero-h3">Active Locations</h3>
            <p>
              Key points are indexed within the field. Each location functions
              as a reference for spatial alignment and transition logic.
            </p>
          </div>
        </div>
        <div className="inversa-hero-content-block">
          <div className="inversa-hero-content-copy">
            <h3 className="inversa-hero-h3">Spatial Center</h3>
            <p>
              The system converges toward a balanced focal region. Motion
              decelerates as positional variance reaches equilibrium.
            </p>
          </div>
        </div>
      </div>

      <div className="inversa-scroll-progress-bar" ref={progressBarRef} aria-hidden />
    </div>
  )
}

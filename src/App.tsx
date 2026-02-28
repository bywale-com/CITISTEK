import { useState, useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import './App.css'
import HomePage from './components/HomePage'

const TARGET = 'CITISTEK'
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>'

function App() {
  const [preloaderPhase, setPreloaderPhase] = useState<'show' | 'fade' | 'done'>('show')
  const [decodeState, setDecodeState] = useState<{ displayed: string[]; locked: boolean[] }>(() => ({
    displayed: TARGET.split('').map(() => CHARSET[Math.floor(Math.random() * CHARSET.length)]),
    locked: new Array(TARGET.length).fill(false),
  }))
  const startTimeRef = useRef<number>(Date.now())
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const totalDecodeMs = 1500
  const cycleIntervalMs = 95

  // Decode from both sides over 2s
  useEffect(() => {
    const len = TARGET.length
    const numWaves = Math.ceil(len / 2) // 4 waves
    const msPerWave = totalDecodeMs / numWaves
    const lockTimes = TARGET.split('').map((_, i) => {
      const wave = Math.min(i, len - 1 - i)
      return startTimeRef.current + (wave + 1) * msPerWave
    })

    intervalRef.current = setInterval(() => {
      setDecodeState((prev) => {
        const now = Date.now()
        const nextDisplayed = [...prev.displayed]
        const nextLocked = [...prev.locked]
        let allLocked = true

        for (let i = 0; i < TARGET.length; i++) {
          if (nextLocked[i]) {
            nextDisplayed[i] = TARGET[i]
          } else {
            allLocked = false
            if (now >= lockTimes[i]) {
              nextLocked[i] = true
              nextDisplayed[i] = TARGET[i]
            } else {
              nextDisplayed[i] = CHARSET[Math.floor(Math.random() * CHARSET.length)]
            }
          }
        }

        if (allLocked && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setTimeout(() => setPreloaderPhase('fade'), 200)
          setTimeout(() => setPreloaderPhase('done'), 450)
        }

        return { displayed: nextDisplayed, locked: nextLocked }
      })
    }, cycleIntervalMs)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <>
      {preloaderPhase !== 'done' && (
        <div
          className={`preloader ${preloaderPhase === 'fade' ? 'preloader--fade-out' : ''}`}
          aria-hidden="true"
        >
          <div className="preloader__inner">
            <span className="preloader__text" aria-label={TARGET}>
              {decodeState.displayed.map((char, i) => (
                <span
                  key={i}
                  className={decodeState.locked[i] ? 'preloader__char preloader__char--locked' : 'preloader__char'}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
        </div>
      )}
      <div
        className={`app-content ${preloaderPhase === 'show' ? 'app-content--hidden' : ''} ${preloaderPhase === 'fade' ? 'app-content--fade-in' : ''}`}
      >
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
          <HomePage key={preloaderPhase} />
        </ReactLenis>
      </div>
    </>
  )
}

export default App

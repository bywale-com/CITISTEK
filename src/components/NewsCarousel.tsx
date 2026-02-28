import { useEffect, useState } from 'react'

type NewsItem = {
  date: string
  title: string
  body: string
  mediaVariant: 'a' | 'b' | 'c'
}

const NEWS_ITEMS: NewsItem[] = [
  {
    date: 'Dec 2024',
    title: 'How Defense Technology Actually Gets Built',
    body:
      'Exploring the engineering and development process behind modern defense systems.',
    mediaVariant: 'a',
  },
  {
    date: 'Nov 2024',
    title: 'Advancing Autonomous Capabilities',
    body:
      'Latest developments in AI-powered autonomous systems for defense applications.',
    mediaVariant: 'b',
  },
  {
    date: 'Oct 2024',
    title: 'Partnership Announcements',
    body:
      'Strategic collaborations to accelerate defense technology innovation.',
    mediaVariant: 'c',
  },
]

const AUTO_ROTATE_MS = 8000

export const NewsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % NEWS_ITEMS.length)
    }, AUTO_ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  const active = NEWS_ITEMS[activeIndex]

  return (
    <div className="news-carousel">
      <article className="news-slide">
        <div className="news-slide-main">
          <div className="news-slide-meta">
            <span className="news-date">{active.date}</span>
            <span className="news-slide-progress">
              <span
                className="news-slide-progress-bar"
                key={activeIndex}
                style={{ animationDuration: `${AUTO_ROTATE_MS}ms` }}
              />
            </span>
          </div>
          <h3 className="news-slide-title">{active.title}</h3>
          <p className="news-slide-body">{active.body}</p>
          <a href="#" className="news-link">
            Read More →
          </a>
        </div>

        <div className={`news-slide-media news-slide-media--${active.mediaVariant}`} aria-hidden />
      </article>

      <div className="news-dots">
        {NEWS_ITEMS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`news-dot ${idx === activeIndex ? 'news-dot--active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Show update ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


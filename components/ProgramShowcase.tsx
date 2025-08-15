'use client'

import { useEffect, useRef, useState } from 'react'

type Img = { src: string; alt?: string }
export default function ProgramShowcase({ images }: { images: Img[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [idx, setIdx] = useState(0)

  // Animación al aparecer
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Handlers slider
  const go = (dir: -1 | 1) => {
    const next = (idx + dir + images.length) % images.length
    setIdx(next)
    const scroller = document.getElementById('program-scroller')
    if (!scroller) return
    const child = scroller.children[next] as HTMLElement
    child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section
      ref={containerRef}
      className={`relative rounded-3xl overflow-hidden border border-slate-200 bg-white/70 backdrop-blur
        transition-all duration-700 ease-out
        ${visible ? 'opacity-100 translate-y-0 shadow-lg' : 'opacity-0 translate-y-6'}`}
    >
      {/* Cinta de color sutil arriba */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-orange" />

      {/* Slider */}
      <div
        id="program-scroller"
        className="flex gap-4 p-4 md:p-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{ scrollSnapType: 'x mandatory' }}
        aria-label="Galería del programa"
      >
        {images.map((img, i) => (
          <figure
            key={i}
            className="min-w-[85%] md:min-w-[48%] lg:min-w-[40%] snap-center relative"
          >
            {/* Usamos <img> para evitar validaciones estrictas; si prefieres next/image, cámbialo */}
            <img
              src={img.src}
              alt={img.alt || 'Imagen del programa'}
              className="w-full h-[280px] md:h-[360px] object-cover rounded-2xl shadow-sm"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <figcaption className="mt-2 text-sm text-slate-600">{img.alt}</figcaption>
          </figure>
        ))}
      </div>

      {/* Controles */}
      <div className="absolute inset-y-0 left-0 flex items-center p-2">
        <button
          className="btn btn-outline rounded-full px-3 py-2"
          onClick={() => go(-1)}
          aria-label="Anterior"
        >
          ‹
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center p-2">
        <button
          className="btn btn-outline rounded-full px-3 py-2"
          onClick={() => go(1)}
          aria-label="Siguiente"
        >
          ›
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              idx === i ? 'bg-brand-purple scale-110' : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

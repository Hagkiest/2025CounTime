'use client'

import { useState, useEffect } from 'react'

interface ClickEffect {
  id: number
  x: number
  y: number
  opacity: number
}

export default function ClickEffect() {
  const [effects, setEffects] = useState<ClickEffect[]>([])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newEffect: ClickEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      }
      setEffects(prev => [...prev, newEffect])
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    if (effects.length > 0) {
      const timer = setInterval(() => {
        setEffects(prev => 
          prev.map(effect => ({
            ...effect,
            y: effect.y - 1,
            opacity: effect.opacity - 0.02
          })).filter(effect => effect.opacity > 0)
        )
      }, 20)

      return () => clearInterval(timer)
    }
  }, [effects])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {effects.map(effect => (
        <div
          key={effect.id}
          className="absolute text-white text-2xl font-bold"
          style={{
            left: effect.x,
            top: effect.y,
            opacity: effect.opacity,
            transform: `translate(-50%, -50%)`,
            textShadow: '0 0 5px rgba(255, 255, 255, 0.7)'
          }}
        >
          Happy!
        </div>
      ))}
    </div>
  )
}


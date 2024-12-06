'use client'

import { useEffect, useRef } from 'react'

class Particle {
  x: number
  y: number
  color: string
  velocityX: number
  velocityY: number
  alpha: number
  decay: number
  size: number

  constructor(x: number, y: number, color: string, size: number) {
    this.x = x
    this.y = y
    this.color = color
    this.velocityX = Math.random() * 8 - 4
    this.velocityY = Math.random() * 8 - 4
    this.alpha = 1
    this.decay = Math.random() * 0.015 + 0.005
    this.size = size
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }

  update() {
    this.x += this.velocityX
    this.y += this.velocityY
    this.alpha -= this.decay
    this.velocityY += 0.05 // Add gravity effect
  }
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles: Particle[] = []

    function createFirework(x: number, y: number) {
      const hue = Math.random() * 360
      const particleCount = 150 + Math.floor(Math.random() * 100)
      
      for (let i = 0; i < particleCount; i++) {
        const color = `hsl(${hue + Math.random() * 30}, 100%, ${50 + Math.random() * 20}%)`
        const size = Math.random() * 3 + 1
        particles.push(new Particle(x, y, color, size))
      }
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        if (particle.alpha <= 0) {
          particles.splice(index, 1)
        } else {
          particle.update()
          particle.draw(ctx)
        }
      })

      if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height * 0.5
        createFirework(x, y)
      }
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />
}


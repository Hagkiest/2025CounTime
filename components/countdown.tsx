'use client'

import { useState, useEffect } from 'react'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const target = new Date('2025-01-01T00:00:00')
      const difference = target.getTime() - now.getTime()

      const d = Math.floor(difference / (1000 * 60 * 60 * 24))
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const m = Math.floor((difference / 1000 / 60) % 60)
      const s = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="text-center z-10 relative">
      <h1 className="text-4xl font-bold mb-8 text-white">倒计时到2025年</h1>
      <div className="flex space-x-4 justify-center">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center">
            <div className="text-6xl font-bold text-white bg-gray-200 bg-opacity-20 rounded-lg p-4 mb-2 w-32">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xl text-white">{key}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


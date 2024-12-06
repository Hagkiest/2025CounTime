import Countdown from '../components/countdown'
import Fireworks from '../components/fireworks'
import ClickEffect from '../components/ClickEffect'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <Fireworks />
      <Countdown />
      <ClickEffect />
    </main>
  )
}


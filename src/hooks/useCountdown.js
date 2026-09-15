import { useEffect, useState } from 'react'

function splitRemaining(targetMs) {
  const diff = Math.max(0, targetMs - Date.now())

  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function useCountdown(targetDate) {
  const targetMs = new Date(targetDate).getTime()
  const [remaining, setRemaining] = useState(() => splitRemaining(targetMs))

  useEffect(() => {
    setRemaining(splitRemaining(targetMs))
    const id = setInterval(() => {
      setRemaining(splitRemaining(targetMs))
    }, 1000)

    return () => clearInterval(id)
  }, [targetMs])

  return remaining
}

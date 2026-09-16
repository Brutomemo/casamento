import { createContext, useContext, useEffect, useRef, useState } from 'react'

const AudioContext = createContext({
  isPlaying: false,
  toggleAudio: () => {},
})

const AUDIO_SRC = '/assets/soundtrack.mp3'
const TARGET_VOLUME = 0.35
const FADE_IN_DURATION = 1500 // ms
const FADE_OUT_DURATION = 800 // ms

export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  const fadeIntervalRef = useRef(null)

  useEffect(() => {
    // Instância única de HTMLAudioElement
    const audio = new Audio()
    audio.src = AUDIO_SRC
    audio.preload = 'none'
    audio.loop = true
    audio.volume = 0.0
    audioRef.current = audio

    const handleEnded = () => {
      setIsPlaying(false)
    }

    const handleError = () => {
      setIsPlaying(false)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current)
      }
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const clearFadeTimer = () => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }
  }

  const fadeIn = () => {
    clearFadeTimer()
    if (!audioRef.current) return

    audioRef.current.volume = 0.0
    const playPromise = audioRef.current.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          const steps = 30
          const stepTime = FADE_IN_DURATION / steps
          const volumeIncrement = TARGET_VOLUME / steps
          let currentStep = 0

          fadeIntervalRef.current = setInterval(() => {
            if (!audioRef.current) {
              clearFadeTimer()
              return
            }
            currentStep += 1
            const nextVol = Math.min(TARGET_VOLUME, currentStep * volumeIncrement)
            audioRef.current.volume = nextVol

            if (currentStep >= steps || nextVol >= TARGET_VOLUME) {
              audioRef.current.volume = TARGET_VOLUME
              clearFadeTimer()
            }
          }, stepTime)
        })
        .catch(() => {
          setIsPlaying(false)
        })
    }
  }

  const fadeOut = () => {
    clearFadeTimer()
    if (!audioRef.current) return

    const startVol = audioRef.current.volume
    const steps = 20
    const stepTime = FADE_OUT_DURATION / steps
    const volumeDecrement = startVol / steps
    let currentStep = 0

    fadeIntervalRef.current = setInterval(() => {
      if (!audioRef.current) {
        clearFadeTimer()
        return
      }
      currentStep += 1
      const nextVol = Math.max(0, startVol - currentStep * volumeDecrement)
      audioRef.current.volume = nextVol

      if (currentStep >= steps || nextVol <= 0) {
        audioRef.current.volume = 0
        audioRef.current.pause()
        setIsPlaying(false)
        clearFadeTimer()
      }
    }, stepTime)
  }

  const toggleAudio = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      fadeOut()
    } else {
      fadeIn()
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  return useContext(AudioContext)
}

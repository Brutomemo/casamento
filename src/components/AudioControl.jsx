import { useAudio } from '../context/AudioContext'

export default function AudioControl() {
  const { isPlaying, toggleAudio } = useAudio()

  return (
    <button
      type="button"
      className={`audio-control-btn ${isPlaying ? 'is-playing' : 'is-paused music-btn-idle'}`}
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Pausar música ambiente' : 'Iniciar música ambiente'}
      title={isPlaying ? 'Pausar música ambiente' : 'Iniciar música ambiente'}
    >
      <span className="audio-control-hitbox" aria-hidden="true" />
      <span className="sonar-wave sonar-wave-1" aria-hidden="true" />
      <span className="sonar-wave sonar-wave-2" aria-hidden="true" />
      <span className="audio-control-icon">
        {isPlaying ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path className="audio-wave wave-1" d="M11 5L6 9H2V15H6L11 19V5Z" />
            <path className="audio-wave wave-2" d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path className="audio-wave wave-3" d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5L6 9H2V15H6L11 19V5Z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </span>
    </button>
  )
}

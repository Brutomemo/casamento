export default function FloralDivider() {
  return (
    <div className="floral-divider" aria-hidden="true">
      <span className="floral-line" />
      <svg className="floral-icon" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="7.2" rx="4.6" ry="6.4" fill="#F2E0D8" />
        <ellipse cx="14" cy="20.8" rx="4.6" ry="6.4" fill="#C9B0B8" />
        <ellipse cx="7.2" cy="14" rx="6.4" ry="4.6" fill="#F2E0D8" />
        <ellipse cx="20.8" cy="14" rx="6.4" ry="4.6" fill="#C9B0B8" />
        <circle cx="14" cy="14" r="3.2" fill="#C9A96E" />
      </svg>
      <span className="floral-line" />
    </div>
  )
}

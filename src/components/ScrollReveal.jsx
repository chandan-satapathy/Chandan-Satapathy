import { useReveal } from '../utils/useReveal'

export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  )
}

import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6'

export function Footer() {
  return (
    <footer className="relative z-20 shrink-0 border-t border-line/70 bg-ink-950/95 px-4 py-2.5 backdrop-blur-md lg:px-6">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-sm text-content-primary">GameGate</span>
          <span className="text-content-faint">|</span>
          <span className="text-xs text-content-faint">Boletería Oficial LPF</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-400">LPF 2026</span>
          <a href="#" aria-label="Facebook" className="text-content-faint transition-colors hover:text-brand-400">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="text-content-faint transition-colors hover:text-brand-400">
            <FaInstagram />
          </a>
          <a href="#" aria-label="X" className="text-content-faint transition-colors hover:text-brand-400">
            <FaXTwitter />
          </a>
          <a href="#" aria-label="YouTube" className="text-content-faint transition-colors hover:text-brand-400">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  )
}

import { useState } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { Footer } from './Footer'

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const outlet = useOutlet()

  return (
    <div className="flex h-dvh overflow-hidden">
      <aside className="hidden h-screen shrink-0 lg:block">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="drawer-overlay"
              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="drawer-panel"
              className="fixed inset-y-0 left-0 z-40 lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <Sidebar onNavigate={() => setMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setMenuOpen(true)} />
        <main className="scrollbar-slim flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mx-auto w-full max-w-[1600px] px-3 py-2 lg:px-6 lg:py-3"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  )
}

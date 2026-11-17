import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface UIContextValue {
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  toast: (message: string) => void
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState<{ text: string; id: number } | null>(null)
  const toastTimer = useRef<number>()

  const toast = useCallback((text: string) => {
    window.clearTimeout(toastTimer.current)
    setToastMsg({ text, id: Date.now() })
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 3200)
  }, [])

  const value = useMemo<UIContextValue>(
    () => ({
      searchOpen,
      setSearchOpen,
      toast,
    }),
    [searchOpen, toast],
  )

  return (
    <UIContext.Provider value={value}>
      {children}
      <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-0 z-[95] flex justify-center px-4 pb-[max(20px,env(safe-area-inset-bottom,0px))]">
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              key={toastMsg.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              className="pointer-events-auto flex max-w-md items-center gap-2.5 rounded-2xl bg-ink px-4 py-3 text-[0.95rem] text-white shadow-panel"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" aria-hidden />
              <span>{toastMsg.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UIContext.Provider>
  )
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used inside <UIProvider>')
  return ctx
}

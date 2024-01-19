import 'react-modern-drawer/dist/index.css'

import { useEffect, useState } from 'react'
import ModernDrawer from 'react-modern-drawer'

export type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const [mounted, setMounted] = useState(isOpen)
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      setTimeout(() => setOpenDrawer(true), 0)
    } else {
      setOpenDrawer(false)
      setTimeout(() => setMounted(false), 300)
    }
  }, [isOpen])

  if (!mounted) {
    return null
  }

  return (
    <ModernDrawer
      open={openDrawer}
      onClose={onClose}
      direction="right"
      enableOverlay={false}
      duration={300}
      size="424px"
    >
      {children}
    </ModernDrawer>
  )
}

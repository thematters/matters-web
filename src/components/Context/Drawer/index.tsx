import { createContext, ReactNode, useContext, useState } from 'react'

interface DrawerContextProps {
  hasOpeningDrawer: boolean
  setHasOpeningDrawer: (hasOpeningDrawer: boolean) => void
}

const DrawerContext = createContext<DrawerContextProps>(
  {} as DrawerContextProps
)

export const useDrawerContext = (): DrawerContextProps => {
  const context = useContext(DrawerContext)
  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider')
  }
  return context
}

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [hasOpeningDrawer, setHasOpeningDrawer] = useState(false)

  return (
    <DrawerContext.Provider value={{ hasOpeningDrawer, setHasOpeningDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

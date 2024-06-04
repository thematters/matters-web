import { createContext, ReactNode, useContext, useState } from 'react'

interface DrawerContextProps {
  hasOpenDrawer: boolean
  setHasOpenDrawer: (hasOpenDrawer: boolean) => void
}

const DrawerContext = createContext<DrawerContextProps>(
  {} as DrawerContextProps
)

export const useDrawerContext = (): DrawerContextProps => {
  const context = useContext(DrawerContext)
  return context
}

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [hasOpenDrawer, setHasOpenDrawer] = useState(false)

  return (
    <DrawerContext.Provider value={{ hasOpenDrawer, setHasOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}

import { useState } from 'react'

interface DialogLazyProps {
  children: ({
    open,
    mounted
  }: {
    open: () => void
    mounted: boolean
  }) => React.ReactChild | React.ReactChild[] | React.ReactNode
}

const DialogLazy = ({ children }: DialogLazyProps) => {
  const [mounted, setMounted] = useState(false)
  const mount = () => setMounted(true)

  return <>{children({ open: mount, mounted })}</>
}

export default DialogLazy

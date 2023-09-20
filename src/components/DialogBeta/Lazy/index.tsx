import { useState } from 'react'

interface DialogLazyProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  mounted: React.ReactNode
}

const DialogLazy = ({
  children,
  mounted: mountedChildren,
}: DialogLazyProps) => {
  const [mounted, setMounted] = useState(false)
  const mount = () => setMounted(true)

  if (mounted) {
    return <>{mountedChildren}</>
  }

  return <>{children({ openDialog: mount })}</>
}

export default DialogLazy

import { useState } from 'react'

/**
 * Open / close switch for dialogs.
 *
 * Usage:
 *
 * ```tsx
 *   const { showDialog, setShowDialog, open, close } = useDialogSwitch<boolean>(false)
 * ```
 */
export const useDialogSwitch = (value: boolean) => {
  const [show, setShow] = useState<boolean>(value)

  const open = () => setShow(true)

  const close = () => setShow(false)

  return { show, setShow, open, close }
}

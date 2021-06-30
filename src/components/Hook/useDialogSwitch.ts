import { useState } from 'react'

/**
 * Open / close switch for dialogs.
 *
 * Usage:
 *
 * ```tsx
 *   const { show, setShow, openDialog, closeDialog } = useDialogSwitch<boolean>(false)
 * ```
 */
export const useDialogSwitch = (value: boolean) => {
  const [show, setShow] = useState<boolean>(value)

  const openDialog = () => setShow(true)

  const closeDialog = () => setShow(false)

  return { show, setShow, openDialog, closeDialog }
}

import VisuallyHidden from '@reach/visually-hidden'
import { forwardRef, useState } from 'react'

import {
  Dialog,
  DialogOverlayProps,
  DialogProps,
  Dropdown,
  PopperInstance,
  PopperProps,
  Translate,
  useResponsive
} from '~/components'

import { KEYCODES, TEXT } from '~/common/enums'

/**
 * This is a responsive component which will show
 * <Dropdown> for desktop and <Dialog> (drawer) for mobile
 *
 * Usage:
 *
 * ```tsx
 *   <DropdownDialog
 *     dropdown={{
 *       content: <DropdownContent />,
 *       ...
 *     }}
 *     dialog={{
 *       content: <DialogContent />,
 *       title: ....,
 *       headerHidden: false
 *     }}
 *   >
 *     <Button>
 *       ...
 *     </Button>
 *   </DropdownDialog>
 * ```
 */

type DropdownDialogNode = ({
  open,
  close,
  ref
}: {
  open: () => void
  close: () => void
  ref?: React.Ref<any>
}) => React.ReactChild | React.ReactChild[]

interface DropdownDialogChildren {
  children: DropdownDialogNode
}

type DropdownDialogProps = {
  dropdown: Omit<PopperProps, 'children'>
  dialog: Omit<DialogProps, keyof DialogOverlayProps> & {
    content: React.ReactNode
    title: string | React.ReactNode
  }
} & DropdownDialogChildren

type ForwardChildrenProps = {
  open: () => void
  close: () => void
} & DropdownDialogChildren

const ForwardChildren = forwardRef(
  ({ open, close, children }: ForwardChildrenProps, ref) => (
    <>{children({ open, close, ref })}</>
  )
)

export const DropdownDialog = ({
  dropdown,
  dialog,
  children
}: DropdownDialogProps) => {
  const isSmallUp = useResponsive('sm-up')
  const [
    dropdownInstance,
    setDropdownInstance
  ] = useState<PopperInstance | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => {
    // dropdown
    if (dropdownInstance) {
      dropdownInstance.hide()
    }

    // dialog
    setShowDialog(false)
  }
  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target?.closest && target.closest('[data-clickable], a, button')) {
      close()
    }
    event.stopPropagation()
  }

  const Content: React.FC = ({ children: contentChildren }) => {
    return (
      <section
        onKeyDown={event => {
          if (event.keyCode !== KEYCODES.enter) {
            return
          }
          closeOnClick(event)
        }}
        onClick={closeOnClick}
      >
        <VisuallyHidden>
          <button
            type="button"
            aria-label={TEXT.zh_hant.close}
            onClick={close}
          />
        </VisuallyHidden>

        {contentChildren}
      </section>
    )
  }

  /**
   * Desktop: <Dropdown>
   */
  if (isSmallUp) {
    return (
      <Dropdown
        {...dropdown}
        content={<Content>{dropdown.content}</Content>}
        onCreate={setDropdownInstance}
      >
        <ForwardChildren open={open} close={close} children={children} />
      </Dropdown>
    )
  }

  /**
   * Mobile: <Dialog>
   */
  return (
    <>
      {children({ open, close })}

      <Dialog isOpen={showDialog} onDismiss={close} {...dialog}>
        <Dialog.Header title={dialog.title} close={close} headerHidden />

        <Content>{dialog.content}</Content>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={close}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

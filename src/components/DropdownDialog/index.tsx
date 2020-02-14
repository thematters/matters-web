import VisuallyHidden from '@reach/visually-hidden'
import { forwardRef, useState } from 'react'
import FocusLock, { AutoFocusInside } from 'react-focus-lock'

import {
  Dialog,
  DialogOverlayProps,
  DialogProps,
  Dropdown,
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
 *       trigger: 'mouseenter focus click',
 *       ...
 *     }}
 *     dialog={{
 *       content: <DialogContent />,
 *       title: ....,
 *       showHeader: false
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
  const isSmallUp = useResponsive({ type: 'sm-up' })()
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)
  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement

    if (target?.closest && target.closest('[data-clickable], a, button')) {
      close()
    }
  }

  const Content: React.FC = ({ children: contentChildren }) => {
    return (
      <FocusLock>
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
            <AutoFocusInside>
              <button
                type="button"
                aria-label={TEXT.zh_hant.close}
                onClick={close}
              />
            </AutoFocusInside>
          </VisuallyHidden>

          {contentChildren}
        </section>
      </FocusLock>
    )
  }

  /**
   * Desktop: <Dropdown>
   */
  if (isSmallUp) {
    return (
      <Dropdown {...dropdown} content={<Content>{dropdown.content}</Content>}>
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
        <Content>
          {dialog.content}

          <Dialog.Footer>
            <Dialog.Footer.Button
              bgColor="grey-lighter"
              textColor="black"
              onClick={close}
            >
              <Translate
                zh_hant={TEXT.zh_hant.close}
                zh_hans={TEXT.zh_hans.close}
              />
            </Dialog.Footer.Button>
          </Dialog.Footer>
        </Content>
      </Dialog>
    </>
  )
}

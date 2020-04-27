import VisuallyHidden from '@reach/visually-hidden'
import { forwardRef, useState } from 'react'

import {
  Button,
  Dialog,
  DialogOverlayProps,
  DialogProps,
  Dropdown,
  PopperProps,
  Translate,
  useResponsive,
} from '~/components'

import { KEYCODES, TEXT, TextId } from '~/common/enums'

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
 *       mode: 'hidden'
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
  ref,
}: {
  open: () => void
  ref?: React.Ref<any>
}) => React.ReactChild | React.ReactChild[]

interface DropdownDialogChildren {
  children: DropdownDialogNode
}

type DropdownDialogProps = {
  dropdown: Omit<PopperProps, 'children'>
  dialog: Omit<DialogProps, keyof DialogOverlayProps> & {
    content: React.ReactNode
    title: React.ReactElement | TextId
  }
} & DropdownDialogChildren

type ForwardChildrenProps = {
  open: () => void
} & DropdownDialogChildren

const ForwardChildren = forwardRef(
  ({ open, children }: ForwardChildrenProps, ref) => (
    <>{children({ open, ref })}</>
  )
)

const BaseDropdownDialog = ({
  dropdown,
  dialog,
  children,
}: DropdownDialogProps) => {
  const isSmallUp = useResponsive('sm-up')
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)
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
        onKeyDown={(event) => {
          if (event.keyCode !== KEYCODES.enter) {
            return
          }
          closeOnClick(event)
        }}
        onClick={closeOnClick}
      >
        <VisuallyHidden>
          <Button aria-label={TEXT.zh_hant.close} onClick={close} />
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
        onHidden={close}
        visible={showDialog}
      >
        <ForwardChildren open={open} children={children} />
      </Dropdown>
    )
  }

  /**
   * Mobile: <Dialog>
   */
  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} {...dialog} slideIn>
        <Dialog.Header
          title={dialog.title}
          close={close}
          closeTextId="close"
          mode="hidden"
        />

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

export const DropdownDialog: React.FC<DropdownDialogProps> = (props) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseDropdownDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

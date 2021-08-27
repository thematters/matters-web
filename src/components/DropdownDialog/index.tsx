import VisuallyHidden from '@reach/visually-hidden'
import { forwardRef } from 'react'
import FocusLock from 'react-focus-lock'

import {
  Button,
  Dialog,
  DialogOverlayProps,
  DialogProps,
  Dropdown,
  PopperProps,
  Translate,
  useDialogSwitch,
  useResponsive,
} from '~/components'

import { KEYCODES, TEXT, TextId, Z_INDEX } from '~/common/enums'

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
  openDialog,
  ref,
}: {
  openDialog: () => void
  ref?: React.Ref<any>
}) => React.ReactChild | React.ReactChild[]

interface DropdownDialogChildren {
  children: DropdownDialogNode
}

type DropdownDialogProps = {
  dropdown: Omit<PopperProps, 'children'>
  dialog: Omit<DialogProps, keyof DialogOverlayProps> & {
    content: React.ReactNode
    title: TextId | React.ReactNode
  }
} & DropdownDialogChildren

type ForwardChildrenProps = {
  openDialog: () => void
} & DropdownDialogChildren

const ForwardChildren = forwardRef(
  ({ openDialog, children }: ForwardChildrenProps, ref) => (
    <>{children({ openDialog, ref })}</>
  )
)

const BaseDropdownDialog = ({
  dropdown,
  dialog,
  children,
}: DropdownDialogProps) => {
  const isSmallUp = useResponsive('sm-up')
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const toggle = () => (show ? closeDialog() : openDialog())
  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target?.closest && target.closest('[data-clickable], a, button')) {
      closeDialog()
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
          <Button aria-label={TEXT.zh_hant.close} onClick={closeDialog} />
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
        trigger={undefined}
        onHidden={closeDialog}
        onClickOutside={closeDialog}
        visible={show}
        zIndex={Z_INDEX.OVER_BOTTOM_BAR}
        appendTo={process.browser ? document.body : undefined}
        {...dropdown}
        content={
          <FocusLock>
            <Content>{dropdown.content}</Content>
          </FocusLock>
        }
      >
        <ForwardChildren openDialog={toggle} children={children} />
      </Dropdown>
    )
  }

  /**
   * Mobile: <Dialog>
   */
  return (
    <>
      {children({ openDialog: toggle })}

      <Dialog isOpen={show} onDismiss={closeDialog} {...dialog} slideIn>
        <Dialog.Header
          title={dialog.title}
          closeDialog={closeDialog}
          closeTextId="close"
          mode="hidden"
        />

        <Content>{dialog.content}</Content>

        <Dialog.Footer>
          <Dialog.Footer.Button
            bgColor="grey-lighter"
            textColor="black"
            onClick={closeDialog}
          >
            <Translate id="close" />
          </Dialog.Footer.Button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}

export const DropdownDialog: React.FC<DropdownDialogProps> = (props) => (
  <Dialog.Lazy mounted={<BaseDropdownDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

import dynamic from 'next/dynamic'

import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Lazy from './Lazy'
import Message from './Message'

/**
 * This is a responsive component which will show
 * Modal for desktop and Drawer for mobile
 *
 * @see {@url https://reacttraining.com/reach-ui/dialog}
 *
 * Usage:
 *
 * ```tsx
 * <Dialog>
 *   <Dialog.Header title={title} close={close} />
 *
 *   <Dialog.Content isOpen={showDialog} onDismiss={close}>
 *      ...
 *   </Dialog.Content>
 *
 *   <Dialog.Footer>
 *     <Dialog.Footer.Button />
 *     <Dialog.Footer.Button />
 *   </Dialog.Footer>
 * </Dialog>
 * ```
 */
export type DialogOverlayProps = import('./Dialog').DialogOverlayProps
export type DialogProps = import('./Dialog').DialogProps

type DynamicDialogProps = React.ComponentType<DialogProps> & {
  Header: typeof Header
  Content: typeof Content
  Footer: typeof Footer
  Message: typeof Message
  Lazy: typeof Lazy
}

const DynamicDialog = dynamic(() => import('./Dialog'), {
  ssr: false,
}) as DynamicDialogProps

DynamicDialog.Header = Header
DynamicDialog.Content = Content
DynamicDialog.Footer = Footer
DynamicDialog.Message = Message
DynamicDialog.Lazy = Lazy

export const Dialog = DynamicDialog

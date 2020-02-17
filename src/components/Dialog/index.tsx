import dynamic from 'next/dynamic'

import Content from './Content'
import Footer from './Footer'
import Header from './Header'
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
export type DialogOverlayProps = import('./Main').DialogOverlayProps
export type DialogProps = import('./Main').DialogProps

type DynamicDialogProps = React.ComponentType<DialogProps> & {
  Header: typeof Header
  Content: typeof Content
  Footer: typeof Footer
  Message: typeof Message
}

export const Dialog = dynamic(() => import('./Main'), {
  ssr: false
}) as DynamicDialogProps

Dialog.Header = Header
Dialog.Content = Content
Dialog.Footer = Footer
Dialog.Message = Message

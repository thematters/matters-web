import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

interface NewsletterDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseNewsletterDialog = ({ children }: NewsletterDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Content closeDialog={close} />
      </Dialog>
    </>
  )
}

export const NewsletterDialog = (props: NewsletterDialogProps) => (
  <Dialog.Lazy mounted={<BaseNewsletterDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

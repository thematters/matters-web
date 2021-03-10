import { Dialog, useDialogSwitch } from '~/components'

import Content from './Content'

interface NewsletterDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseNewsletterDialog = ({ children }: NewsletterDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
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

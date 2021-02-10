import { Dialog, useDialogSwitch } from '~/components'

import PublishContent from './PublishContent'

interface PublishDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const PublishDialog = ({ children }: PublishDialogProps) => {
  const { show, open, close } = useDialogSwitch(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
        <PublishContent closeDialog={close} />
      </Dialog>
    </>
  )
}

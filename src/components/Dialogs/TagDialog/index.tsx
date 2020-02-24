import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

interface TagDialogProps {
  id?: string
  content?: string
  description?: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const TagDialog = ({
  children,
  content,
  ...restProps
}: TagDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Content closeDialog={close} content={content} {...restProps} />
      </Dialog>
    </>
  )
}

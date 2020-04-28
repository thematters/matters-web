import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

interface TagDialogProps {
  id?: string
  content?: string
  description?: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseTagDialog = ({ children, content, ...restProps }: TagDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
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

export const TagDialog = (props: TagDialogProps) => (
  <Dialog.Lazy mounted={<BaseTagDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

interface TagArticleDialogProps {
  id?: string
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const TagArticleDialog = ({ id, children }: TagArticleDialogProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close}>
        <Content close={close} id={id} />
      </Dialog>
    </>
  )
}

export default TagArticleDialog

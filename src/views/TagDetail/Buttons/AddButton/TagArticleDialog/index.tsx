import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

interface TagArticleDialogProps {
  id?: string
  children: ({ open }: { open: () => void }) => React.ReactNode
  forSelected?: boolean
}

const TagArticleDialog = ({
  id,
  children,
  forSelected,
}: TagArticleDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Content closeDialog={close} id={id} forSelected={forSelected} />
      </Dialog>
    </>
  )
}

const LazyTagArticleDialog = (props: TagArticleDialogProps) => (
  <Dialog.Lazy mounted={<TagArticleDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default LazyTagArticleDialog

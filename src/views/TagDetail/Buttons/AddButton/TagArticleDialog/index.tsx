import { useState } from 'react'

import { Dialog } from '~/components'

import Content from './Content'

import { TagDetail_node_Tag } from '../../../__generated__/TagDetail'

interface TagArticleDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
  forSelected?: boolean
  tag: TagDetail_node_Tag
}

const TagArticleDialog = ({
  children,
  forSelected,
  tag,
}: TagArticleDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Content closeDialog={close} tag={tag} forSelected={forSelected} />
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

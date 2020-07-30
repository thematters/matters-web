import { useState } from 'react'

import { Dialog } from '~/components'

import Content, { TagDialogContentProps } from './Content'

export type TagDialogProps = TagDialogContentProps

type BaseTagDialogProps = {
  children: ({ open }: { open: () => void }) => React.ReactNode
} & TagDialogProps

const BaseTagDialog = ({
  children,
  content,
  ...restProps
}: BaseTagDialogProps) => {
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

export const TagDialog = (props: BaseTagDialogProps) => (
  <Dialog.Lazy mounted={<BaseTagDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

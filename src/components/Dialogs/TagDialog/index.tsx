import { Dialog, useDialogSwitch } from '~/components'

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
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open })}

      <Dialog isOpen={show} onDismiss={close} fixedHeight>
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

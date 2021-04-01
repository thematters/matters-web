import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { TagDialogContentProps } from './Content'

export type TagDialogProps = TagDialogContentProps

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

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
        <DynamicContent closeDialog={close} content={content} {...restProps} />
      </Dialog>
    </>
  )
}

export const TagDialog = (props: BaseTagDialogProps) => (
  <Dialog.Lazy mounted={<BaseTagDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

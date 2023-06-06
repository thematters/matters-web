import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { TagDialogContentProps } from './Content'

export type TagDialogProps = TagDialogContentProps

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

type BaseTagDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & TagDialogProps

const BaseTagDialog = ({
  children,
  content,
  ...restProps
}: BaseTagDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog} smBgColor="greyLighter">
        <DynamicContent
          closeDialog={closeDialog}
          content={content}
          {...restProps}
        />
      </Dialog>
    </>
  )
}

export const TagDialog = (props: BaseTagDialogProps) => (
  <Dialog.Lazy mounted={<BaseTagDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

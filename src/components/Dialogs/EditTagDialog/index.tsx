import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { EditTagDialogContentProps } from './Content'

export type EditTagDialogProps = EditTagDialogContentProps

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: () => <Spinner />,
})

type BaseEditTagDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & EditTagDialogProps

const BaseEditTagDialog = ({
  children,
  content,
  ...restProps
}: BaseEditTagDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          closeDialog={closeDialog}
          content={content}
          {...restProps}
        />
      </Dialog>
    </>
  )
}

export const EditTagDialog = (props: BaseEditTagDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditTagDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

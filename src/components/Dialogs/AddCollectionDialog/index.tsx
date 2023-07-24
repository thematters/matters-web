import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

interface AddCollectionDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  gotoDetailPage?: boolean
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseAddCollectionDialog = ({
  children,
  gotoDetailPage,
}: AddCollectionDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          closeDialog={closeDialog}
          gotoDetailPage={gotoDetailPage}
        />
      </Dialog>
    </>
  )
}

export const AddCollectionDialog = (props: AddCollectionDialogProps) => (
  <Dialog.Lazy mounted={<BaseAddCollectionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

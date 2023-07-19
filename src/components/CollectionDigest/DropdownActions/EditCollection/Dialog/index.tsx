import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'
import { EditCollectionCollectionFragment } from '~/gql/graphql'

interface EditCollectionDialogProps {
  collection: EditCollectionCollectionFragment
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), { loading: Spinner })

const BaseEditCollectionDialog = ({
  collection,
  children,
}: EditCollectionDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent collection={collection} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

const LazyEditCollectionDialog = (props: EditCollectionDialogProps) => (
  <Dialog.Lazy mounted={<BaseEditCollectionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default LazyEditCollectionDialog

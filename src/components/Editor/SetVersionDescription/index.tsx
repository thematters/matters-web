import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

export interface SetVersionDescriptionDialogProps {
  description: string
  editDescription: (description: string) => any
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseSetVersionDescriptionDialog = ({
  children,
  description,
  editDescription,
}: SetVersionDescriptionDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          closeDialog={closeDialog}
          description={description}
          editDescription={editDescription}
        />
      </Dialog>
    </>
  )
}

const SetVersionDescriptionDialog = (
  props: SetVersionDescriptionDialogProps
) => (
  <Dialog.Lazy mounted={<BaseSetVersionDescriptionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SetVersionDescriptionDialog

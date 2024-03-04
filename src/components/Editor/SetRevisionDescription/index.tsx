import _pickBy from 'lodash/pickBy'
import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

export interface SetRevisionDescriptionDialogProps {
  description: string
  editDescription: (description: string) => any
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <Spinner />,
})

const BaseSetRevisionDescriptionDialog = ({
  children,
  description,
  editDescription,
}: SetRevisionDescriptionDialogProps) => {
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

const SetRevisionDescriptionDialog = (
  props: SetRevisionDescriptionDialogProps
) => (
  <Dialog.Lazy mounted={<BaseSetRevisionDescriptionDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default SetRevisionDescriptionDialog

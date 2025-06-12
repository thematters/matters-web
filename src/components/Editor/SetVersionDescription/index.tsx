import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

export interface SetVersionDescriptionDialogProps {
  description: string
  editDescription: (description: string) => void
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
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

      <Dialog
        isOpen={show}
        onDismiss={closeDialog}
        dismissOnClickOutside={false}
        dismissOnESC={false}
      >
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

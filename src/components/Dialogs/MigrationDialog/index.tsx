import { Dialog, useDialogSwitch, useStep } from '~/components'

import styles from './styles.module.css'
import Success from './Success'
import Upload from './Upload'

type Step = 'upload' | 'success'

interface MigrationDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  defaultStep?: Step
}

const BaseMigrationDialog = ({
  children,
  defaultStep = 'upload',
}: MigrationDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const { currStep, forward } = useStep<Step>(defaultStep)
  const nextStep = () => forward('success')

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title="migration"
          closeDialog={closeDialog}
          closeTextId={currStep === 'success' ? 'close' : 'cancel'}
        />
        {currStep === 'upload' && <Upload nextStep={nextStep} />}
        {currStep === 'success' && <Success />}
      </Dialog>
    </>
  )
}

export const MigrationDialog = (props: MigrationDialogProps) => (
  <Dialog.Lazy mounted={<BaseMigrationDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch, useStep } from '~/components'

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

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Settled in Matters" id="VBve8d" />
          }
          closeText={currStep === 'success' ? 'close' : 'cancel'}
        />
        {currStep === 'upload' && (
          <Upload nextStep={nextStep} closeDialog={closeDialog} />
        )}
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

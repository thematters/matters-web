import { Dialog, useDialogSwitch, useStep } from '~/components'

import styles from './styles.css'
import Success from './Success'
import Upload from './Upload'

type Step = 'upload' | 'success'

interface MigrationDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
  defaultStep?: Step
}

const BaseMigrationDialog = ({
  children,
  defaultStep = 'upload',
}: MigrationDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  const { currStep, forward } = useStep<Step>(defaultStep)
  const nextStep = () => forward('success')

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="migration"
          close={close}
          closeTextId={currStep === 'success' ? 'close' : 'cancel'}
        />
        {currStep === 'upload' && <Upload nextStep={nextStep} />}
        {currStep === 'success' && <Success />}
      </Dialog>
      <style jsx>{styles}</style>
    </>
  )
}

export const MigrationDialog = (props: MigrationDialogProps) => (
  <Dialog.Lazy mounted={<BaseMigrationDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

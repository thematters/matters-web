import { useState } from 'react'

import { Dialog } from '~/components'

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
  const [showDialog, setShowDialog] = useState(true)
  const [step, setStep] = useState<Step>(defaultStep)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)
  const nextStep = () => setStep('success')

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="migration"
          close={close}
          closeTextId={step === 'success' ? 'close' : 'cancel'}
        />
        {step === 'upload' && <Upload nextStep={nextStep} />}
        {step === 'success' && <Success />}
      </Dialog>
      <style jsx>{styles}</style>
    </>
  )
}

export const MigrationDialog = (props: MigrationDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseMigrationDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

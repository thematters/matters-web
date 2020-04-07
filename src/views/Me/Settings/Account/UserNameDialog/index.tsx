import { useState } from 'react'

import { Dialog } from '~/components'

import Ask from './Ask'
import Complete from './Complete'
import Confirm from './Confirm'

type Step = 'ask' | 'confirm' | 'complete'

interface UserNameDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseUserNameDialog = ({ children }: UserNameDialogProps) => {
  const [step, setStep] = useState<Step>('ask')
  const [showDialog, setShowDialog] = useState(true)

  const open = () => {
    setStep('ask')
    setShowDialog(true)
  }
  const close = () => {
    setShowDialog(false)
  }

  return (
    <>
      {children({ open })}

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        size={step === 'ask' || step === 'complete' ? 'sm' : 'lg'}
        fixedHeight={step === 'confirm'}
        slideIn={step === 'ask'}
      >
        {step === 'ask' && (
          <Ask nextStep={() => setStep('confirm')} closeDialog={close} />
        )}

        {step === 'confirm' && (
          <Confirm
            submitCallback={() => setStep('complete')}
            closeDialog={close}
          />
        )}

        {step === 'complete' && <Complete closeDialog={close} />}
      </Dialog>
    </>
  )
}

export const UserNameDialog = (props: UserNameDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseUserNameDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

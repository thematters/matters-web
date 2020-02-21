import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import Ask from './Ask'
import Complete from './Complete'
import Confirm from './Confirm'

type Step = 'ask' | 'confirm' | 'complete'

interface UserNameDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

export const UserNameDialog = ({ children }: UserNameDialogProps) => {
  const [step, setStep] = useState<Step>('ask')
  const [showDialog, setShowDialog] = useState(false)

  const open = () => {
    setStep('ask')
    setShowDialog(true)
  }
  const close = () => {
    setShowDialog(false)
  }

  const headerHidden = step === 'ask' || step === 'complete'
  const title = (
    <Translate
      zh_hant={TEXT.zh_hant.changeUserName}
      zh_hans={TEXT.zh_hans.changeUserName}
    />
  )

  return (
    <>
      {children({ open })}

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        size={headerHidden ? 'sm' : 'lg'}
      >
        {step === 'ask' && (
          <Ask
            title={title}
            nextStep={() => setStep('confirm')}
            close={close}
          />
        )}

        {step === 'confirm' && (
          <Confirm submitCallback={() => setStep('complete')} />
        )}

        {step === 'complete' && <Complete title={title} close={close} />}
      </Dialog>
    </>
  )
}

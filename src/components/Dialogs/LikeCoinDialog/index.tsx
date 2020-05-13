import { useState } from 'react'

import { Dialog, SetupLikeCoin, useEventListener } from '~/components'

import { OPEN_LIKE_COIN_DIALOG } from '~/common/enums'

import LikeCoinTerm from './LikeCoinTerm'

interface LikeCoinDialogProps {
  allowEventTrigger?: boolean
  defaultStep?: Step
  defaultShowDialog?: boolean
  children?: ({ open }: { open: () => void }) => React.ReactNode
}

type Step = 'term' | 'setup'

export const LikeCoinDialog: React.FC<LikeCoinDialogProps> = ({
  allowEventTrigger = false,
  defaultStep = 'term',
  defaultShowDialog = false,

  children,
}) => {
  const [step, setStep] = useState<Step>(defaultStep)
  const nextStep = () => setStep('setup')
  const [showDialog, setShowDialog] = useState(defaultShowDialog)
  const open = () => {
    setStep('term')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  useEventListener(OPEN_LIKE_COIN_DIALOG, () => {
    if (allowEventTrigger) {
      open()
    }
  })

  return (
    <>
      {children && children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close}>
        {step === 'term' && (
          <LikeCoinTerm nextStep={nextStep} closeDialog={close} />
        )}

        {step === 'setup' && (
          <SetupLikeCoin
            purpose="dialog"
            submitCallback={close}
            closeDialog={close}
          />
        )}
      </Dialog>
    </>
  )
}

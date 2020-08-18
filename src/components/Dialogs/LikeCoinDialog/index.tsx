import { useState } from 'react'

import { Dialog, SetupLikeCoin, useEventListener, useStep } from '~/components'

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
  const { currStep, goForward } = useStep<Step>(defaultStep)
  const nextStep = () => goForward('setup')
  const [showDialog, setShowDialog] = useState(defaultShowDialog)
  const open = () => {
    goForward('term')
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
        {currStep === 'term' && (
          <LikeCoinTerm nextStep={nextStep} closeDialog={close} />
        )}

        {currStep === 'setup' && (
          <SetupLikeCoin purpose="dialog" closeDialog={close} />
        )}
      </Dialog>
    </>
  )
}

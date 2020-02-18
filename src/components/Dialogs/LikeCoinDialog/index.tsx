import { useState } from 'react'

import { Dialog, SetupLikeCoin, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import LikeCoinTerm from './LikeCoinTerm'

interface LikeCoinDialogProps {
  defaultStep?: Step
  defaultShowDialog?: boolean
  children?: ({ open }: { open: () => void }) => React.ReactNode
}

type Step = 'term' | 'setup'

export const LikeCoinDialog: React.FC<LikeCoinDialogProps> = ({
  defaultStep = 'term',
  defaultShowDialog = false,

  children
}) => {
  const [step, setStep] = useState<Step>(defaultStep)
  const nextStep = () => setStep('setup')
  const [showDialog, setShowDialog] = useState(defaultShowDialog)
  const open = () => {
    setStep('term')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  const Title =
    step === 'term' ? (
      <Translate
        zh_hant="Matters 與 LikeCoin 合作了！"
        zh_hans="Matters 与 LikeCoin 合作了！"
      />
    ) : (
      <Translate
        zh_hant={TEXT.zh_hant.setupLikeCoin}
        zh_hans={TEXT.zh_hans.setupLikeCoin}
      />
    )

  return (
    <>
      {children && children({ open })}

      <Dialog title={Title} isOpen={showDialog} onDismiss={close}>
        {step === 'term' && <LikeCoinTerm nextStep={nextStep} />}
        {step === 'setup' && <SetupLikeCoin submitCallback={close} />}
      </Dialog>
    </>
  )
}

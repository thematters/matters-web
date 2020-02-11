import { useState } from 'react'

import { Dialog, Translate } from '~/components'
import SetupLikeCoin from '~/components/SetupLikeCoin'

import { TEXT } from '~/common/enums'

import LikeCoinTerm from './LikeCoinTerm'

interface SetupLikeCoinDialogProps {
  defaultStep?: Step
}

type Step = 'term' | 'setup'

const SetupLikeCoinDialog: React.FC<SetupLikeCoinDialogProps> = ({
  defaultStep = 'setup'
}) => {
  const [showDialog, setShowDialog] = useState(true)
  const [step, setStep] = useState<Step>(defaultStep)
  const nextStep = () => setStep('setup')
  const close = () => setShowDialog(false)

  const title =
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
    <Dialog title={title} isOpen={showDialog} onDismiss={close}>
      <>
        {step === 'term' && <LikeCoinTerm nextStep={nextStep} />}
        {step === 'setup' && <SetupLikeCoin submitCallback={close} />}
      </>
    </Dialog>
  )
}

export default SetupLikeCoinDialog

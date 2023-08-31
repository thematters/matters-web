import _pickBy from 'lodash/pickBy'
import React, { useState } from 'react'

import ConfirmStep from './ConfirmStep'
import InputStep from './InputStep'

interface FormProps {
  closeDialog: () => void
}

type Step = 'input' | 'confirm'

const SetUserNameDialogContent: React.FC<FormProps> = ({ closeDialog }) => {
  const [step, setStep] = useState<Step>('input')
  const isInput = step === 'input'
  const isConfirm = step === 'confirm'

  const [userName, setUserName] = useState('')

  return (
    <>
      {isInput && (
        <InputStep
          userName={userName}
          gotoConfirm={(userName) => {
            setStep('confirm')
            setUserName(userName)
          }}
        />
      )}
      {isConfirm && (
        <ConfirmStep
          back={() => {
            setStep('input')
          }}
          userName={userName}
          closeDialog={closeDialog}
        />
      )}
    </>
  )
}

export default SetUserNameDialogContent

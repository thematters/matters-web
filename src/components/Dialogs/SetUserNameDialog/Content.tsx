import _pickBy from 'lodash/pickBy'
import React, { useContext, useState } from 'react'

import { Spinner, ViewerContext } from '~/components'

import ConfirmStep from './ConfirmStep'
import { useAvailableUserName } from './hook'
import InputStep from './InputStep'

interface FormProps {
  closeDialog: () => void
}

type Step = 'input' | 'confirm'

const SetUserNameDialogContent: React.FC<FormProps> = ({ closeDialog }) => {
  const [step, setStep] = useState<Step>('input')
  const isInput = step === 'input'
  const isConfirm = step === 'confirm'

  const viewer = useContext(ViewerContext)
  const isLegacyUserConfirm = viewer.userName && viewer.info.userNameEditable

  const [userName, setUserName] = useState('')
  const { loading, availableUserName } = useAvailableUserName({
    enable: !isLegacyUserConfirm,
  })

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      {isInput && (
        <InputStep
          userName={
            isLegacyUserConfirm ? viewer.userName || '' : availableUserName
          }
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

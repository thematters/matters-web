import { useContext, useState } from 'react'

import { useStep, ViewerContext } from '~/components'

import Complete from './Complete'
import Confirm from './Confirm'
import Request from './Request'

type Step =
  | 'resetPasswordComplete'
  | 'resetPasswordConfirm'
  | 'resetPasswordRequest'

interface ResetPasswordData {
  codeId: string
  email: string
}

interface DonationDialogProps {
  callbackButtons?: React.ReactNode
  close: () => void
}

const ResetPassword = ({ callbackButtons, close }: DonationDialogProps) => {
  const viewer = useContext(ViewerContext)
  const { currStep, forward } = useStep<Step>('resetPasswordRequest')

  const baseResetPasswordData = { email: viewer.info.email, codeId: '' }
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>(
    baseResetPasswordData
  )

  const resetPasswordRequestCallback = ({ email, codeId }: any) => {
    setResetPasswordData({ ...resetPasswordData, email, codeId })
    forward('resetPasswordConfirm')
  }

  const isResetPasswordRequest = currStep === 'resetPasswordRequest'
  const isResetPasswordConfirm = currStep === 'resetPasswordConfirm'
  const isResetPasswordComplete = currStep === 'resetPasswordComplete'

  return (
    <>
      {isResetPasswordRequest && (
        <Request
          defaultEmail={resetPasswordData.email}
          submitCallback={resetPasswordRequestCallback}
        />
      )}

      {isResetPasswordConfirm && (
        <Confirm
          codeId={resetPasswordData.codeId}
          submitCallback={() => forward('resetPasswordComplete')}
        />
      )}

      {isResetPasswordComplete && (
        <Complete closeDialog={close} callbackButtons={callbackButtons} />
      )}
    </>
  )
}

export default ResetPassword

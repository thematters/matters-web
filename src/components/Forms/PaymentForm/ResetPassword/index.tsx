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
  callback?: () => any
  callbackText?: React.ReactNode
  closeDialog: () => void
  back?: () => void
}

const PaymentResetPasswordForm = ({
  callback,
  callbackText,
  closeDialog,
  back: backToPrevDialog,
}: DonationDialogProps) => {
  const viewer = useContext(ViewerContext)
  const { currStep, forward, back } = useStep<Step>('resetPasswordRequest')

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
          closeDialog={closeDialog}
          back={backToPrevDialog}
        />
      )}

      {isResetPasswordConfirm && (
        <Confirm
          codeId={resetPasswordData.codeId}
          submitCallback={() => forward('resetPasswordComplete')}
          closeDialog={closeDialog}
          back={back}
        />
      )}

      {isResetPasswordComplete && (
        <Complete
          closeDialog={closeDialog}
          callback={callback}
          callbackText={callbackText}
        />
      )}
    </>
  )
}

export default PaymentResetPasswordForm

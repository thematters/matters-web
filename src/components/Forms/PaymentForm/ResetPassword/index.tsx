import { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { toast, useStep, ViewerContext } from '~/components'

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

interface PaymentResetPasswordFormProps {
  callback?: () => void
  callbackText?: React.ReactNode
  closeDialog: () => void
  back?: () => void
  autoCloseDialog?: boolean
}

const PaymentResetPasswordForm = ({
  callback,
  callbackText,
  closeDialog,
  back: backToPrevDialog,
  autoCloseDialog,
}: PaymentResetPasswordFormProps) => {
  const viewer = useContext(ViewerContext)
  const { currStep, forward, back } = useStep<Step>('resetPasswordRequest')

  const baseResetPasswordData = { email: viewer.info.email, codeId: '' }
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>(
    baseResetPasswordData
  )

  const resetPasswordRequestCallback = ({
    email,
    codeId,
  }: ResetPasswordData) => {
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
          submitCallback={
            autoCloseDialog
              ? () => {
                  toast.info({
                    message: (
                      <FormattedMessage
                        defaultMessage="Reset successful"
                        id="qS19ij"
                        description="src/components/Forms/PaymentForm/ResetPassword/Confirm.tsx"
                      />
                    ),
                  })
                  closeDialog?.()
                }
              : () => forward('resetPasswordComplete')
          }
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

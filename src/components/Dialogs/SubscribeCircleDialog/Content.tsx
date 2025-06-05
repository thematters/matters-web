import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { SpinnerBlock } from '~/components'

import Complete from './Complete'
import { BaseSubscribeCircleDialogProps, Step } from './types'

type SubscribeCircleDialogContentProps = BaseSubscribeCircleDialogProps & {
  closeDialog: () => void
  forward: (step: Step) => void
  back: () => void
  currStep: Step
  prevStep: Step
}

const DynamicPaymentResetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/ResetPassword'),
  { loading: () => <SpinnerBlock /> }
)
const DynamicSetPaymentPasswordContent = dynamic(
  () => import('~/components/Dialogs/SetPaymentPasswordDialog/Content'),
  { loading: () => <SpinnerBlock /> }
)
const DynamicSubscribeCircleForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SubscribeCircle'),
  { loading: () => <SpinnerBlock /> }
)

const SubscribeCircleDialogContent = ({
  forward,
  currStep,
  closeDialog,
  circle,
}: SubscribeCircleDialogContentProps) => {
  const isSetPaymentPassword = currStep === 'setPaymentPassword'
  const isSubscribeCircle = currStep === 'subscribeCircle'
  const isComplete = currStep === 'complete'
  const isResetPassword = currStep === 'resetPassword'

  return (
    <>
      {isSetPaymentPassword && (
        <DynamicSetPaymentPasswordContent
          submitCallback={() => forward('subscribeCircle')}
          closeDialog={closeDialog}
        />
      )}

      {isSubscribeCircle && (
        <DynamicSubscribeCircleForm
          circle={circle}
          submitCallback={() => forward('complete')}
          switchToResetPassword={() => forward('resetPassword')}
          closeDialog={closeDialog}
        />
      )}

      {isResetPassword && (
        <DynamicPaymentResetPasswordForm
          callback={() => forward('subscribeCircle')}
          callbackText={
            <FormattedMessage defaultMessage="Back to subscribe" id="lqdpsm" />
          }
          closeDialog={closeDialog}
          back={() => forward('subscribeCircle')}
        />
      )}

      {isComplete && <Complete circle={circle} />}
    </>
  )
}

export default SubscribeCircleDialogContent

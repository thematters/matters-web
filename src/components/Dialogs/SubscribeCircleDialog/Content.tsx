import dynamic from 'next/dynamic'

import { Spinner, Translate } from '~/components'

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
  { loading: () => <Spinner /> }
)
const DynamicSetPaymentPasswordContent = dynamic(
  () => import('~/components/Dialogs/SetPaymentPasswordDialog/Content'),
  { loading: () => <Spinner /> }
)
const DynamicSubscribeCircleForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SubscribeCircle'),
  { loading: () => <Spinner /> }
)

const SubscribeCircleDialogContent = ({
  forward,
  back,
  currStep,
  prevStep,
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
          callbackText={<Translate zh_hant="回到訂閱" zh_hans="回到订阅" />}
          closeDialog={closeDialog}
          back={() => forward('subscribeCircle')}
        />
      )}

      {isComplete && <Complete circle={circle} />}
    </>
  )
}

export default SubscribeCircleDialogContent

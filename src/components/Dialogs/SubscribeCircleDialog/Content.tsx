import dynamic from 'next/dynamic'

import { Dialog, Spinner, Translate } from '~/components'

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
  { loading: Spinner }
)
const DynamicPaymentSetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SetPassword'),
  { loading: Spinner }
)
const DynamicSubscribeCircleForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SubscribeCircle'),
  { loading: Spinner }
)

const ContinueSubscribeButton = ({
  forward,
}: {
  forward: (step: Step) => void
}) => (
  <Dialog.Footer.Button onClick={() => forward('subscribeCircle')}>
    <Translate zh_hant="回到訂閱" zh_hans="回到订阅" />
  </Dialog.Footer.Button>
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
      <Dialog.Header
        leftButton={
          prevStep ? <Dialog.Header.BackButton onClick={back} /> : <span />
        }
        rightButton={
          <Dialog.Header.CloseButton closeDialog={closeDialog} textId="close" />
        }
        title={
          isSetPaymentPassword
            ? 'paymentPassword'
            : isComplete
            ? 'successSubscribeCircle'
            : isResetPassword
            ? 'resetPaymentPassword'
            : 'subscribeCircle'
        }
        closeDialog={closeDialog}
        closeTextId="close"
        mode={isComplete ? 'inner' : undefined}
      />

      {isSetPaymentPassword && (
        <DynamicPaymentSetPasswordForm
          submitCallback={() => forward('subscribeCircle')}
        />
      )}

      {isSubscribeCircle && (
        <DynamicSubscribeCircleForm
          circle={circle}
          submitCallback={() => forward('complete')}
          switchToResetPassword={() => forward('resetPassword')}
        />
      )}

      {isResetPassword && (
        <DynamicPaymentResetPasswordForm
          callbackButtons={<ContinueSubscribeButton forward={forward} />}
          closeDialog={closeDialog}
        />
      )}

      {isComplete && <Complete circle={circle} />}
    </>
  )
}

export default SubscribeCircleDialogContent

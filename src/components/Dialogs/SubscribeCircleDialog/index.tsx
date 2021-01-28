import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  PaymentForm,
  Translate,
  useStep,
  ViewerContext,
} from '~/components'
import { CircleDigest } from '~/components/CircleDigest'

import { analytics } from '~/common/utils'

import Complete from './Complete'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

type Step =
  | 'setPaymentPassword'
  | 'subscribeCircle'
  | 'resetPassword'
  | 'complete'

interface SubscribeCircleDialogProps {
  circle: DigestRichCirclePublic
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const fragments = {
  circle: gql`
    fragment SubscribeCircle on Circle {
      id
      ...DigestRichCirclePublic
    }
    ${CircleDigest.Rich.fragments.circle.public}
  `,
}

const BaseSubscribeCircleDialog = ({
  circle,
  children,
}: SubscribeCircleDialogProps) => {
  const viewer = useContext(ViewerContext)
  const [showDialog, setShowDialog] = useState(true)

  const initialStep = viewer.status?.hasPaymentPassword
    ? 'subscribeCircle'
    : 'setPaymentPassword'
  const { currStep, forward, prevStep, back } = useStep<Step>(initialStep)

  const open = () => {
    forward(initialStep)
    setShowDialog(true)
  }

  const close = () => setShowDialog(false)

  const ContinueSubscribeButton = (
    <Dialog.Footer.Button onClick={() => forward('subscribeCircle')}>
      <Translate zh_hant="回到訂閱" zh_hans="回到订阅" />
    </Dialog.Footer.Button>
  )

  const isSetPaymentPassword = currStep === 'setPaymentPassword'
  const isSubscribeCircle = currStep === 'subscribeCircle'
  const isComplete = currStep === 'complete'
  const isResetPassword = currStep === 'resetPassword'

  useEffect(() => {
    analytics.trackEvent('view_subscribe_circle_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close}>
        <Dialog.Header
          leftButton={
            prevStep ? <Dialog.Header.BackButton onClick={back} /> : <span />
          }
          rightButton={
            <Dialog.Header.CloseButton close={close} textId="close" />
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
          close={close}
          closeTextId="close"
          mode={isComplete ? 'inner' : undefined}
        />

        {isSetPaymentPassword && (
          <PaymentForm.SetPassword
            submitCallback={() => forward('subscribeCircle')}
          />
        )}

        {isSubscribeCircle && (
          <PaymentForm.SubscribeCircle
            circle={circle}
            submitCallback={() => forward('complete')}
            switchToResetPassword={() => forward('resetPassword')}
          />
        )}

        {isResetPassword && (
          <PaymentForm.ResetPassword
            callbackButtons={ContinueSubscribeButton}
            close={close}
          />
        )}

        {isComplete && <Complete circle={circle} />}
      </Dialog>
    </>
  )
}

export const SubscribeCircleDialog = (props: SubscribeCircleDialogProps) => (
  <Dialog.Lazy mounted={<BaseSubscribeCircleDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

SubscribeCircleDialog.fragments = fragments

import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useEffect, useState } from 'react'

import {
  Dialog,
  Spinner,
  Translate,
  useEventListener,
  useStep,
  ViewerContext,
} from '~/components'
import { CircleDigest } from '~/components/CircleDigest'

import { OPEN_SUBSCRIBE_CIRCLE_DIALOG } from '~/common/enums'
import { analytics } from '~/common/utils'

import Complete from './Complete'

import { DigestRichCirclePrivate } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePrivate'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

type Step =
  | 'setPaymentPassword'
  | 'subscribeCircle'
  | 'resetPassword'
  | 'complete'

interface SubscribeCircleDialogProps {
  circle: DigestRichCirclePublic & DigestRichCirclePrivate
  children?: ({ open }: { open: () => void }) => React.ReactNode
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

const fragments = {
  circle: {
    public: gql`
      fragment SubscribeCirclePublic on Circle {
        id
        ...DigestRichCirclePublic
      }
      ${CircleDigest.Rich.fragments.circle.public}
    `,
    private: gql`
      fragment SubscribeCirclePrivate on Circle {
        id
        ...DigestRichCirclePrivate
      }
      ${CircleDigest.Rich.fragments.circle.private}
    `,
  },
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

  useEventListener(OPEN_SUBSCRIBE_CIRCLE_DIALOG, open)

  return (
    <>
      {children && children({ open })}

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
            callbackButtons={ContinueSubscribeButton}
            close={close}
          />
        )}

        {isComplete && <Complete circle={circle} />}
      </Dialog>
    </>
  )
}

export const SubscribeCircleDialog = (props: SubscribeCircleDialogProps) => {
  const Children = ({ open }: { open: () => void }) => {
    useEventListener(OPEN_SUBSCRIBE_CIRCLE_DIALOG, open)
    return <>{props.children && props.children({ open })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseSubscribeCircleDialog {...props} />}>
      {({ open }) => <Children open={open} />}
    </Dialog.Lazy>
  )
}

SubscribeCircleDialog.fragments = fragments

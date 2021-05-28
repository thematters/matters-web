import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import {
  Dialog,
  Spinner,
  Translate,
  useDialogSwitch,
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
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
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
  const { show, openDialog: baseOpenDialog, closeDialog } = useDialogSwitch(
    true
  )

  const initialStep = viewer.status?.hasPaymentPassword
    ? 'subscribeCircle'
    : 'setPaymentPassword'
  const { currStep, forward, prevStep, back } = useStep<Step>(initialStep)

  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }

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

  useEventListener(OPEN_SUBSCRIBE_CIRCLE_DIALOG, openDialog)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          leftButton={
            prevStep ? <Dialog.Header.BackButton onClick={back} /> : <span />
          }
          rightButton={
            <Dialog.Header.CloseButton
              closeDialog={closeDialog}
              textId="close"
            />
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
            callbackButtons={ContinueSubscribeButton}
            closeDialog={closeDialog}
          />
        )}

        {isComplete && <Complete circle={circle} />}
      </Dialog>
    </>
  )
}

export const SubscribeCircleDialog = (props: SubscribeCircleDialogProps) => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_SUBSCRIBE_CIRCLE_DIALOG, openDialog)
    return <>{props.children && props.children({ openDialog })}</>
  }

  return (
    <Dialog.Lazy mounted={<BaseSubscribeCircleDialog {...props} />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

SubscribeCircleDialog.fragments = fragments

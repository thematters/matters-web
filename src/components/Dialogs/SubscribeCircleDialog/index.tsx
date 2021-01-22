import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'

import { Dialog, PaymentForm, useStep, ViewerContext } from '~/components'
import { CircleDigest } from '~/components/CircleDigest'

import { analytics } from '~/common/utils'

import Complete from './Complete'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

type Step = 'setPaymentPassword' | 'subscribeCircle' | 'complete'

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
  const { currStep, forward } = useStep<Step>(initialStep)

  const open = () => {
    forward(initialStep)
    setShowDialog(true)
  }

  const close = () => setShowDialog(false)

  const isSetPaymentPassword = currStep === 'setPaymentPassword'
  const isSubscribeCircle = currStep === 'subscribeCircle'
  const isComplete = currStep === 'complete'

  useEffect(() => {
    analytics.trackEvent('view_subscribe_circle_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close}>
        <Dialog.Header
          title={
            isSetPaymentPassword
              ? 'paymentPassword'
              : isSubscribeCircle
              ? 'subscribeCircle'
              : 'successSubscribeCircle'
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

import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import {
  Dialog,
  Spinner,
  useDialogSwitch,
  useStep,
  ViewerContext,
} from '~/components'

import { analytics } from '~/common/utils'

type Step = 'setPaymentPassword' | 'addCredit'

interface AddCreditDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const DynamicPaymentSetPasswordForm = dynamic(
  () => import('~/components/Forms/PaymentForm/SetPassword'),
  { loading: Spinner }
)

const DynamicAddCreditForm = dynamic(
  () => import('~/components/Forms/PaymentForm/AddCredit'),
  { loading: Spinner }
)

const BaseAddCreditDialog = ({ children }: AddCreditDialogProps) => {
  const viewer = useContext(ViewerContext)
  const { show, open: baseOpen, close } = useDialogSwitch(true)

  const initialStep = viewer.status?.hasPaymentPassword
    ? 'addCredit'
    : 'setPaymentPassword'
  const { currStep, forward } = useStep<Step>(initialStep)

  const open = () => {
    forward(initialStep)
    baseOpen()
  }

  const isSetPaymentPassword = currStep === 'setPaymentPassword'
  const isAddCredit = currStep === 'addCredit'

  useEffect(() => {
    analytics.trackEvent('view_add_credit_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={isSetPaymentPassword ? 'paymentPassword' : 'topUp'}
          close={close}
          closeTextId="close"
        />

        {isSetPaymentPassword && (
          <DynamicPaymentSetPasswordForm
            submitCallback={() => forward('addCredit')}
          />
        )}

        {isAddCredit && <DynamicAddCreditForm />}
      </Dialog>
    </>
  )
}

export const AddCreditDialog = (props: AddCreditDialogProps) => (
  <Dialog.Lazy mounted={<BaseAddCreditDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

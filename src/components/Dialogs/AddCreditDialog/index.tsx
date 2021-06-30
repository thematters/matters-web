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
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
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
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)

  const initialStep = viewer.status?.hasPaymentPassword
    ? 'addCredit'
    : 'setPaymentPassword'
  const { currStep, forward } = useStep<Step>(initialStep)

  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }

  const isSetPaymentPassword = currStep === 'setPaymentPassword'
  const isAddCredit = currStep === 'addCredit'

  useEffect(() => {
    analytics.trackEvent('view_add_credit_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title={isSetPaymentPassword ? 'paymentPassword' : 'topUp'}
          closeDialog={closeDialog}
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
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

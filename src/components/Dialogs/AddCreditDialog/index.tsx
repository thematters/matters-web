import { useContext, useEffect, useState } from 'react'

import { Dialog, PaymentForm, useStep, ViewerContext } from '~/components'

import { analytics } from '~/common/utils'

type Step = 'setPaymentPassword' | 'addCredit'

interface AddCreditDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseAddCreditDialog = ({ children }: AddCreditDialogProps) => {
  const viewer = useContext(ViewerContext)
  const [showDialog, setShowDialog] = useState(true)

  const initialStep = viewer.status?.hasPaymentPassword
    ? 'addCredit'
    : 'setPaymentPassword'
  const { currStep, goForward } = useStep<Step>(initialStep)

  const open = () => {
    goForward(initialStep)
    setShowDialog(true)
  }

  const close = () => setShowDialog(false)

  const isSetPaymentPassword = currStep === 'setPaymentPassword'
  const isAddCredit = currStep === 'addCredit'

  useEffect(() => {
    analytics.trackEvent('view_add_credit_dialog', { step: currStep })
  }, [currStep])

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={isSetPaymentPassword ? 'paymentPassword' : 'topUp'}
          close={close}
          closeTextId="close"
        />

        {isSetPaymentPassword && (
          <PaymentForm.SetPassword
            submitCallback={() => goForward('addCredit')}
          />
        )}

        {isAddCredit && <PaymentForm.AddCredit />}
      </Dialog>
    </>
  )
}

export const AddCreditDialog = (props: AddCreditDialogProps) => (
  <Dialog.Lazy mounted={<BaseAddCreditDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

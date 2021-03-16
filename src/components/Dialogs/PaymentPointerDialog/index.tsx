import { useState } from 'react'

import { Dialog, Translate } from '~/components'

import SetPaymentPointerForm from './SetPaymentPointerForm'

interface PaymentPointerProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BasePaymentPointerDialog: React.FC<PaymentPointerProps> = ({
  children,
}) => {
  const formId = `set-payment-pointer-form`
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const [showDialog, setShowDialog] = useState(true)
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="paymentPointer"
          close={close}
          closeTextId="close"
          rightButton={
            <Dialog.Header.RightButton
              type="submit"
              form={formId}
              disabled={isSubmitting || !isValid}
              text={<Translate zh_hant="確認" zh_hans="确认" en="Submit" />}
              loading={isSubmitting}
            />
          }
        />

        <SetPaymentPointerForm
          setIsSubmitting={setIsSubmitting}
          setIsValid={setIsValid}
          formId={formId}
          close={close}
        />
      </Dialog>
    </>
  )
}

export const PaymentPointerDialog = (props: PaymentPointerProps) => (
  <Dialog.Lazy mounted={<BasePaymentPointerDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Dialog, useDialogSwitch } from '~/components'

import SetPaymentPointerForm from './SetPaymentPointerForm'

interface PaymentPointerProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BasePaymentPointerDialog: React.FC<PaymentPointerProps> = ({
  children,
}) => {
  const formId = `set-payment-pointer-form`
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  const SubmitButton = (
    <Dialog.TextButton
      type="submit"
      form={formId}
      disabled={isSubmitting || !isValid}
      text={<FormattedMessage defaultMessage="Submit" id="wSZR47" />}
      loading={isSubmitting}
    />
  )

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <FormattedMessage defaultMessage="Payment Pointer" id="LklXfd" />
          }
          closeDialog={closeDialog}
          rightBtn={SubmitButton}
        />

        <SetPaymentPointerForm
          setIsSubmitting={setIsSubmitting}
          setIsValid={setIsValid}
          formId={formId}
          closeDialog={closeDialog}
        />

        <Dialog.Footer
          smUpBtns={
            <>
              <Dialog.TextButton
                text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
                color="greyDarker"
                onClick={closeDialog}
              />
              {SubmitButton}
            </>
          }
        />
      </Dialog>
    </>
  )
}

export const PaymentPointerDialog = (props: PaymentPointerProps) => (
  <Dialog.Lazy mounted={<BasePaymentPointerDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

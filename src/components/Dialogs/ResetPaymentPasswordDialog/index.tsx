import { useContext, useState } from 'react'

import { Dialog, PaymentForm, ViewerContext } from '~/components'

type Step = 'request' | 'confirm' | 'complete'

interface ResetPaymentPasswordProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseResetPaymentPasswordDialog: React.FC<ResetPaymentPasswordProps> = ({
  children,
}) => {
  const viewer = useContext(ViewerContext)

  const [showDialog, setShowDialog] = useState(true)
  const [step, setStep] = useState<Step>('request')
  const open = () => {
    setStep('request')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  const [data, setData] = useState<{ email: string; codeId: string }>({
    email: viewer.info.email,
    codeId: '',
  })
  const requestCodeCallback = (params: any) => {
    const { email, codeId } = params
    setData({ ...data, email, codeId })
    setStep('confirm')
  }

  const isRequest = step === 'request'
  const isConfirm = step === 'confirm'
  const isComplete = step === 'complete'

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Header
          title="resetPaymentPassword"
          close={close}
          closeTextId="close"
          leftButton={
            isConfirm ? (
              <Dialog.Header.BackButton onClick={() => setStep('request')} />
            ) : undefined
          }
        />

        {isRequest && (
          <PaymentForm.ResetPassword.Request
            defaultEmail={data.email}
            submitCallback={requestCodeCallback}
          />
        )}

        {isConfirm && (
          <PaymentForm.ResetPassword.Confirm
            codeId={data.codeId}
            submitCallback={() => setStep('complete')}
          />
        )}

        {isComplete && <PaymentForm.ResetPassword.Complete />}
      </Dialog>
    </>
  )
}

export const ResetPaymentPasswordDialog = (
  props: ResetPaymentPasswordProps
) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseResetPaymentPasswordDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

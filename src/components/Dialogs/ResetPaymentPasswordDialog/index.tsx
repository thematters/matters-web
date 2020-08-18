import { useContext, useState } from 'react'

import { Dialog, PaymentForm, useStep, ViewerContext } from '~/components'

type Step = 'request' | 'confirm' | 'complete'

interface ResetPaymentPasswordProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseResetPaymentPasswordDialog: React.FC<ResetPaymentPasswordProps> = ({
  children,
}) => {
  const viewer = useContext(ViewerContext)

  const [showDialog, setShowDialog] = useState(true)
  const { currStep, goForward } = useStep<Step>('request')
  const open = () => {
    goForward('request')
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
    goForward('confirm')
  }

  const isRequest = currStep === 'request'
  const isConfirm = currStep === 'confirm'
  const isComplete = currStep === 'complete'

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
              <Dialog.Header.BackButton onClick={() => goForward('request')} />
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
            submitCallback={() => goForward('complete')}
          />
        )}

        {isComplete && (
          <PaymentForm.ResetPassword.Complete closeDialog={close} />
        )}
      </Dialog>
    </>
  )
}

export const ResetPaymentPasswordDialog = (
  props: ResetPaymentPasswordProps
) => (
  <Dialog.Lazy mounted={<BaseResetPaymentPasswordDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

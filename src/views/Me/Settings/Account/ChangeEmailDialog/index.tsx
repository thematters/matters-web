import { useContext, useState } from 'react'

import { Dialog, ViewerContext } from '~/components'

import Complete from './Complete'
import Confirm from './Confirm'
import Request from './Request'

interface ChangeEmailDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

type Step = 'request' | 'confirm' | 'complete'

const BaseChangeEmailDialog = ({ children }: ChangeEmailDialogProps) => {
  const viewer = useContext(ViewerContext)
  const [step, setStep] = useState<Step>('request')
  const [data, setData] = useState<{ [key: string]: any }>({
    request: {
      next: 'confirm',
      email: viewer.info.email,
    },
    confirm: {
      next: 'complete',
    },
  })
  const requestCallback = (codeId: string) => {
    setData((prev) => {
      return {
        ...prev,
        request: {
          ...prev.request,
          codeId,
        },
      }
    })
    setStep('confirm')
  }

  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setStep('request')
    setShowDialog(true)
  }
  const close = () => setShowDialog(false)

  return (
    <>
      {children({ open })}

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        size={step === 'complete' ? 'sm' : 'lg'}
        fixedHeight={step !== 'complete'}
      >
        {step === 'request' && (
          <Request
            defaultEmail={data.request.email}
            submitCallback={requestCallback}
            closeDialog={close}
          />
        )}

        {step === 'confirm' && (
          <Confirm
            oldData={data.request}
            submitCallback={() => setStep('complete')}
            closeDialog={close}
          />
        )}

        {step === 'complete' && <Complete closeDialog={close} />}
      </Dialog>
    </>
  )
}

export const ChangeEmailDialog = (props: ChangeEmailDialogProps) => (
  <Dialog.Lazy>
    {({ open, mounted }) =>
      mounted ? (
        <BaseChangeEmailDialog {...props} />
      ) : (
        <>{props.children({ open })}</>
      )
    }
  </Dialog.Lazy>
)

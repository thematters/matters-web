import dynamic from 'next/dynamic'
import { useState } from 'react'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

import Request from './Request'

type Step = 'request' | 'confirm'

interface SetEmailDialogProps {
  initStep?: Step
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicConfirmConnect = dynamic(() => import('./Confirm'), {
  loading: () => <SpinnerBlock />,
})

const BaseSetEmailDialog = ({
  initStep = 'request',
  children,
}: SetEmailDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const [step, setStep] = useState<Step>(initStep)

  const isRequest = step === 'request'
  const isConfirm = step === 'confirm'

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        {isRequest && (
          <Request
            closeDialog={closeDialog}
            gotoConnect={() => setStep('confirm')}
          />
        )}

        {isConfirm && <DynamicConfirmConnect closeDialog={closeDialog} />}
      </Dialog>
    </>
  )
}

export const SetEmailDialog = (props: SetEmailDialogProps) => (
  <Dialog.Lazy mounted={<BaseSetEmailDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch, useStep } from '~/components'

import { Step } from './types'

interface PayoutDialogProps {
  hasStripeAccount: boolean
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BasePayoutDialog = ({
  hasStripeAccount,
  children,
}: PayoutDialogProps) => {
  const initialStep = hasStripeAccount ? 'confirm' : 'connectStripeAccount'

  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const { currStep, prevStep, forward, back } = useStep<Step>(initialStep)

  const openDialog = () => {
    forward(initialStep)
    baseOpenDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          closeDialog={closeDialog}
          forward={forward}
          back={back}
          currStep={currStep}
          prevStep={prevStep}
        />
      </Dialog>
    </>
  )
}

export const PayoutDialog = (props: PayoutDialogProps) => (
  <Dialog.Lazy mounted={<BasePayoutDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

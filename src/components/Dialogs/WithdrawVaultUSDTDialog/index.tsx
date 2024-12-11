import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch, useStep } from '~/components'

import { Step } from './types'

interface WithdrawVaultUSDTDialogProps {
  amount: number
  type?: 'connectAndClaim' | 'claim'
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseWithdrawVaultUSDTDialog = ({
  amount,
  type,
  children,
}: WithdrawVaultUSDTDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  const { currStep, forward } = useStep<Step>('intro')

  const openDialog = () => {
    baseOpenDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent
          amount={amount}
          type={type}
          closeDialog={closeDialog}
          forward={forward}
          currStep={currStep}
        />
      </Dialog>
    </>
  )
}

export const WithdrawVaultUSDTDialog = (
  props: WithdrawVaultUSDTDialogProps
) => (
  <Dialog.Lazy mounted={<BaseWithdrawVaultUSDTDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

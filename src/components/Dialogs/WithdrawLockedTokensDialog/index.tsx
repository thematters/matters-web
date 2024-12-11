// import dynamic from 'next/dynamic'

import {
  Dialog,
  // SpinnerBlock,
  useDialogSwitch,
  // useStep
} from '~/components'

// import { Step } from './types'

interface WithdrawLockedTokensDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseWithdrawLockedTokensDialog = ({
  children,
}: WithdrawLockedTokensDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog,
  } = useDialogSwitch(true)
  // const { currStep, prevStep, forward, back } = useStep<Step>('confirm')

  const openDialog = () => {
    baseOpenDialog()
  }

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <span>TODO</span>
      </Dialog>
    </>
  )
}

export const WithdrawLockedTokensDialog = (
  props: WithdrawLockedTokensDialogProps
) => (
  <Dialog.Lazy mounted={<BaseWithdrawLockedTokensDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

import dynamic from 'next/dynamic'

import { OPEN_WITHDRAW_VAULT_USDT_DIALOG } from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  useEventListener,
  useStep,
} from '~/components'

import { Step } from './types'

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseWithdrawVaultUSDTDialog = () => {
  const { show, closeDialog } = useDialogSwitch(true)
  const { currStep, forward } = useStep<Step>('intro')

  return (
    <Dialog isOpen={show} onDismiss={closeDialog}>
      <DynamicContent
        closeDialog={closeDialog}
        forward={forward}
        currStep={currStep}
      />
    </Dialog>
  )
}

export const WithdrawVaultUSDTDialog = () => {
  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_WITHDRAW_VAULT_USDT_DIALOG, openDialog)
    return <></>
  }

  return (
    <Dialog.Lazy mounted={<BaseWithdrawVaultUSDTDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

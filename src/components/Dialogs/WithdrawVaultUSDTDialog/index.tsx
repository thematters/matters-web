import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import { OPEN_WITHDRAW_VAULT_USDT_DIALOG, URL_ME_WALLET } from '~/common/enums'
import {
  Dialog,
  SpinnerBlock,
  useDialogSwitch,
  useEventListener,
  useRoute,
  useStep,
} from '~/components'

import { Step } from './types'

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseWithdrawVaultUSDTDialog = () => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)
  const { currStep, forward } = useStep<Step>('intro')

  useEventListener(OPEN_WITHDRAW_VAULT_USDT_DIALOG, openDialog)

  return (
    <Dialog
      isOpen={show}
      onDismiss={closeDialog}
      dismissOnClickOutside={currStep !== 'confirming'}
    >
      <DynamicContent
        closeDialog={closeDialog}
        forward={forward}
        currStep={currStep}
      />
    </Dialog>
  )
}

export const WithdrawVaultUSDTDialog = () => {
  const { getQuery } = useRoute()

  const Children = ({ openDialog }: { openDialog: () => void }) => {
    useEventListener(OPEN_WITHDRAW_VAULT_USDT_DIALOG, openDialog)
    return <></>
  }

  const shouldOpenDialog =
    getQuery(URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.key) ===
    URL_ME_WALLET.OPEN_WITHDRAW_VAULT_USDT_DIALOG.value

  useEffect(() => {
    if (shouldOpenDialog) {
      window.dispatchEvent(new CustomEvent(OPEN_WITHDRAW_VAULT_USDT_DIALOG))
    }
  }, [shouldOpenDialog])

  return (
    <Dialog.Lazy mounted={<BaseWithdrawVaultUSDTDialog />}>
      {({ openDialog }) => <Children openDialog={openDialog} />}
    </Dialog.Lazy>
  )
}

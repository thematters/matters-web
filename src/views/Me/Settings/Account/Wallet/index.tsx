import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { OPEN_WITHDRAW_VAULT_USDT_DIALOG } from '~/common/enums'
import { truncate } from '~/common/utils'
import {
  AddWalletLoginDialog,
  Icon,
  RemoveWalletLoginDialog,
  TableView,
  useVaultBalanceUSDT,
  ViewerContext,
  WithdrawVaultUSDTDialog,
} from '~/components'

import { SettingsButton } from '../../Button'

const Wallet = () => {
  const viewer = useContext(ViewerContext)
  const ethAddress = viewer.info.ethAddress
  const hasETHAddress = !!ethAddress

  const { data: vaultBalanceUSDT } = useVaultBalanceUSDT()
  const hasVaultBalanceUSDT = vaultBalanceUSDT && vaultBalanceUSDT > 0

  const openWithdrawVaultUSDTDialog = () => {
    window.dispatchEvent(new CustomEvent(OPEN_WITHDRAW_VAULT_USDT_DIALOG))
  }

  return (
    <>
      <AddWalletLoginDialog>
        {({ openDialog: openAddWalletLoginDialog }) => (
          <RemoveWalletLoginDialog>
            {({ openDialog: openRemoveWalletLoginDialog }) => {
              return (
                <TableView.Cell
                  title={
                    <FormattedMessage
                      defaultMessage="Wallet address"
                      id="Gt7K6r"
                      description="src/views/Me/Settings/Settings/Wallet/index.tsx"
                    />
                  }
                  rightText={
                    hasETHAddress ? truncate(ethAddress, 6) : undefined
                  }
                  rightIcon={
                    hasETHAddress ? (
                      <Icon icon={IconTimes} size={20} color="greyDarker" />
                    ) : undefined
                  }
                  onClick={
                    hasETHAddress ? openRemoveWalletLoginDialog : undefined
                  }
                  right={
                    ethAddress ? undefined : (
                      <SettingsButton
                        onClick={
                          hasVaultBalanceUSDT
                            ? openWithdrawVaultUSDTDialog
                            : openAddWalletLoginDialog
                        }
                      >
                        <FormattedMessage
                          defaultMessage="Connect"
                          id="+vVZ/G"
                        />
                      </SettingsButton>
                    )
                  }
                />
              )
            }}
          </RemoveWalletLoginDialog>
        )}
      </AddWalletLoginDialog>

      <WithdrawVaultUSDTDialog />
    </>
  )
}

export default Wallet

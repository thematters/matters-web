import { useMutation } from '@apollo/react-hooks'
import { gql } from 'graphql-tag'
import dynamic from 'next/dynamic'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { SpinnerBlock, toast, useRoute } from '~/components'
import { WithdrawVaultUsdtMutation } from '~/gql/graphql'

import { Step } from './types'

type WithdrawVaultUSDTDialogContentProps = {
  amount: number
  type?: 'connectAndClaim' | 'claim'
  closeDialog: () => void
  forward: (step: Step) => void
  currStep: Step
}

const DynamicIntro = dynamic(() => import('./Intro'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

const DynamicAddWalletLogin = dynamic(
  () => import('~/components/Dialogs/AddWalletLoginDialog/Content'),
  { ssr: false, loading: () => <SpinnerBlock /> }
)

const WITHDRAW_VAULT_USDT = gql`
  mutation WithdrawVaultUSDT {
    withdrawLockedTokens {
      transaction {
        id
      }
    }
  }
`

const WithdrawVaultUSDTDialogContent: React.FC<
  WithdrawVaultUSDTDialogContentProps
> = ({ amount, type, closeDialog, forward, currStep }) => {
  const { router } = useRoute()
  const isIntro = currStep === 'intro'
  const isConnectWallet = currStep === 'connectWallet'
  const [withdraw] = useMutation<WithdrawVaultUsdtMutation>(WITHDRAW_VAULT_USDT)

  const onWithdraw = async () => {
    withdraw()

    closeDialog()

    toast.success({
      message: <FormattedMessage defaultMessage="Claiming USDT" id="55jJzY" />,
      actions: [
        {
          content: (
            <FormattedMessage
              defaultMessage="More"
              id="XQ9bi3"
              description="src/components/Dialogs/WithdrawVaultUSDTDialog/Content.tsx"
            />
          ),
          onClick: () => {
            router.push(PATHS.ME_WALLET_TRANSACTIONS)
          },
        },
      ],
    })
  }

  return (
    <>
      {isIntro && (
        <DynamicIntro
          amount={amount}
          type={type}
          switchToConnectWallet={() => {
            forward('connectWallet')
          }}
          onWithdraw={onWithdraw}
          closeDialog={closeDialog}
        />
      )}

      {isConnectWallet && (
        <DynamicAddWalletLogin
          closeDialog={closeDialog}
          submitCallback={() => {
            onWithdraw()
          }}
        />
      )}
    </>
  )
}

export default WithdrawVaultUSDTDialogContent

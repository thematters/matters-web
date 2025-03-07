import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  OPEN_WITHDRAW_VAULT_USDT_DIALOG,
  PATHS,
  REFETCH_BALANCE_USDT,
} from '~/common/enums'
import { formatAmount, truncate } from '~/common/utils'
import { Dialog, Spinner, toast, useRoute, ViewerContext } from '~/components'
import {
  TransactionState,
  WithdrawVaultUsdtMutation,
  WithdrawVaultUsdtPollingQuery,
} from '~/gql/graphql'

type ConfirmingProps = {
  amount: number
  closeDialog: () => void
}

const WITHDRAW_VAULT_USDT = gql`
  mutation WithdrawVaultUSDT {
    withdrawLockedTokens {
      transaction {
        id
        state
      }
    }
  }
`

const WITHDRAW_VAULT_USDT_POLLING = gql`
  query WithdrawVaultUSDTPolling($id: ID!) {
    viewer {
      id
      wallet {
        transactions(input: { filter: { id: $id } }) {
          edges {
            node {
              id
              state
            }
          }
        }
      }
    }
  }
`

const Confirming: React.FC<ConfirmingProps> = ({ amount, closeDialog }) => {
  const { router } = useRoute()
  const viewer = useContext(ViewerContext)
  const address = viewer.info.ethAddress!

  const [withdraw] = useMutation<WithdrawVaultUsdtMutation>(WITHDRAW_VAULT_USDT)
  const [txId, setTxId] = useState<string | null>(null)
  const { startPolling, stopPolling } = useQuery<WithdrawVaultUsdtPollingQuery>(
    WITHDRAW_VAULT_USDT_POLLING,
    {
      variables: { id: txId },
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: typeof window === 'undefined' || !txId,
      onCompleted: (data) => {
        const tx = data?.viewer?.wallet?.transactions?.edges?.[0]?.node

        if (!tx) {
          return
        }

        if (tx.state === TransactionState.Succeeded) {
          stopPolling()
          successToast()
        } else if (
          tx.state === TransactionState.Canceled ||
          tx.state === TransactionState.Failed
        ) {
          stopPolling()
          errorToast()
        }
      },
    }
  )

  const successToast = () => {
    toast.success({
      message: (
        <FormattedMessage defaultMessage="Claim successful" id="rG2xmp" />
      ),
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

    window.dispatchEvent(new CustomEvent(REFETCH_BALANCE_USDT, {}))

    closeDialog()
  }

  const errorToast = () => {
    toast.error({
      message: (
        <FormattedMessage
          defaultMessage="An issue occurred while claiming USDT. Please retry or contact ask@matters.town"
          id="HJsl78"
        />
      ),
      actions: [
        {
          content: (
            <FormattedMessage defaultMessage="Retry claiming" id="fko+MR" />
          ),
          onClick: () => {
            window.dispatchEvent(
              new CustomEvent(OPEN_WITHDRAW_VAULT_USDT_DIALOG, {})
            )
          },
        },
      ],
    })

    closeDialog()
  }

  const onWithdraw = async () => {
    try {
      const { data } = await withdraw()
      const tx = data?.withdrawLockedTokens.transaction

      // If there is a claming tx, start pooling instead
      if (tx && tx.state === TransactionState.Pending) {
        setTxId(tx.id)
        startPolling(3000)
      }
      // Otherwise, claim is successful
      else {
        successToast()
      }
    } catch (error) {
      errorToast()
    }
  }

  useEffect(() => {
    onWithdraw()
  }, [])

  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        title={
          <FormattedMessage defaultMessage="Claiming in progress" id="HBdVkS" />
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            <FormattedMessage
              defaultMessage="Matters is sending {amount} to your connected wallet {address} via a contract transaction (Matters will temporarily cover the transaction fee). For assistance, please contact ask@matters.town"
              id="CcVXhc"
              values={{
                amount: (
                  <span className="u-highlight">
                    {formatAmount(amount)} USDT
                  </span>
                ),
                address: (
                  <span className="u-highlight">{truncate(address)}</span>
                ),
              }}
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            color="greyDarker"
            disabled
            text={<FormattedMessage defaultMessage="Claiming..." id="ODncRd" />}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            color="greyDarker"
            disabled
            text={<FormattedMessage defaultMessage="Claiming..." id="ODncRd" />}
            icon={<Spinner />}
          />
        }
      />
    </>
  )
}

export default Confirming

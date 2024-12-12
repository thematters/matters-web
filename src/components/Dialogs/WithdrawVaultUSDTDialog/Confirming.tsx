import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { OPEN_WITHDRAW_VAULT_USDT_DIALOG, PATHS } from '~/common/enums'
import { formatAmount, truncate } from '~/common/utils'
import { Dialog, Spinner, toast, useRoute, ViewerContext } from '~/components'
import { WithdrawVaultUsdtMutation } from '~/gql/graphql'

import styles from './styles.module.css'

type ConfirmingProps = {
  amount: number
  closeDialog: () => void
}

const WITHDRAW_VAULT_USDT = gql`
  mutation WithdrawVaultUSDT {
    withdrawLockedTokens {
      transaction {
        id
      }
    }
  }
`

const Confirming: React.FC<ConfirmingProps> = ({ amount, closeDialog }) => {
  const viewer = useContext(ViewerContext)
  const address = viewer.info.ethAddress!
  const { router } = useRoute()

  const [withdraw] = useMutation<WithdrawVaultUsdtMutation>(WITHDRAW_VAULT_USDT)

  const onWithdraw = async () => {
    try {
      await withdraw()

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
    } catch (error) {
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
    }

    closeDialog()
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
        rightBtn={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Claiming..." id="ODncRd" />}
            color="greyDarker"
            disabled
          />
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
                  <span className={styles.highlight}>
                    {formatAmount(amount)} USDT
                  </span>
                ),
                address: (
                  <span className={styles.highlight}>{truncate(address)}</span>
                ),
              }}
            />
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
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

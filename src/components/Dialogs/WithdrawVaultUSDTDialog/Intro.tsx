import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { formatAmount, truncate } from '~/common/utils'
import { Dialog, ViewerContext } from '~/components'

import styles from './styles.module.css'

type IntroProps = {
  type?: 'connectAndClaim' | 'claim'
  amount: number
  switchToConnectWallet: () => void
  closeDialog: () => void
  onWithdraw: () => void
}

const Intro: React.FC<IntroProps> = ({
  type = 'connectAndClaim',
  amount,
  switchToConnectWallet,
  closeDialog,
  onWithdraw,
}) => {
  const viewer = useContext(ViewerContext)
  const address = viewer.info.ethAddress
  const isClaimOnly = type === 'claim'

  return (
    <>
      <Dialog.Header
        closeDialog={closeDialog}
        title={
          isClaimOnly ? (
            <FormattedMessage defaultMessage="Claim USDT" id="dUkC8R" />
          ) : (
            <FormattedMessage
              defaultMessage="Connect wallet and claim USDT"
              id="mm2UAM"
            />
          )
        }
      />

      <Dialog.Content>
        <Dialog.Content.Message>
          <p>
            {address ? (
              <FormattedMessage
                defaultMessage="Matters will send {amount} to your connected wallet {address} via a contract transaction (Matters will temporarily cover the transaction fee). For assistance, please contact ask@matters.town"
                id="hDDFgp"
                values={{
                  amount: (
                    <span className={styles.highlight}>
                      {formatAmount(amount)} USDT
                    </span>
                  ),
                  address: (
                    <span className={styles.highlight}>
                      {truncate(address)}
                    </span>
                  ),
                }}
              />
            ) : (
              <FormattedMessage
                defaultMessage="Matters will send {amount} to your connected wallet via a contract transaction (Matters will temporarily cover the transaction fee)."
                id="rAFb3E"
                values={{
                  amount: (
                    <span className={styles.highlight}>
                      {formatAmount(amount)} USDT
                    </span>
                  ),
                }}
              />
            )}
          </p>
        </Dialog.Content.Message>
      </Dialog.Content>

      <Dialog.Footer
        btns={
          <Dialog.RoundedButton
            text={<FormattedMessage defaultMessage="Cancel" id="47FYwb" />}
            onClick={closeDialog}
          />
        }
        smUpBtns={
          <Dialog.TextButton
            text={
              isClaimOnly ? (
                <FormattedMessage defaultMessage="Claim" id="6Sj2lN" />
              ) : (
                <FormattedMessage
                  defaultMessage="Connect and claim"
                  id="C/4nS6"
                />
              )
            }
            onClick={isClaimOnly ? onWithdraw : switchToConnectWallet}
          />
        }
      />
    </>
  )
}

export default Intro

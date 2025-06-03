import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconFiatCurrency from '@/public/static/icons/24px/fiat-currency.svg'
import IconHelp from '@/public/static/icons/24px/help.svg'
import IconLikeCoin from '@/public/static/icons/24px/likecoin.svg'
import IconTether from '@/public/static/icons/24px/tether.svg'
import IconLogoGraph from '@/public/static/icons/logo-graph.svg'
import { Icon, Tooltip, ViewerContext } from '~/components'
import {
  DigestTransactionFragment,
  TransactionCurrency,
  TransactionPurpose,
} from '~/gql/graphql'

import styles from './styles.module.css'

const PurposeTitle = ({ tx }: { tx: DigestTransactionFragment }) => {
  const viewer = useContext(ViewerContext)
  const { purpose, currency, sender, recipient } = tx
  const isViewerSender = sender && viewer.id === sender.id
  const isViewerRecipient = recipient && viewer.id === recipient.id
  const isVaultWithdrawal =
    purpose === TransactionPurpose.CurationVaultWithdrawal

  return (
    <section className={styles.purpose}>
      {isVaultWithdrawal && <Icon icon={IconLogoGraph} size={24} />}
      {currency === TransactionCurrency.Usdt && !isVaultWithdrawal && (
        <Icon icon={IconTether} size={24} />
      )}
      {currency === TransactionCurrency.Hkd && (
        <Icon icon={IconFiatCurrency} size={24} />
      )}
      {currency === TransactionCurrency.Like && (
        <Icon icon={IconLikeCoin} size={24} />
      )}

      <section className={styles.title}>
        {isVaultWithdrawal && (
          <FormattedMessage
            defaultMessage="Claim USDT support"
            id="+jt4rV"
            description="src/components/Transaction/index.tsx"
          />
        )}
        {purpose === TransactionPurpose.SubscriptionSplit &&
          isViewerRecipient && (
            <FormattedMessage
              defaultMessage="Circle Revenue"
              id="R7yHDl"
              description="src/components/Transaction/index.tsx"
            />
          )}
        {purpose === TransactionPurpose.SubscriptionSplit && isViewerSender && (
          <FormattedMessage
            defaultMessage="Circle Subscription"
            id="0qagOO"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.AddCredit && (
          <FormattedMessage
            defaultMessage="Top Up"
            id="yOKEVx"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.Refund && (
          <FormattedMessage
            defaultMessage="Refund"
            id="yoRaUc"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.Payout && (
          <FormattedMessage
            defaultMessage="Payout"
            id="Sep44m"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.PayoutReversal && (
          <FormattedMessage
            defaultMessage="Payout Canceled"
            id="79Ydsg"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.Dispute && (
          <>
            <FormattedMessage
              defaultMessage="Dispute Refund"
              id="up6Uh/"
              description="src/components/Transaction/index.tsx"
            />

            <Tooltip
              content={
                <FormattedMessage
                  defaultMessage="Payment suspended or returned by card issuer when there are doubts about the transaction"
                  id="AB5rDl"
                  description="src/components/Transaction/index.tsx"
                />
              }
            >
              <button
                type="button"
                className={styles.tooltip}
                aria-hidden
                onClick={(event) => event.stopPropagation()}
              >
                <Icon icon={IconHelp} size={14} />
              </button>
            </Tooltip>
          </>
        )}
      </section>
    </section>
  )
}

export default PurposeTitle

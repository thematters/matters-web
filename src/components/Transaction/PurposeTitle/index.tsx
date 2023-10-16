import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  IconFiatCurrency40,
  IconHelp16,
  IconLikeCoin40,
  IconUSDTActive40,
  Tooltip,
  ViewerContext,
} from '~/components'
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

  return (
    <section className={styles.purpose}>
      {currency === TransactionCurrency.Usdt && <IconUSDTActive40 size="md" />}
      {currency === TransactionCurrency.Hkd && <IconFiatCurrency40 size="md" />}
      {currency === TransactionCurrency.Like && <IconLikeCoin40 size="md" />}

      <section className={styles.title}>
        {purpose === TransactionPurpose.SubscriptionSplit &&
          isViewerRecipient && (
            <FormattedMessage
              defaultMessage="Circle Revenue"
              description="src/components/Transaction/index.tsx"
            />
          )}
        {purpose === TransactionPurpose.SubscriptionSplit && isViewerSender && (
          <FormattedMessage
            defaultMessage="Circle Subscription"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.AddCredit && (
          <FormattedMessage
            defaultMessage="Top Up"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.Refund && (
          <FormattedMessage
            defaultMessage="Refund"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.Payout && (
          <FormattedMessage
            defaultMessage="Payout"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.PayoutReversal && (
          <FormattedMessage
            defaultMessage="Payout Canceled"
            description="src/components/Transaction/index.tsx"
          />
        )}

        {purpose === TransactionPurpose.Dispute && (
          <>
            <FormattedMessage
              defaultMessage="Dispute Refund"
              description="src/components/Transaction/index.tsx"
            />

            <Tooltip
              content={
                <FormattedMessage
                  defaultMessage="Payment suspended or returned by card issuer when there are doubts about the transaction"
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
                <IconHelp16 size="sm" />
              </button>
            </Tooltip>
          </>
        )}
      </section>
    </section>
  )
}

export default PurposeTitle

import { Avatar, IconCircle24, IconSupport, IconWallet24 } from '~/components'
import { DigestTransactionFragment } from '~/gql/graphql'

import styles from './styles.module.css'

/**
 * This a sub component of Transaction that depicts a donation
 * came from current viewer or other user with heaer icon.
 *
 * Usage:
 *
 * ```tsx
 *  <Action
 *    isSender
 *    isWalletAction={false}
 *    sender={sender}
 *    recipient={recipient}
 *  />
 * ```
 */

interface ActionProps {
  isSender?: boolean
  isSubscription?: boolean
  isWalletAction?: boolean
  sender?: DigestTransactionFragment['sender'] | null
  recipient?: DigestTransactionFragment['recipient'] | null
}

const Action = ({
  isSender,
  isSubscription,
  isWalletAction,
  sender,
  recipient,
}: ActionProps) => {
  if (isSubscription) {
    return (
      <section className={styles.circle}>
        <IconCircle24 size="md" color="green" />
      </section>
    )
  }

  if (isWalletAction) {
    return (
      <section className={styles.wallet}>
        <IconWallet24 size="md" color="green" />
      </section>
    )
  }

  return (
    <>
      {!isSender && sender && (
        <section className={styles.from}>
          <Avatar size="sm" user={sender} />
          <div className={styles.outline}>
            <IconSupport size="mdS" color="gold" />
          </div>
        </section>
      )}

      {isSender && recipient && (
        <section className={styles.to}>
          <IconSupport size="mdS" color="greyLight" />

          <div className={styles.outline}>
            <Avatar size="sm" user={recipient} />
          </div>
        </section>
      )}
    </>
  )
}

export default Action

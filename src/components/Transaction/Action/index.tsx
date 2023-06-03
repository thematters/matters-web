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
      <section className="circle">
        <IconCircle24 size="md" color="green" />
      </section>
    )
  }

  if (isWalletAction) {
    return (
      <section className="wallet">
        <IconWallet24 size="md" color="green" />
      </section>
    )
  }

  return (
    <>
      {!isSender && sender && (
        <section className="from">
          <Avatar size="sm" user={sender} />
          <div className="outline">
            <IconSupport size="md-s" color="gold" />
          </div>
        </section>
      )}

      {isSender && recipient && (
        <section className="to">
          <IconSupport size="md-s" color="grey-light" />

          <div className="outline">
            <Avatar size="sm" user={recipient} />
          </div>
        </section>
      )}
    </>
  )
}

export default Action

import { Avatar, IconSupport, IconWallet24 } from '~/components'

import styles from './styles.css'

import { TransactionState } from '__generated__/globalTypes'
import {
  DigestTransaction_recipient as Recipient,
  DigestTransaction_sender as Sender,
} from '../__generated__/DigestTransaction'

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
  isWalletAction?: boolean
  sender?: Sender | null
  recipient?: Recipient | null
  state: TransactionState
}

const Action = ({
  isSender,
  isWalletAction,
  sender,
  recipient,
  state,
}: ActionProps) => {
  const isSucceeded = state === TransactionState.succeeded

  if (isWalletAction) {
    return (
      <section className="wallet">
        <IconWallet24 size="md" color="green" />
        <style jsx>{styles}</style>
      </section>
    )
  }

  return (
    <>
      {!isSender && sender && (
        <section className="from">
          <Avatar size="sm" user={sender} />
          <div className="outline">
            <IconSupport
              size="md-s"
              color={isSucceeded ? 'gold' : 'grey-light'}
            />
          </div>
        </section>
      )}

      {isSender && recipient && (
        <section className="to">
          <IconSupport
            size="md-s"
            color={isSucceeded ? 'gold' : 'grey-light'}
          />
          <div className="outline">
            <Avatar size="sm" user={recipient} />
          </div>
        </section>
      )}

      <style jsx>{styles}</style>
    </>
  )
}

export default Action

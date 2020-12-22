import { Avatar, IconDonate24, IconWallet24 } from '~/components'

import styles from './styles.css'

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
}

const Action = ({
  isSender,
  isWalletAction,
  sender,
  recipient,
}: ActionProps) => {
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
            <IconDonate24 size="md-s" />
          </div>
        </section>
      )}
      {isSender && recipient && (
        <section className="to">
          <IconDonate24 size="md-s" />
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

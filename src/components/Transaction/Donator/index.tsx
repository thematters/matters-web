import { UserDigest } from '~/components'

import styles from './styles.css'

import {
  DigestTransaction_recipient as Recipient,
  DigestTransaction_sender as Sender,
} from '../__generated__/DigestTransaction'

/***
 * This is a sub component of Transaction which displays
 * a display name and user name of a donator.
 *
 * Usage:
 *
 * ```tsx
 *  <Donator user={user} />
 * ```
 */
interface DonatorProps {
  user: Sender | Recipient | null
}

const Donator = ({ user }: DonatorProps) => {
  if (!user) {
    return null
  }

  return (
    <section>
      <UserDigest.Mini textSize="md-s" user={user} hasDisplayName hasUserName />
      <style jsx>{styles}</style>
    </section>
  )
}

export default Donator

import { UserDigest } from '~/components'
import { DigestTransactionFragment } from '~/gql/graphql'

import styles from './styles.css'

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
  user:
    | DigestTransactionFragment['recipient']
    | DigestTransactionFragment['sender']
    | null
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

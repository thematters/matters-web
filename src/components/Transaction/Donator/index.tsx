import { UserDigest } from '~/components'
import { DigestTransactionFragment } from '~/gql/graphql'

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
  return (
    <UserDigest.Mini
      textSize={16}
      textWeight="medium"
      user={user || undefined}
      hasDisplayName
      hasAvatar
      avatarSize={24}
    />
  )
}

export default Donator

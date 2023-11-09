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
  if (!user) {
    return null
  }

  return (
    <UserDigest.Mini
      textSize="md"
      textWeight="md"
      user={user}
      hasDisplayName
      hasAvatar
      avatarSize="md"
    />
  )
}

export default Donator

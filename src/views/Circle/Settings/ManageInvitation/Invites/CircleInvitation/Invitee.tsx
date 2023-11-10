import { UserDigest } from '~/components'
import { toUserDigestMiniPlaceholder } from '~/components/UserDigest/Mini'
import { CircleInvitationFragment } from '~/gql/graphql'

interface CircleInvitationInviteeProps {
  invitee: CircleInvitationFragment['invitee']
}

/**
 * CircleInvitationInvitee is a component for presenting different types of invitees.
 * It renders differnet types of UserDigest components according params passing into.
 *
 * Useage:
 *
 * ```tsx
 *   <CircleInvitationInvitee invitee={invitee} />
 * ```
 */
const CircleInvitationInvitee = ({ invitee }: CircleInvitationInviteeProps) => {
  switch (invitee.__typename) {
    case 'Person': {
      const user = invitee
      return (
        <UserDigest.Mini
          user={toUserDigestMiniPlaceholder(user.email)}
          hasAvatar
          hasDisplayName
          disabled
        />
      )
    }
    case 'User': {
      const user = invitee
      return (
        <UserDigest.Mini
          user={user}
          direction="column"
          hasAvatar
          hasDisplayName
          hasUserName
        />
      )
    }
  }
}

export default CircleInvitationInvitee

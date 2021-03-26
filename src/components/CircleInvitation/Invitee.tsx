import { UserDigest } from '~/components'

import {
  CircleInvitation_invitee as CircleInvitationInviteeType,
  CircleInvitation_invitee_Person as CircleInvitationInviteePerson,
  CircleInvitation_invitee_User as CircleInvitationInviteeUser,
} from './__generated__/CircleInvitation'

interface CircleInvitationInviteeProps {
  invitee: CircleInvitationInviteeType
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
      const user = invitee as CircleInvitationInviteePerson
      return <UserDigest.Blank user={user} hasAvatar disabled />
    }
    case 'User': {
      const user = invitee as CircleInvitationInviteeUser
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

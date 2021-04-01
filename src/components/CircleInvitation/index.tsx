import gql from 'graphql-tag'

import { Card, FreePeriod, UserDigest } from '~/components'

import CircleInvitationInvitee from './Invitee'
import CircleInvitationResendButton from './Resend'
import styles from './styles.css'

import { CircleInvitation as CircleInvitationType } from './__generated__/CircleInvitation'

interface CircleInvitationProps {
  invitation: CircleInvitationType
}

/**
 * This component is for representing Circle invitation, and it shows:
 *
 * - avatar
 * - invitee's email (visitor)
 * - invitee's display name (registered user)
 * - invitee's user name (registered user)
 * - invitation free period
 *
 * Useage:
 *
 * ```tsx
 *   <CircleInvitation invitation={invitation} />
 * ```
 */
export const CircleInvitation = ({ invitation }: CircleInvitationProps) => {
  const { circle, freePeriod, invitee } = invitation

  if (!invitee) {
    return null
  }

  const invitees = [
    {
      id: invitee.__typename === 'User' ? invitee.id : null,
      email: invitee.__typename === 'Person' ? invitee.email : null,
    },
  ]

  return (
    <Card spacing={['xtight', 'base']}>
      <section className="container">
        <CircleInvitationInvitee invitee={invitee} />
        <section className="info">
          <span className="period">
            <FreePeriod period={freePeriod} />
          </span>
          <CircleInvitationResendButton
            circleId={circle.id}
            freePeriod={freePeriod}
            invitees={invitees}
          />
        </section>
        <style jsx>{styles}</style>
      </section>
    </Card>
  )
}

CircleInvitation.fragments = {
  invitation: gql`
    fragment CircleInvitation on Invitation {
      id
      circle {
        id
      }
      freePeriod
      invitee {
        ... on Person {
          email
        }
        ... on User {
          id
          userName
          ...UserDigestMiniUser
        }
        __typename
      }
    }
    ${UserDigest.Mini.fragments.user}
  `,
}

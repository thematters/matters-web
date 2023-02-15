import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import {
  Card,
  IconInfo16,
  TextIcon,
  Tooltip,
  // UserDigest,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { CircleInvitationFragment } from '~/gql/graphql'

import CircleInvitationInvitee from './Invitee'
import CircleInvitationPeriod from './Period'
import CircleInvitationResendButton from './Resend'
import styles from './styles.css'

interface CircleInvitationProps {
  invitation: CircleInvitationFragment
}

const CircleInvitationFailedInfo = () => (
  <Tooltip
    content={
      <FormattedMessage defaultMessage="Subscription Failed" description="src/components/CircleInvitation/index.tsx" />
    }
    placement="left"
  >
    <span>
      <TextIcon
        icon={<IconInfo16 />}
        color="grey"
        size="xs"
        spacing="xxxtight"
        textPlacement="left"
      >
        <FormattedMessage defaultMessage="Failed" description="src/components/CircleInvitation/index.tsx" />
      </TextIcon>
    </span>
  </Tooltip>
)

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
  const { circle, freePeriod, invitee, acceptedAt, state } = invitation

  if (!invitee) {
    return null
  }

  const invitees = [
    {
      id: invitee.__typename === 'User' ? invitee.id : null,
      email: invitee.__typename === 'Person' ? invitee.email : null,
    },
  ]

  const isPending = state === 'pending'
  const isFailed = state === 'transfer_failed'
  const isSucceeded = state === 'transfer_succeeded'

  return (
    <Card spacing={['xtight', 'base']}>
      <section className="container">
        <CircleInvitationInvitee invitee={invitee} />
        <section className="info">
          <CircleInvitationPeriod
            freePeriod={freePeriod}
            acceptedAt={acceptedAt}
            state={state}
          />

          {isPending && (
            <CircleInvitationResendButton
              circleId={circle.id}
              freePeriod={freePeriod}
              invitees={invitees}
            />
          )}

          {isFailed && <CircleInvitationFailedInfo />}

          {isSucceeded && (
            <span className="succeeded">
              <FormattedMessage defaultMessage="Subscribed" description="src/components/CircleInvitation/index.tsx" />
            </span>
          )}
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
      acceptedAt
      state
    }
    ${UserDigest.Mini.fragments.user}
  `,
}

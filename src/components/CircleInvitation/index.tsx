import gql from 'graphql-tag'

import { Card, Translate, UserDigest } from '~/components'

import CircleInvitationInvitee from './Invitee'
import CircleInvitationResendButton from './Resend'
import styles from './styles.css'

import { CircleInvitation as CircleInvitationType } from './__generated__/CircleInvitation'

interface CircleInvitationProps {
  invitation: CircleInvitationType
}

const convertFreePeriod = (period: number) => {
  switch (period) {
    case 1: {
      return <Translate zh_hant="一個月" zh_hans="一个月" en="1 month" />
    }
    case 3: {
      return <Translate zh_hant="三個月" zh_hans="三个月" en="3 months" />
    }
    case 6: {
      return <Translate zh_hant="六個月" zh_hans="六个月" en="6 months" />
    }
    case 12: {
      return <Translate zh_hant="一年" zh_hans="一年" en="1 year" />
    }
    default: {
      return <></>
    }
  }
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
  const period = convertFreePeriod(freePeriod)

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
          <span className="period">{period}</span>
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

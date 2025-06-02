import gql from 'graphql-tag'

import IconInfo from '@/public/static/icons/24px/information.svg'
import {
  Card,
  Icon,
  TextIcon,
  Tooltip,
  Translate,
  // UserDigest,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { CircleInvitationFragment } from '~/gql/graphql'

import CircleInvitationInvitee from './Invitee'
import CircleInvitationPeriod from './Period'
import CircleInvitationResendButton from './Resend'
import styles from './styles.module.css'

interface CircleInvitationProps {
  invitation: CircleInvitationFragment
}

const CircleInvitationFailedInfo = () => (
  <Tooltip
    content={
      <Translate
        zh_hant="轉付費訂閱過程出錯"
        zh_hans="转付费订阅过程出错"
        en="Subscription Failed"
      />
    }
    placement="left"
  >
    <span className={styles.subtext}>
      <TextIcon
        icon={<Icon icon={IconInfo} />}
        color="grey"
        size={12}
        spacing={2}
        placement="left"
      >
        <Translate zh_hant="失敗" zh_hans="失败" en="Failed" />
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
    <Card spacing={[8, 0]}>
      <section className={styles.container}>
        <CircleInvitationInvitee invitee={invitee} />
        <section className={styles.info}>
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
            <span className={[styles.subtext, styles.succeeded].join(' ')}>
              <Translate
                zh_hant="付費訂閱中"
                zh_hans="付费订阅中"
                en="Subscribed"
              />
            </span>
          )}
        </section>
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

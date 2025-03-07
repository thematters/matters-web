import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { CircleNewUserNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeUserCard from '../NoticeUserCard'

type CircleNewUserNotice = {
  notice: CircleNewUserNoticeFragment
  userType: 'follower' | 'subscriber' | 'unsubscriber'
}

const CircleNewUserNotice = ({ notice, userType }: CircleNewUserNotice) => {
  const isNewFollower = userType === 'follower'
  const isNewSubscriber = userType === 'subscriber'

  if (isNewFollower) {
    return (
      <NoticeDigest
        notice={notice}
        action={
          <FormattedMessage
            defaultMessage="followed your circle"
            id="hk2aiz"
            description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
          />
        }
        testId={TEST_ID.NOTICE_CIRCLE_NEW_FOLLOWER}
      />
    )
  }

  if (isNewSubscriber) {
    return (
      <NoticeDigest
        notice={notice}
        action={
          <FormattedMessage
            defaultMessage="subscribed your circle"
            id="mPe6DK"
            description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
          />
        }
        testId={TEST_ID.NOTICE_CIRCLE_NEW_SUBSCRIBER}
      />
    )
  }

  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="unsubscribed your circle"
          id="qYzBk8"
          description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
        />
      }
      testId={TEST_ID.NOTICE_CIRCLE_NEW_UNSUBSCRIBER}
    />
  )
}

CircleNewUserNotice.fragments = {
  notice: gql`
    fragment CircleNewUserNotice on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
        ...NoticeUserCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeUserCard.fragments.follower}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewUserNotice

import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { CircleNewUserFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'
import NoticeUserCard from '../NoticeUserCard'

type CircleNewUser = {
  notice: CircleNewUserFragment
  userType: 'follower' | 'subscriber' | 'unsubscriber'
}

const CircleNewUser = ({ notice, userType }: CircleNewUser) => {
  const isNewFollower = userType === 'follower'
  const isNewSubscriber = userType === 'subscriber'

  if (isNewFollower) {
    return (
      <NoticeCard
        notice={notice}
        type="circle"
        action={
          <FormattedMessage
            defaultMessage="followed your circle"
            id="hk2aiz"
            description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
          />
        }
      />
    )
  }

  if (isNewSubscriber) {
    return (
      <NoticeCard
        notice={notice}
        type="circle"
        action={
          <FormattedMessage
            defaultMessage="subscribed your circle"
            id="mPe6DK"
            description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
          />
        }
      />
    )
  }

  return (
    <NoticeCard
      notice={notice}
      type="circle"
      action={
        <FormattedMessage
          defaultMessage="unsubscribed your circle"
          id="qYzBk8"
          description="src/components/Notice/CircleNotice/CircleNewUserNotice.tsx"
        />
      }
    />
  )
}

CircleNewUser.fragments = {
  notice: gql`
    fragment CircleNewUser on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
        ...NoticeUserCard
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeUserCard.fragments.follower}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewUser

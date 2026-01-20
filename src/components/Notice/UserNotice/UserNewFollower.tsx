import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { UserNewFollowerFragment } from '~/gql/graphql'

import ActorAction from '../ActorAction'
import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCard from '../NoticeCard'
import NoticeDate from '../NoticeDate'

const UserNewFollower = ({ notice }: { notice: UserNewFollowerFragment }) => {
  return (
    <NoticeCard
      notice={notice}
      type="user"
      action={
        <FormattedMessage
          defaultMessage="followed you"
          description="src/components/Notice/UserNotice/UserNewFollowerNotice.tsx"
          id="k5NnNF"
        />
      }
    />
  )
}

UserNewFollower.fragments = {
  notice: gql`
    fragment UserNewFollower on UserNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...ActorActionUser
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${ActorAction.fragments.user}
    ${NoticeDate.fragments.notice}
  `,
}

export default UserNewFollower

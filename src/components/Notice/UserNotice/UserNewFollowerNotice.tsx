import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { UserNewFollowerNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeDate from '../NoticeDate'
import NoticeFooterActors from '../NoticeFooterActors'
import NoticeHeadActors from '../NoticeHeadActors'
import NoticeMultiActors from '../NoticeMultiActors'
import NoticeUserCard from '../NoticeUserCard'
import styles from '../styles.css'

const UserNewFollowerNotice = ({
  notice,
}: {
  notice: UserNewFollowerNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  // FIXME: Just for Dev
  let actors = notice.actors
  // actors = [...actors, ...actors, ...actors, ...actors]
  // actors = [...actors, ...actors, ...actors, ...actors, ...actors]

  return (
    <section
      className="container"
      data-test-id={TEST_ID.NOTICE_USER_NEW_FOLLOWER}
    >
      <section className="multi-actor-avatars">
        {/* FIXME: Use actors, Just for Dev */}
        <NoticeMultiActors actors={actors} size="lg" />
      </section>

      <section>
        <NoticeFooterActors
          actors={actors}
          action={
            <FormattedMessage
              defaultMessage="followed you"
              description="src/components/Notice/UserNotice/UserNewFollowerNotice.tsx"
            />
          }
        />
      </section>

      <section className="footer">
        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

UserNewFollowerNotice.fragments = {
  notice: gql`
    fragment UserNewFollowerNotice on UserNotice {
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

export default UserNewFollowerNotice

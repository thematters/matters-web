import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { TagAdoptionNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

const TagAdoptionNotice = ({
  notice,
}: {
  notice: TagAdoptionNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container" data-test-id={TEST_ID.TAG_ADOPTION}>
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <NoticeActorName user={actor} />
          <FormattedMessage
            defaultMessage="just became the maintainer of a tag your article is in. Check out more articles under this tag"
            description="src/components/Notice/TagNotice/TagAdoptionNotice.tsx"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

TagAdoptionNotice.fragments = {
  notice: gql`
    fragment TagAdoptionNotice on TagNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      tag: target {
        ...NoticeTag
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeTag.fragments.tag}
  `,
}

export default TagAdoptionNotice

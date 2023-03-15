import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { TagLeaveEditorNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDate from '../NoticeDate'
import NoticeHead from '../NoticeHead'
import NoticeTag from '../NoticeTag'
import styles from '../styles.css'

const TagLeaveEditorNotice = ({
  notice,
}: {
  notice: TagLeaveEditorNoticeFragment
}) => {
  if (!notice.actors) {
    return null
  }

  const actor = notice.actors[0]

  return (
    <section className="container" data-test-id={TEST_ID.TAG_LEAVE_EDITOR}>
      <section className="avatar-wrap">
        <NoticeActorAvatar user={actor} />
      </section>

      <section className="content-wrap">
        <NoticeHead>
          <FormattedMessage
            defaultMessage="uh-oh,"
            description="src/components/Notice/TagNotice/TagLeaveEditorNotice.tsx"
          />
          <NoticeActorName user={actor} />
          <FormattedMessage
            defaultMessage="resigned as tag collaborator. You can invite new collaborators to join"
            description="src/components/Notice/TagNotice/TagLeaveEditorNotice.tsx"
          />
        </NoticeHead>

        <NoticeTag tag={notice.tag} />

        <NoticeDate notice={notice} />
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

TagLeaveEditorNotice.fragments = {
  notice: gql`
    fragment TagLeaveEditorNotice on TagNotice {
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

export default TagLeaveEditorNotice

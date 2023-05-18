import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { TagAddEditorNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDigest from '../NoticeDigest'
import NoticeTag from '../NoticeTag'

const TagAddEditorNotice = ({
  notice,
}: {
  notice: TagAddEditorNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="invites you to {tag} collaborator"
          description="src/components/Notice/TagNotice/TagAddEditorNotice.tsx"
          values={{
            tag: <NoticeTag tag={notice.tag} />,
          }}
        />
      }
      testId={TEST_ID.TAG_ADD_EDITOR}
    />
  )
}

TagAddEditorNotice.fragments = {
  notice: gql`
    fragment TagAddEditorNotice on TagNotice {
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

export default TagAddEditorNotice

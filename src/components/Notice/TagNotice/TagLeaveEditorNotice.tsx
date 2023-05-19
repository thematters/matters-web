import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { TagLeaveEditorNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDigest from '../NoticeDigest'
import NoticeTag from '../NoticeTag'

const TagLeaveEditorNotice = ({
  notice,
}: {
  notice: TagLeaveEditorNoticeFragment
}) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="resigned from {tag} collaborator"
          description="src/components/Notice/TagNotice/TagLeaveEditorNotice.tsx"
          values={{
            tag: <NoticeTag tag={notice.tag} />,
          }}
        />
      }
      testId={TEST_ID.NOTICE_TAG_LEAVE_EDITOR}
    />
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

import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { TagLeaveNoticeFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeActorName from '../NoticeActorName'
import NoticeDigest from '../NoticeDigest'
import NoticeTag from '../NoticeTag'

const TagLeaveNotice = ({ notice }: { notice: TagLeaveNoticeFragment }) => {
  return (
    <NoticeDigest
      notice={notice}
      action={
        <FormattedMessage
          defaultMessage="resigned as the maintainer of {tag}"
          description="src/components/Notice/TagNotice/TagAdoptionNotice.tsx"
          values={{
            tag: <NoticeTag tag={notice.tag} />,
          }}
        />
      }
      testId={TEST_ID.NOTICE_TAG_LEAVE}
    />
  )
}

TagLeaveNotice.fragments = {
  notice: gql`
    fragment TagLeaveNotice on TagNotice {
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

export default TagLeaveNotice

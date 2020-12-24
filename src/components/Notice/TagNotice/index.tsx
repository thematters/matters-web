import gql from 'graphql-tag'

import TagAddEditorNotice from './TagAddEditorNotice'
import TagAdoptionNotice from './TagAdoptionNotice'
import TagLeaveEditorNotice from './TagLeaveEditorNotice'
import TagLeaveNotice from './TagLeaveNotice'

import { TagNotice as NoticeType } from './__generated__/TagNotice'

const TagNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.tagNoticeType) {
    case 'TagAdoption':
      return <TagAdoptionNotice notice={notice} />
    case 'TagLeave':
      return <TagLeaveNotice notice={notice} />
    case 'TagAddEditor':
      return <TagAddEditorNotice notice={notice} />
    case 'TagLeaveEditor':
      return <TagLeaveEditorNotice notice={notice} />
    default:
      return null
  }
}

TagNotice.fragments = {
  notice: gql`
    fragment TagNotice on TagNotice {
      id
      unread
      __typename
      tagNoticeType: type
      ...TagAddEditorNotice
      ...TagAdoptionNotice
      ...TagLeaveEditorNotice
      ...TagLeaveNotice
    }
    ${TagAddEditorNotice.fragments.notice}
    ${TagAdoptionNotice.fragments.notice}
    ${TagLeaveEditorNotice.fragments.notice}
    ${TagLeaveNotice.fragments.notice}
  `,
}

export default TagNotice

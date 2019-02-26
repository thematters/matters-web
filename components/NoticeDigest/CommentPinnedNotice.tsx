import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeComment from './NoticeComment'

const CommentPinnedNotice = () => null

CommentPinnedNotice.fragments = {
  notice: gql`
    fragment CommentPinnedNotice on CommentPinnedNotice {
      actor {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeComment.fragments.comment}
  `
}

export default CommentPinnedNotice

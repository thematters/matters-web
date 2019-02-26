import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeComment from './NoticeComment'

const CommentNewReplyNotice = () => null

CommentNewReplyNotice.fragments = {
  notice: gql`
    fragment CommentNewReplyNotice on CommentNewReplyNotice {
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeComment
      }
      reply {
        ...NoticeComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeComment.fragments.comment}
  `
}

export default CommentNewReplyNotice

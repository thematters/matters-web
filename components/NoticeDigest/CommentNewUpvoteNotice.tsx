import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeComment from './NoticeComment'

const CommentNewUpvoteNotice = () => null

CommentNewUpvoteNotice.fragments = {
  notice: gql`
    fragment CommentNewUpvoteNotice on CommentNewUpvoteNotice {
      actors {
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

export default CommentNewUpvoteNotice

import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeComment from './NoticeComment'

const CommentMentionedYouNotice = () => null

CommentMentionedYouNotice.fragments = {
  notice: gql`
    fragment CommentMentionedYouNotice on CommentMentionedYouNotice {
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

export default CommentMentionedYouNotice

import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeComment from './NoticeComment'

const SubscribedArticleNewCommentNotice = () => null

SubscribedArticleNewCommentNotice.fragments = {
  notice: gql`
    fragment SubscribedArticleNewCommentNotice on SubscribedArticleNewCommentNotice {
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      target {
        ...NoticeArticle
      }
      comment {
        ...NoticeComment
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
    ${NoticeComment.fragments.comment}
  `
}

export default SubscribedArticleNewCommentNotice

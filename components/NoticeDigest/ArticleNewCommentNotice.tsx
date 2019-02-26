import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'
import NoticeComment from './NoticeComment'

const ArticleNewCommentNotice = () => null

ArticleNewCommentNotice.fragments = {
  notice: gql`
    fragment ArticleNewCommentNotice on ArticleNewCommentNotice {
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

export default ArticleNewCommentNotice

import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'

const ArticleNewAppreciationNotice = () => null

ArticleNewAppreciationNotice.fragments = {
  notice: gql`
    fragment ArticleNewAppreciationNotice on ArticleNewAppreciationNotice {
      MAT
      target {
        ...NoticeArticle
      }
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
  `
}

export default ArticleNewAppreciationNotice

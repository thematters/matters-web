import gql from 'graphql-tag'

import NoticeActorAvatar from './NoticeActorAvatar'
import NoticeActorName from './NoticeActorName'
import NoticeArticle from './NoticeArticle'

const ArticleNewDownstreamNotice = () => null

ArticleNewDownstreamNotice.fragments = {
  notice: gql`
    fragment ArticleNewDownstreamNotice on ArticleNewDownstreamNotice {
      actors {
        ...NoticeActorAvatarUser
        ...NoticeActorNameUser
      }
      downstream {
        ...NoticeArticle
      }
      target {
        ...NoticeArticle
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeActorName.fragments.user}
    ${NoticeArticle.fragments.article}
  `
}

export default ArticleNewDownstreamNotice

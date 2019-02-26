import gql from 'graphql-tag'

import NoticeArticle from './NoticeArticle'

const ArticlePublishedNotice = () => null

ArticlePublishedNotice.fragments = {
  notice: gql`
    fragment ArticlePublishedNotice on ArticlePublishedNotice {
      target {
        ...NoticeArticle
      }
    }
    ${NoticeArticle.fragments.article}
  `
}

export default ArticlePublishedNotice

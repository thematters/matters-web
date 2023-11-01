import gql from 'graphql-tag'

import FooterActions from '../Feed/FooterActions'
import { ArticleDigestTitle } from '../Title'
// import FooterActions from './FooterActions'

export const fragments = {
  article: {
    public: gql`
      fragment ArticleDigestPublishedArticlePublic on Article {
        id
        title
        slug
        mediaHash
        articleState: state
        ...ArticleDigestTitleArticle
        ...FooterActionsArticlePublic
      }
      ${ArticleDigestTitle.fragments.article}
      ${FooterActions.fragments.article.public}
    `,
    private: gql`
      fragment ArticleDigestPublishedArticlePrivate on Article {
        id
        ...FooterActionsArticlePrivate
      }
      ${FooterActions.fragments.article.private}
    `,
  },
}

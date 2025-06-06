import gql from 'graphql-tag'

import { ArticleDigestTitle } from '~/components'

import FooterActions from './FooterActions'

export const fragments = {
  article: {
    public: gql`
      fragment ArticleDigestPublishedArticlePublic on Article {
        id
        title
        slug
        shortHash
        articleState: state
        ...ArticleDigestTitleArticle
        ...FooterActionsPublishedArticlePublic
      }
      ${ArticleDigestTitle.fragments.article}
      ${FooterActions.fragments.article.public}
    `,
    private: gql`
      fragment ArticleDigestPublishedArticlePrivate on Article {
        id
        ...FooterActionsPublishedArticlePrivate
      }
      ${FooterActions.fragments.article.private}
    `,
  },
}

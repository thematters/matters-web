import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Buttons/Bookmark'
import { CircleDigest } from '~/components/CircleDigest'

export const fragments = {
  article: {
    public: gql`
      fragment FooterActionsConciseArticlePublic on Article {
        id
        title
        slug
        mediaHash
        createdAt
        author {
          id
          userName
        }
        access {
          type
          circle {
            id
            name
            ...DigestPlainCircle
          }
        }
      }
      ${CircleDigest.Plain.fragments.circle}
    `,
    private: gql`
      fragment FooterActionsConciseArticlePrivate on Article {
        ...BookmarkArticlePrivate
      }
      ${BookmarkButton.fragments.article.private}
    `,
  },
}

import gql from 'graphql-tag'

import FingerprintButton from './FingerprintButton'

export const fragments = {
  article: gql`
    fragment MetaInfoArticle on Article {
      id
      access {
        type
      }
      language
      slug
      mediaHash
      author {
        id
        userName
      }
      ...FingerprintArticle
    }
    ${FingerprintButton.fragments.article}
  `,
}

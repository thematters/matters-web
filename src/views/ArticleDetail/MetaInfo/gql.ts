import gql from 'graphql-tag'

import FingerprintButton from './FingerprintButton'

export const fragments = {
  article: gql`
    fragment MetaInfoArticle on Article {
      id
      access {
        type
      }
      ...FingerprintArticle
    }
    ${FingerprintButton.fragments.article}
  `,
}

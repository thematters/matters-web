import { gql } from '@apollo/client'

import AccessLabel from '~/components/ArticleDigest/Feed/AccessLabel'

import FingerprintButton from './FingerprintButton'

export const fragments = {
  article: gql`
    fragment MetaInfoArticle on Article {
      id
      ...FingerprintArticle
      ...AccessLabelArticle
    }
    ${FingerprintButton.fragments.article}
    ${AccessLabel.fragments.article}
  `,
}

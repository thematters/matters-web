import { gql } from '@apollo/client'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  article: gql`
    fragment ArchiveArticleArticle on Article {
      id
      articleState: state
      author {
        id
        userName
      }
    }
  `,
}

const ArchiveArticle = {
  fragments,
  Dialog,
  Button,
}

export default ArchiveArticle

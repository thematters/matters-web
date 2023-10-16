import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  article: gql`
    fragment ArchiveArticleArticle on Article {
      id
      title
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

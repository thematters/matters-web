import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  article: gql`
    fragment AddCircleArticleButtonArticle on Article {
      id
      circle {
        id
      }
      author {
        id
        ownCircles {
          id
          name
        }
      }
    }
  `,
}

const AddCircleArticle = {
  fragments,
  Dialog,
  Button,
}

export default AddCircleArticle

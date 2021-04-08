import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  article: gql`
    fragment AddCircleArticleButtonArticle on Article {
      id
      author {
        id
        ownCircles {
          id
          name
        }
      }
      access {
        circle {
          id
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

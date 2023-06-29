import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  collection: gql`
    fragment DeleteCollectionCollection on Collection {
      id
      title
      author {
        id
        userName
      }
    }
  `,
}

const DeleteCollection = {
  fragments,
  Dialog,
  Button,
}

export default DeleteCollection

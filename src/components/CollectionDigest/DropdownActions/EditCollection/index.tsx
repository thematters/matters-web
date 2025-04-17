import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  collection: gql`
    fragment EditCollectionCollection on Collection {
      id
      title
      description
      cover
    }
  `,
}

const EditCollection = {
  fragments,
  Dialog,
  Button,
}

export default EditCollection

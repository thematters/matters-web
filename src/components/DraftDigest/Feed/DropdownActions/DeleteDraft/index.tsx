import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  draft: gql`
    fragment DeleteButtonDraft on Draft {
      id
      title
    }
  `,
}

const DeleteDraft = {
  Dialog,
  Button,
  fragments,
}

export default DeleteDraft

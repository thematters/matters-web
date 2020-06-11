import gql from 'graphql-tag'

import Button from './Button'
import Dialog from './Dialog'

const fragments = {
  user: {
    public: gql`
      fragment BlockUserPublic on User {
        id
        userName
        displayName
      }
    `,
    private: gql`
      fragment BlockUserPrivate on User {
        id
        isBlocked
      }
    `,
  },
}

export const BlockUser = {
  fragments,
  Dialog,
  Button,
}

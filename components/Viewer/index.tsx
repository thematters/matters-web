import gql from 'graphql-tag'
import React from 'react'

import { ViewerUser } from './__generated__/ViewerUser'

export const ViewerUserFragment = {
  user: gql`
    fragment ViewerUser on User {
      id
      userName
      displayName
      avatar
      settings {
        language
      }
      status {
        state
      }
    }
  `
}

export const ViewerContext = React.createContext({} as ViewerUser)

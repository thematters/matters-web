import gql from 'graphql-tag'

import { Layout } from '~/components'

export default gql`
  query RootQuery {
    viewer {
      id
      ...LayoutUser
    }
  }
  ${Layout.fragments.user}
`

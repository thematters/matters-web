import { gql } from '@apollo/client'

import {
  AnalyticsListener,
  FeaturesProvider,
  ViewerProvider,
} from '~/components'

const fragments = {
  user: gql`
    fragment Viewer on User {
      id
      ...ViewerUser
      ...AnalyticsUser
    }
    ${ViewerProvider.fragments.user}
    ${AnalyticsListener.fragments.user}
  `,
  official: gql`
    fragment Official on Official {
      ...FeatureOfficial
    }
    ${FeaturesProvider.fragments.official}
  `,
}

export const ROOT_QUERY_PUBLIC = gql`
  query RootQueryPublic {
    viewer {
      ...Viewer
    }
    official {
      ...Official
    }
  }
  ${fragments.user}
  ${fragments.official}
`

export const ROOT_QUERY_PRIVATE = gql`
  query RootQueryPrivate {
    viewer {
      ...Viewer
    }
    official {
      ...Official
    }
  }
  ${fragments.user}
  ${fragments.official}
`

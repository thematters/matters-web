import gql from 'graphql-tag'

import ClearHistoryButton from './ClearHistoryButton'

export const SEARCH_AUTOCOMPLETE_PUBLIC = gql`
  query SearchOverviewPublic {
    frequentSearch(input: { first: 5, key: "" })
    viewer {
      id
      ...RecentSearchesUser
    }
  }
  ${ClearHistoryButton.fragments.user}
`

export const SEARCH_AUTOCOMPLETE_PRIVATE = gql`
  query SearchOverviewPrivate {
    viewer {
      id
      ...RecentSearchesUser
    }
  }
  ${ClearHistoryButton.fragments.user}
`

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Translate } from '~/components/Language'

import { ViewerRecentSearches } from './__generated__/ViewerRecentSearches'

const fragments = {
  user: gql`
    fragment RecentSearchesUser on User {
      activity {
        recentSearches(input: { first: 3 }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node
          }
        }
      }
    }
  `
}

const CLEAR_HISTORY = gql`
  mutation ClearHistory {
    clearSearchHistory
  }
`

const VIEWER_RECENT_SEARCHES = gql`
  query ViewerRecentSearches {
    viewer {
      id
      ...RecentSearchesUser
    }
  }
  ${fragments.user}
`

const ClearHistoryButton = () => (
  <Mutation
    mutation={CLEAR_HISTORY}
    update={cache => {
      try {
        const data = cache.readQuery<ViewerRecentSearches>({
          query: VIEWER_RECENT_SEARCHES
        })

        if (
          !data ||
          !data.viewer ||
          !data.viewer.activity ||
          !data.viewer.activity.recentSearches
        ) {
          return
        }

        data.viewer.activity.recentSearches.edges = []

        cache.writeQuery({
          query: VIEWER_RECENT_SEARCHES,
          data
        })
      } catch (e) {
        //
      }
    }}
  >
    {clear => (
      <button
        type="button"
        className="clear-history-btn"
        onClick={() => clear()}
      >
        <Translate zh_hant="清空" zh_hans="清空" />
      </button>
    )}
  </Mutation>
)

ClearHistoryButton.fragments = fragments

export default ClearHistoryButton

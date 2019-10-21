import gql from 'graphql-tag'
import { useMutation } from 'react-apollo'

import { Translate } from '~/components/Language'

import { ADD_TOAST } from '~/common/enums'

import { ClearHistory } from './__generated__/ClearHistory'
import { ViewerRecentSearches } from './__generated__/ViewerRecentSearches'
import styles from './styles.css'

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

const ClearHistoryButton = () => {
  const [clear] = useMutation<ClearHistory>(CLEAR_HISTORY, {
    update: cache => {
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

        cache.writeQuery({
          query: VIEWER_RECENT_SEARCHES,
          data: {
            viewer: {
              ...data.viewer,
              activity: {
                ...data.viewer.activity,
                recentSearches: {
                  ...data.viewer.activity.recentSearches,
                  edges: []
                }
              }
            }
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  })

  return (
    <button
      type="button"
      className="clear-history-btn"
      onClick={async () => {
        await clear()

        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate zh_hant="已清空搜尋紀錄" zh_hans="已清空搜索纪录" />
              )
            }
          })
        )
      }}
    >
      <Translate zh_hant="清空" zh_hans="清空" />

      <style jsx>{styles}</style>
    </button>
  )
}

ClearHistoryButton.fragments = fragments

export default ClearHistoryButton

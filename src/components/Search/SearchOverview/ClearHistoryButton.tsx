import gql from 'graphql-tag'

import { Button, TextIcon, Translate } from '~/components'
import { useMutation } from '~/components/GQL'

import { ADD_TOAST } from '~/common/enums'

import { ClearHistory } from './__generated__/ClearHistory'
import { ViewerRecentSearches } from './__generated__/ViewerRecentSearches'

const fragments = {
  user: gql`
    fragment RecentSearchesUser on User {
      activity {
        recentSearches(input: { first: 5 }) {
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
  `,
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
    update: (cache) => {
      try {
        const data = cache.readQuery<ViewerRecentSearches>({
          query: VIEWER_RECENT_SEARCHES,
        })

        if (!data?.viewer?.activity.recentSearches) {
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
                  edges: [],
                },
              },
            },
          },
        })
      } catch (e) {
        console.error(e)
      }
    },
  })

  return (
    <Button
      size={[null, '1.25rem']}
      spacing={[0, 'xtight']}
      borderColor="grey-light"
      borderWidth="sm"
      onClick={async () => {
        await clear()
        window.dispatchEvent(
          new CustomEvent(ADD_TOAST, {
            detail: {
              color: 'green',
              content: (
                <Translate zh_hant="已清空搜尋記錄" zh_hans="已清空搜索记录" />
              ),
            },
          })
        )
      }}
    >
      <TextIcon size="xs" weight="normal" color="grey">
        <Translate zh_hant="清空" zh_hans="清空" />
      </TextIcon>
    </Button>
  )
}

ClearHistoryButton.fragments = fragments

export default ClearHistoryButton

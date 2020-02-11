import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { Dialog, InfiniteScroll, Spinner, UserDigest } from '~/components'
import { QueryError } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics, getQuery, mergeConnections } from '~/common/utils'

import styles from './styles.css'

import { AllArticleAppreciators } from './__generated__/AllArticleAppreciators'

const ARTICLE_APPRECIATORS = gql`
  query AllArticleAppreciators($mediaHash: String, $after: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      appreciationsReceived(input: { first: 10, after: $after }) {
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ... on Transaction {
              amount
              sender {
                ...UserDigestRichUser
              }
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const AppreciatorsDialogContent = () => {
  const router = useRouter()
  const mediaHash = getQuery({ router, key: 'mediaHash' })
  const { data, loading, error, fetchMore } = useQuery<AllArticleAppreciators>(
    ARTICLE_APPRECIATORS,
    { variables: { mediaHash } }
  )

  const article = data?.article
  const connectionPath = 'article.appreciationsReceived'
  const { edges, pageInfo } = data?.article?.appreciationsReceived || {}

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo || !article) {
    return null
  }

  const loadMore = () => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.APPRECIATOR,
      location: edges.length,
      entrance: article.id
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
    })
  }

  return (
    <>
      <Dialog.Content spacing={[0, 0]}>
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <ul className="dialog-appreciators-list">
            {edges.map(
              ({ node, cursor }, i) =>
                node.sender && (
                  <li
                    key={cursor}
                    onClick={() =>
                      analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                        type: FEED_TYPE.APPRECIATOR,
                        location: i,
                        entrance: article.id
                      })
                    }
                  >
                    <UserDigest.Rich
                      user={node.sender}
                      avatarBadge={
                        <span className="appreciation-amount">
                          {node.amount}
                        </span>
                      }
                      hasFollow
                    />
                  </li>
                )
            )}

            <style jsx>{styles}</style>
          </ul>
        </InfiniteScroll>
      </Dialog.Content>
    </>
  )
}

export default AppreciatorsDialogContent

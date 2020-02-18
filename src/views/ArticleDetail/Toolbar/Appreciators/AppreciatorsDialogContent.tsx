import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  Dialog,
  InfiniteList,
  RowRendererProps,
  Spinner,
  UserDigest
} from '~/components'
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
        totalCount
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

const ListRow = ({ index, datum, parentProps }: RowRendererProps) => {
  const { node, cursor } = datum
  const { articleId } = parentProps
  return (
    <div
      className="appreciator-item"
      key={cursor}
      onClick={() => {
        analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
          type: FEED_TYPE.APPRECIATOR,
          location: index,
          entrance: articleId
        })
      }}
    >
      <UserDigest.Rich
        user={node.sender}
        avatarBadge={<span className="appreciation-amount">{node.amount}</span>}
        hasFollow
      />
      <style jsx>{styles}</style>
    </div>
  )
}

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

  const loadMore = (callback: () => void) => {
    analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
      type: FEED_TYPE.APPRECIATOR,
      location: edges.length,
      entrance: article.id
    })
    return fetchMore({
      variables: {
        after: pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        callback()
        return mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath
        })
      }
    })
  }

  const totalCount = data?.article?.appreciationsReceived.totalCount || 0

  // estimate a safe default height
  const modalContentMaxHeight = window
    ? (window.innerHeight * (80/100))
    : undefined

  return (
    <Dialog.Content spacing={[0, 0]}>
      <div className="dialog-appreciators-list">
        <InfiniteList
          data={edges}
          defaultListMaxHeight={modalContentMaxHeight}
          defaultRowHeight={70}
          loader={<Spinner />}
          loadMore={loadMore}
          parentProps={{ articleId: article.id }}
          renderer={ListRow}
          totalCount={totalCount}
        />
      </div>
      <style jsx>{styles}</style>
    </Dialog.Content>
  )
}

export default AppreciatorsDialogContent

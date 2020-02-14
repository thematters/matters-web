import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import {
  InfiniteList,
  RowRendererProps,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import { QueryError } from '~/components/GQL'
import { Modal } from '~/components/Modal'
import { ModalInstance } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import {
  analytics,
  getQuery,
  mergeConnections,
  numFormat
} from '~/common/utils'

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
        avatarBadge={
          <span className="appreciation-amount">{node.amount}</span>
        }
        hasFollow
      />
      <style jsx>{styles}</style>
    </div>
  )
}

const AppreciatorsModal = () => {
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

  const formattedTotalCount = numFormat(totalCount)

  return (
    <>
      <Modal.Header
        title={
          <Translate
            zh_hant={`${formattedTotalCount} 人讚賞了作品`}
            zh_hans={`${formattedTotalCount} 人赞赏了作品`}
          />
        }
      />
      <Modal.Content spacing="none" layout="full-width">
        <div className="modal-appreciators-list">
          <InfiniteList
            data={edges}
            loader={<Spinner />}
            loadMore={loadMore}
            parentProps={{ articleId: article.id }}
            renderer={ListRow}
            totalCount={totalCount}
          />
        </div>
        <style jsx>{styles}</style>
      </Modal.Content>
    </>
  )
}

export default () => (
  <ModalInstance modalId="appreciatorsModal">
    {(props: ModalInstanceProps) => <AppreciatorsModal />}
  </ModalInstance>
)

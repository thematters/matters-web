import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

import { InfiniteScroll, Spinner, Translate, UserDigest } from '~/components'
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
  const totalCount = numFormat(
    data?.article?.appreciationsReceived.totalCount || 0
  )

  return (
    <>
      <Modal.Header
        title={
          <Translate
            zh_hant={`${totalCount} 人讚賞了作品`}
            zh_hans={`${totalCount} 人赞赏了作品`}
          />
        }
      />
      <Modal.Content spacing="none" layout="full-width">
        <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
          <ul className="modal-appreciators-list u-list-gap">
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
      </Modal.Content>
    </>
  )
}

export default () => (
  <ModalInstance modalId="appreciatorsModal">
    {(props: ModalInstanceProps) => <AppreciatorsModal />}
  </ModalInstance>
)

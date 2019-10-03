import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { QueryResult } from 'react-apollo'

import { InfiniteScroll, Spinner, Translate, UserDigest } from '~/components'
import { Query } from '~/components/GQL'
import { Modal } from '~/components/Modal'
import { ModalInstance } from '~/components/ModalManager'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import {
  analytics,
  getQuery,
  mergeConnections,
  numFormat
} from '~/common/utils'

import { AllArticleAppreciators } from './__generated__/AllArticleAppreciators'
import styles from './styles.css'

const ARTICLE_APPRECIATORS = gql`
  query AllArticleAppreciators($mediaHash: String, $after: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      appreciators(input: { first: 10, after: $after }) {
        totalCount
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
        edges {
          cursor
          node {
            ...UserDigestFullDescUser
          }
        }
      }
    }
  }
  ${UserDigest.FullDesc.fragments.user}
`

const AppreciatorsModal: React.FC<WithRouterProps> = ({ router }) => {
  const mediaHash = getQuery({ router, key: 'mediaHash' })

  if (!mediaHash) {
    return null
  }

  return (
    <ModalInstance modalId="appreciatorsModal">
      {(props: ModalInstanceProps) => (
        <Query query={ARTICLE_APPRECIATORS} variables={{ mediaHash }}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: AllArticleAppreciators }) => {
            if (loading) {
              return <Spinner />
            }

            const connectionPath = 'article.appreciators'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () => {
              analytics.trackEvent(ANALYTICS_EVENTS.LOAD_MORE, {
                type: FEED_TYPE.APPRECIATOR,
                location: edges.length,
                entrance: data.article.id
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
              _get(data, 'article.appreciators.totalCount', 0)
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
                  <InfiniteScroll
                    hasNextPage={pageInfo.hasNextPage}
                    loadMore={loadMore}
                  >
                    <ul className="modal-appreciators-list">
                      {edges.map(
                        (
                          { node, cursor }: { node: any; cursor: any },
                          i: number
                        ) => (
                          <li
                            key={cursor}
                            onClick={() =>
                              analytics.trackEvent(
                                ANALYTICS_EVENTS.CLICK_FEED,
                                {
                                  type: FEED_TYPE.APPRECIATOR,
                                  location: i,
                                  entrance: data.article.id
                                }
                              )
                            }
                          >
                            <UserDigest.FullDesc user={node} />
                          </li>
                        )
                      )}
                      <style jsx>{styles}</style>
                    </ul>
                  </InfiniteScroll>
                </Modal.Content>
              </>
            )
          }}
        </Query>
      )}
    </ModalInstance>
  )
}

export default withRouter(AppreciatorsModal)

import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import {
  Error,
  InfiniteScroll,
  Spinner,
  Translate,
  UserDigest
} from '~/components'
import ModalContent from '~/components/Modal/Content'
import ModalHeader from '~/components/Modal/Header'
import { ModalInstance } from '~/components/ModalManager'

import { getQuery, mergeConnections } from '~/common/utils'

import { AllArticleAppreciators } from './__generated__/AllArticleAppreciators'
import styles from './styles.css'

const ARTICLE_APPRECIATORS = gql`
  query AllArticleAppreciators(
    $mediaHash: String
    $uuid: UUID
    $cursor: String
  ) {
    article(input: { mediaHash: $mediaHash, uuid: $uuid }) {
      id
      appreciators(input: { first: 10, after: $cursor }) {
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
  const uuid = getQuery({ router, key: 'post' })

  if (!mediaHash && !uuid) {
    return null
  }

  return (
    <ModalInstance modalId="appreciatorsModal">
      {(props: ModalInstanceProps) => (
        <Query query={ARTICLE_APPRECIATORS} variables={{ mediaHash, uuid }}>
          {({
            data,
            loading,
            error,
            fetchMore
          }: QueryResult & { data: AllArticleAppreciators }) => {
            if (loading) {
              return <Spinner />
            }

            if (error) {
              return <Error error={error} />
            }

            const connectionPath = 'article.appreciators'
            const { edges, pageInfo } = _get(data, connectionPath, {})
            const loadMore = () =>
              fetchMore({
                variables: {
                  cursor: pageInfo.endCursor
                },
                updateQuery: (previousResult, { fetchMoreResult }) =>
                  mergeConnections({
                    oldData: previousResult,
                    newData: fetchMoreResult,
                    path: connectionPath
                  })
              })
            const totalCount = _get(data, 'article.appreciators.totalCount', 0)

            return (
              <>
                <ModalHeader
                  title={
                    <Translate
                      zh_hant={`${totalCount} 人讚賞了文章`}
                      zh_hans={`${totalCount} 人赞赏了文章`}
                    />
                  }
                />
                <ModalContent spacing="none" layout="full-width">
                  <InfiniteScroll
                    hasNextPage={pageInfo.hasNextPage}
                    loadMore={loadMore}
                  >
                    <ul className="modal-appreciators-list">
                      {edges.map(
                        ({ node, cursor }: { node: any; cursor: any }) => (
                          <li key={cursor}>
                            <UserDigest.FullDesc user={node} />
                          </li>
                        )
                      )}
                      <style jsx>{styles}</style>
                    </ul>
                  </InfiniteScroll>
                </ModalContent>
              </>
            )
          }}
        </Query>
      )}
    </ModalInstance>
  )
}

export default withRouter(AppreciatorsModal)

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  InfiniteScroll,
  QueryError,
  Spinner,
  Translate,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleAppreciatorsQuery } from '~/gql/graphql'

import styles from './styles.css'

interface AppreciatorsDialogContentProps {
  id: string
  closeDialog: () => void
}

const ARTICLE_APPRECIATORS = gql`
  query ArticleAppreciators($id: ID!, $after: String) {
    article: node(input: { id: $id }) {
      ... on Article {
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
              ... on Appreciation {
                amount
                sender {
                  id
                  ...UserDigestRichUserPublic
                  ...UserDigestRichUserPrivate
                }
              }
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user.public}
  ${UserDigest.Rich.fragments.user.private}
`

const AppreciatorsDialogContent = ({
  id,
  closeDialog,
}: AppreciatorsDialogContentProps) => {
  const { data, loading, error, fetchMore } =
    useQuery<ArticleAppreciatorsQuery>(ARTICLE_APPRECIATORS, {
      variables: { id },
    })

  const article = data?.article
  const connectionPath = 'article.appreciationsReceived'
  const { edges, pageInfo } =
    (article?.__typename === 'Article' && article?.appreciationsReceived) || {}
  const totalCount =
    (article?.__typename === 'Article' &&
      article?.appreciationsReceived.totalCount) ||
    0

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
    analytics.trackEvent('load_more', {
      type: 'appreciators',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  return (
    <>
      <Dialog.Header
        title={
          <Translate
            zh_hant={`${totalCount} 人讚賞了作品`}
            zh_hans={`${totalCount} 人赞赏了作品`}
          />
        }
        closeDialog={closeDialog}
        closeTextId="close"
      />

      <Dialog.Content>
        <InfiniteScroll
          loader={<Spinner />}
          loadMore={loadMore}
          hasNextPage={pageInfo.hasNextPage}
        >
          {edges.map(({ node, cursor }, index) =>
            node.sender ? (
              <div className="dialog-appreciators-list" key={cursor}>
                <UserDigest.Rich
                  user={node.sender}
                  avatarBadge={
                    <span className="appreciation-amount">{node.amount}</span>
                  }
                  onClick={() => {
                    analytics.trackEvent('click_feed', {
                      type: 'appreciators',
                      contentType: 'user',
                      location: index,
                      id: node.sender?.id,
                    })
                  }}
                />
                <style jsx>{styles}</style>
              </div>
            ) : null
          )}
        </InfiniteScroll>
      </Dialog.Content>
    </>
  )
}

export default AppreciatorsDialogContent

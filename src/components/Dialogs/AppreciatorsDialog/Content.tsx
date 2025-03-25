import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import { Dialog, InfiniteScroll, QueryError, SpinnerBlock } from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { ArticleAppreciatorsQuery } from '~/gql/graphql'

import styles from './styles.module.css'

interface AppreciatorsDialogContentProps {
  id: string
  closeDialog: () => void
}

const ARTICLE_APPRECIATORS = gql`
  query ArticleAppreciators($id: ID!, $after: String) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        likesReceived: appreciationsReceived(
          input: { first: 10, after: $after }
        ) {
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
  const connectionPath = 'article.likesReceived'
  const { edges, pageInfo } =
    (article?.__typename === 'Article' && article?.likesReceived) || {}
  const totalCount =
    (article?.__typename === 'Article' && article?.likesReceived.totalCount) ||
    0

  if (loading) {
    return <SpinnerBlock />
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
          <FormattedMessage
            defaultMessage="{totalCount} people have liked the article."
            id="+3ny7b"
            values={{ totalCount }}
          />
        }
        closeDialog={closeDialog}
        closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
      />

      <Dialog.Content noSpacing>
        <InfiniteScroll
          loader={<SpinnerBlock />}
          loadMore={loadMore}
          hasNextPage={pageInfo.hasNextPage}
        >
          {edges.map(({ node, cursor }, index) =>
            node.sender ? (
              <div className={styles.dialogAppreciatorsList} key={cursor}>
                <UserDigest.Rich
                  user={node.sender}
                  avatarBadge={
                    <span className={styles.appreciationAmount}>
                      {node.amount}
                    </span>
                  }
                  onClick={() => {
                    analytics.trackEvent('click_feed', {
                      type: 'appreciators',
                      contentType: 'user',
                      location: index,
                      id: node.sender?.id,
                    })
                  }}
                  hasFollow={false}
                />
              </div>
            ) : null
          )}
        </InfiniteScroll>
      </Dialog.Content>

      <Dialog.Footer
        smUpBtns={
          <Dialog.TextButton
            text={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
            color="greyDarker"
            onClick={closeDialog}
          />
        }
      />
    </>
  )
}

export default AppreciatorsDialogContent

import { useQuery } from '@apollo/react-hooks'

import { analytics, mergeConnections } from '~/common/utils'
import {
  Dialog,
  InfiniteScroll,
  QueryError,
  Spinner,
  Translate,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import {
  ArticleDonatorsQuery,
  DonatorDialogArticleFragment,
} from '~/gql/graphql'

import { ARTICLE_DONATORS } from './gql'
import styles from './styles.css'

interface DonatorsDialogContentProps {
  article: DonatorDialogArticleFragment
  closeDialog: () => void
}

const DonatorsDialogContent = ({
  article,
  closeDialog,
}: DonatorsDialogContentProps) => {
  const { data, loading, error, fetchMore } = useQuery<ArticleDonatorsQuery>(
    ARTICLE_DONATORS,
    { variables: { id: article.id } }
  )

  const connectionPath = 'article.donations'
  const { edges, pageInfo } =
    (data?.article?.__typename === 'Article' && data?.article?.donations) || {}
  const totalCount =
    (data?.article?.__typename === 'Article' &&
      data?.article?.donations.totalCount) ||
    0

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'donators',
      location: edges.length,
    })
    return fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        })
      },
    })
  }

  return (
    <>
      <Dialog.Header
        title={
          <>
            {totalCount}&nbsp;
            <Translate id="hasSupportedArticle" />
          </>
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
          {edges.map(({ node, cursor }, i) => (
            <UserDigest.Rich
              user={node}
              key={cursor}
              onClick={() => {
                analytics.trackEvent('click_feed', {
                  type: 'donators',
                  contentType: 'user',
                  location: i,
                  id: node.id,
                })
              }}
            />
          ))}
        </InfiniteScroll>

        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default DonatorsDialogContent

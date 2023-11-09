import { useQuery } from '@apollo/react-hooks'
import { FormattedMessage } from 'react-intl'

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
  SupportsDialogArticleFragment,
} from '~/gql/graphql'

import { ARTICLE_DONATORS } from './gql'

interface SupportersDialogContentProps {
  article: SupportsDialogArticleFragment
  closeDialog: () => void
}

const SupportersDialogContent = ({
  article,
  closeDialog,
}: SupportersDialogContentProps) => {
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
        closeText={<FormattedMessage defaultMessage="Close" id="rbrahO" />}
      />

      <Dialog.Content noSpacing>
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
              hasFollow={false}
            />
          ))}
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

export default SupportersDialogContent

import { useQuery } from '@apollo/react-hooks'

import {
  Dialog,
  InfiniteScroll,
  List,
  QueryError,
  RowRendererProps,
  Spinner,
  Translate,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'

import { analytics, mergeConnections } from '~/common/utils'

import { ARTICLE_DONATORS } from './gql'
import styles from './styles.css'

import {
  ArticleDonators,
  ArticleDonators_article_Article,
  ArticleDonators_article_Article_donations_edges,
} from './__generated__/ArticleDonators'
import { DonatorDialogArticle } from './__generated__/DonatorDialogArticle'
// import { List } from 'react-virtualized'

interface DonatorsDialogContentProps {
  article: DonatorDialogArticle
  closeDialog: () => void
}

const DonatorsDialogContent = ({
  article,
  closeDialog,
}: DonatorsDialogContentProps) => {
  const { data, loading, error, fetchMore } = useQuery<ArticleDonators>(
    ARTICLE_DONATORS,
    { variables: { id: article.id } }
  )

  const connectionPath = 'article.donations'
  const { edges, pageInfo } =
    (data?.article as ArticleDonators_article_Article)?.donations || {}

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const ListRow = ({
    index,
    datum,
  }: RowRendererProps<ArticleDonators_article_Article_donations_edges>) => {
    const { node, cursor } = datum

    return (
      <div className="donator-item" key={cursor}>
        {node && (
          <UserDigest.Rich
            user={node}
            onClick={() => {
              analytics.trackEvent('click_feed', {
                type: 'donators',
                contentType: 'user',
                location: index,
                id: node.id,
              })
            }}
          />
        )}
        <style jsx>{styles}</style>
      </div>
    )
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

  const totalCount =
    (data?.article as ArticleDonators_article_Article)?.donations.totalCount ||
    0

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
            <List.Item key={cursor}>
              <div className="dialog-donator-list">
                <ListRow
                  index={i}
                  key={i}
                  datum={{ node, cursor, __typename: 'UserEdge' }}
                />
              </div>
            </List.Item>
          ))}
        </InfiniteScroll>

        <style jsx>{styles}</style>
      </Dialog.Content>
    </>
  )
}

export default DonatorsDialogContent

import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  EmptyArticle,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
} from '~/components'
import { MeWorksPublishedFeedQuery, UserArticlesSort } from '~/gql/graphql'

import Placeholder from '../Placeholder'
import WorksTabs from '../WorksTabs'
import { ArticleDigestPublished } from './ArticleDigestPublished'
import { ME_WORKS_PUBLISHED_FEED } from './gql'
import { SortTabs } from './SortTabs'

export const BaseMeWorksPublished = () => {
  const [sort, setSort] = useState<UserArticlesSort>(UserArticlesSort.Newest)
  const { data, loading, error, fetchMore } =
    useQuery<MeWorksPublishedFeedQuery>(ME_WORKS_PUBLISHED_FEED, {
      variables: { sort },
    })

  const connectionPath = 'viewer.articles'
  const { edges, pageInfo } = data?.viewer?.articles || {}

  const isEmptyArticle = !edges || edges.length <= 0 || !pageInfo

  if (loading) {
    return (
      <>
        {!isEmptyArticle && <SortTabs sort={sort} setSort={setSort} />}
        <Placeholder />
      </>
    )
  }

  if (error) {
    return <QueryError error={error} />
  }

  const articleEdges = edges?.filter(
    ({ node }) => node.articleState === 'active'
  )

  if (
    !edges ||
    edges.length <= 0 ||
    !pageInfo ||
    !articleEdges ||
    articleEdges.length <= 0
  ) {
    return <EmptyArticle isMe />
  }

  const loadMore = () =>
    fetchMore({
      variables: { after: pageInfo.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })

  return (
    <>
      <SortTabs sort={sort} setSort={setSort} />
      <Layout.Main.Spacing hasVertical={false}>
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          loader={<Placeholder />}
          eof
        >
          <List>
            {articleEdges.map(({ node }) => (
              <List.Item key={node.id}>
                <ArticleDigestPublished article={node} />
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </Layout.Main.Spacing>
    </>
  )
}

const MeWorksPublished = () => {
  const intl = useIntl()

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="My Works" id="ai7kS4" />
          </Layout.Header.Title>
        }
      />

      <Head
        title={intl.formatMessage({
          defaultMessage: 'My Works',
          id: 'ai7kS4',
        })}
      />

      <WorksTabs />

      <BaseMeWorksPublished />
    </Layout.Main>
  )
}

export default MeWorksPublished

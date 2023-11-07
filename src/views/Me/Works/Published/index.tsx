import { useQuery } from '@apollo/react-hooks'
import { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { mergeConnections } from '~/common/utils'
import {
  ArticleDigestPublished,
  Button,
  EmptyArticle,
  Head,
  IconClose20,
  IconUser2V16,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
} from '~/components'
import { MeWorksPublishedFeedQuery, UserArticlesSort } from '~/gql/graphql'

import Placeholder from '../Placeholder'
import WorksTabs from '../WorksTabs'
import { ME_WORKS_PUBLISHED_FEED } from './gql'
import { SortTabs } from './SortTabs'
import styles from './styles.module.css'

export const BaseMeWorksPublished = ({
  sort,
  setShowSort,
}: {
  sort: UserArticlesSort
  setShowSort: (state: boolean) => void
}) => {
  const { data, loading, error, fetchMore } =
    useQuery<MeWorksPublishedFeedQuery>(ME_WORKS_PUBLISHED_FEED, {
      variables: { sort },
    })

  if (loading) {
    return <Placeholder />
  }

  if (error) {
    return <QueryError error={error} />
  }

  const connectionPath = 'viewer.articles'
  const { edges, pageInfo } = data?.viewer?.articles || {}

  if (!edges || edges.length <= 0 || !pageInfo) {
    return <EmptyArticle isMe />
  }

  const articleEdges = edges.filter(
    ({ node }) => node.articleState === 'active'
  )

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

  setShowSort(true)
  return (
    <Layout.Main.Spacing>
      <InfiniteScroll
        hasNextPage={pageInfo.hasNextPage}
        loadMore={loadMore}
        loader={<Placeholder />}
        eof
      >
        <List>
          {articleEdges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <ArticleDigestPublished article={node} />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </Layout.Main.Spacing>
  )
}

const MeWorksPublished = () => {
  const init = useIntl()
  const title = init.formatMessage({
    defaultMessage: 'My Works - Published',
    description: 'src/views/Me/Works/Published/index.tsx',
    id: 'yBCdku',
  })

  const [sort, setSort] = useState<UserArticlesSort>(UserArticlesSort.Newest)
  const [showHint, setShowHint] = useState(true)
  const [showSort, setShowSort] = useState(false)

  return (
    <Layout.Main>
      <Layout.Header
        left={
          <Layout.Header.Title>
            <FormattedMessage defaultMessage="My Works" id="ai7kS4" />
          </Layout.Header.Title>
        }
      />

      <Head title={title} />

      <WorksTabs />

      {showSort && (
        <>
          <SortTabs sort={sort} setSort={setSort} />
          {showHint && (
            <section className={styles.hint}>
              <p className={styles.left}>
                <IconUser2V16 color="grey" />
                <FormattedMessage
                  defaultMessage="Number of readers: unique registered users plus number of anonymous IP addresses visited the article"
                  description="src/views/Me/Works/Published/index.tsx"
                  id="jaTUgx"
                />
              </p>
              <section className={styles.right}>
                <Button
                  textColor="greyDarker"
                  textActiveColor="black"
                  onClick={() => setShowHint(false)}
                >
                  <IconClose20 size="mdS" />
                </Button>
              </section>
            </section>
          )}
        </>
      )}

      <BaseMeWorksPublished
        sort={sort}
        setShowSort={(state) => {
          setShowSort(state)
        }}
      />
    </Layout.Main>
  )
}

export default MeWorksPublished

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  ArticleDigestFeed,
  Button,
  EmptyHistory,
  Head,
  InfiniteScroll,
  Layout,
  List,
  QueryError,
  Spinner,
  TextIcon,
  Translate,
  useMutation,
} from '~/components'
import { ClearReadHistoryMutation, MeHistoryFeedQuery } from '~/gql/graphql'

import HistoryTabs from './HistoryTabs'

const ME_HISTORY_FEED = gql`
  query MeHistoryFeed($after: String) {
    viewer {
      id
      activity {
        history(input: { first: 10, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              article {
                ...ArticleDigestFeedArticlePublic
                ...ArticleDigestFeedArticlePrivate
              }
            }
          }
        }
      }
    }
  }
  ${ArticleDigestFeed.fragments.article.public}
  ${ArticleDigestFeed.fragments.article.private}
`

const CLEAR_READ_HISTORY = gql`
  mutation ClearReadHistory {
    clearReadHistory(input: {}) {
      activity {
        history(input: { first: 10 }) {
          totalCount
        }
      }
    }
  }
`

const BaseMeHistory = () => {
  const { data, loading, error, fetchMore } =
    useQuery<MeHistoryFeedQuery>(ME_HISTORY_FEED)

  const [emptyHistory, setEmptyHistory] = useState(false)

  const [clear] = useMutation<ClearReadHistoryMutation>(CLEAR_READ_HISTORY, {
    update: () => setEmptyHistory(true),
  })

  const handlerClear = async () => {
    await clear()
  }

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    )
  }

  if (error) {
    return (
      <>
        <QueryError error={error} />
      </>
    )
  }

  const connectionPath = 'viewer.activity.history'
  const { edges, pageInfo } = data?.viewer?.activity.history || {}

  if (!edges || edges.length <= 0 || !pageInfo || emptyHistory) {
    return (
      <>
        <EmptyHistory />
      </>
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'read_history',
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
      <Button
        bgColor="green"
        spacing={['xtight', 'base']}
        onClick={handlerClear}
      >
        <TextIcon color="white" size="mdS" weight="md">
          <Translate id="clear" />
        </TextIcon>
      </Button>

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List responsiveWrapper>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <ArticleDigestFeed
                article={node.article}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'read_history',
                    contentType: 'article',
                    location: i,

                    id: node.article.id,
                  })
                }
                onClickAuthor={() => {
                  analytics.trackEvent('click_feed', {
                    type: 'read_history',
                    contentType: 'user',
                    location: i,
                    id: node.article.author.id,
                  })
                }}
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

const MeHistory = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'History',
    description: '',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.Title>{title}</Layout.Header.Title>}
      />

      <Head title={title} />

      <HistoryTabs />

      <BaseMeHistory />
    </Layout.Main>
  )
}

export default MeHistory

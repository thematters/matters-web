import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyLike,
  Head,
  InfiniteScroll,
  Layout,
  List,
  SpinnerBlock,
} from '~/components'
import { MeLikesSentQuery } from '~/gql/graphql'

import { Appreciation } from '../Appreciation'
import HistoryTabs from '../HistoryTabs'
import LikesTabs from '../LikesTabs'

const ME_LIKES_SENT = gql`
  query MeLikesSent($after: String) {
    viewer {
      id
      activity {
        likesSent: appreciationsSent(input: { first: 20, after: $after }) {
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              ...DigestAppreciation
            }
          }
        }
      }
    }
  }
  ${Appreciation.fragments.appreciation}
`

const BaseLikesSent = () => {
  const { data, loading, fetchMore } = useQuery<MeLikesSentQuery>(ME_LIKES_SENT)

  if (loading) {
    return <SpinnerBlock />
  }

  if (!data?.viewer) {
    return null
  }

  const connectionPath = 'viewer.activity.likesSent'
  const { edges, pageInfo } = data.viewer.activity.likesSent

  if (!edges || edges.length <= 0 || !pageInfo) {
    return (
      <>
        <LikesTabs />
        <EmptyLike />
      </>
    )
  }

  const loadMore = () => {
    analytics.trackEvent('load_more', {
      type: 'appreciations_sent',
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
      <LikesTabs />

      <Layout.Main.Spacing hasVertical={false}>
        <InfiniteScroll
          hasNextPage={pageInfo.hasNextPage}
          loadMore={loadMore}
          eof
        >
          <List>
            {edges.map(({ node, cursor }) => (
              <List.Item key={cursor}>
                <Appreciation appreciation={node} type="sent" />
              </List.Item>
            ))}
          </List>
        </InfiniteScroll>
      </Layout.Main.Spacing>
    </>
  )
}

const LikesSent = () => {
  const intl = useIntl()
  const title = intl.formatMessage({
    defaultMessage: 'History',
    id: 'djJp6c',
  })

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.Title>{title}</Layout.Header.Title>}
      />

      <Head title={title} />

      <HistoryTabs />

      <BaseLikesSent />
    </Layout.Main>
  )
}

export default LikesSent

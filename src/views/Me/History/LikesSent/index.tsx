import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useIntl } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  EmptyAppreciation,
  Head,
  InfiniteScroll,
  Layout,
  List,
  Spinner,
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
    return <Spinner />
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
        <EmptyAppreciation />
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

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List responsiveWrapper>
          {edges.map(({ node, cursor }) => (
            <List.Item key={cursor}>
              <Appreciation appreciation={node} type="sent" />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

const LikesSent = () => {
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

      <BaseLikesSent />
    </Layout.Main>
  )
}

export default LikesSent

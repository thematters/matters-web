import { NetworkStatus } from 'apollo-client'

import {
  InfiniteScroll,
  List,
  Spinner,
  Translate,
  usePublicQuery,
  usePullToRefresh,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics, mergeConnections } from '~/common/utils'

import styles from '../styles.css'
import TAG_PARTICIPANTS from './gql'

import { TagParticipants } from './__generated__/TagParticipants'

interface Props {
  id: string
}

const Participants = ({ id }: Props) => {
  const {
    data,
    loading,
    error,
    fetchMore,
    refetch,
    networkStatus,
  } = usePublicQuery<TagParticipants>(TAG_PARTICIPANTS, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  })

  // pagination
  const connectionPath = 'node.participants'
  const { totalCount, edges, pageInfo } =
    (data?.node?.__typename === 'Tag' &&
      data.node.participants &&
      data.node.participants) ||
    {}
  const isNewLoading =
    [NetworkStatus.loading, NetworkStatus.setVariables].indexOf(
      networkStatus
    ) >= 0

  // load next page
  const loadMore = async () => {
    analytics.trackEvent('load_more', {
      type: 'tag_detail_community',
      location: edges ? edges.length : 0,
    })

    await fetchMore({
      variables: {
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

  usePullToRefresh.Handler(refetch)

  if (loading && (!edges || isNewLoading)) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0 || !pageInfo) {
    return null
  }

  const count = totalCount || 0
  if (count === 0) {
    return null
  }

  return (
    <>
      <section className="category">
        <section>
          <Translate zh_hant="作者" zh_hans="作者" />
          <span className="count">({count})</span>
        </section>
      </section>

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {(edges || []).map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                hasFollow={false}
                spacing={['tight', 'base']}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'tag_detail_community',
                    contentType: 'user',
                    styleType: 'card',
                    location: i,
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>

      <style jsx>{styles}</style>
    </>
  )
}

export default Participants

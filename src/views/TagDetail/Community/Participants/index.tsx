import { NetworkStatus } from 'apollo-client'
import { FormattedMessage } from 'react-intl'

import { analytics, mergeConnections } from '~/common/utils'
import {
  InfiniteScroll,
  List,
  QueryError,
  Spinner,
  usePublicQuery,
  UserDigest,
} from '~/components'
import { TagParticipantsQuery } from '~/gql/graphql'

import styles from '../styles.module.css'
import TAG_PARTICIPANTS from './gql'

interface Props {
  id: string
}

const Participants = ({ id }: Props) => {
  const { data, loading, error, fetchMore, networkStatus } =
    usePublicQuery<TagParticipantsQuery>(TAG_PARTICIPANTS, {
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
      location: edges?.length || 0,
    })

    await fetchMore({
      variables: { after: pageInfo?.endCursor },
      updateQuery: (previousResult, { fetchMoreResult }) =>
        mergeConnections({
          oldData: previousResult,
          newData: fetchMoreResult,
          path: connectionPath,
        }),
    })
  }

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
      <section className={styles.category}>
        <section>
          <FormattedMessage defaultMessage="Creators" />
          <span className={styles.count}>({count})</span>
        </section>
      </section>

      <InfiniteScroll hasNextPage={pageInfo.hasNextPage} loadMore={loadMore}>
        <List>
          {(edges || []).map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                hasFollow={false}
                spacing={['tight', 0]}
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'tag_detail_community',
                    contentType: 'user',
                    location: i,
                    id: node.id,
                  })
                }
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </>
  )
}

export default Participants

// import { useContext, useEffect } from 'react'

// import {
//   analytics,
//   // mergeConnections
// } from '~/common/utils'
import {
  Dialog,
  // EmptyWarning,
  InfiniteScroll,
  List,
  // QueryError,
  // SpinnerBlock,
  // Translate,
  // usePublicQuery,
  // useRoute,
  // ViewerContext,
} from '~/components'
import { UserDigest } from '~/components/UserDigest'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

// import { UserFollowerPublicQuery } from '~/gql/graphql'
// import { GET_PARTICIPANTS } from './gql'

const ParticipantsDialogContent = () => {
  // const viewer = useContext(ViewerContext)
  // const { getQuery } = useRoute()

  /**
   * Data Fetching
   */
  // public data
  // const { data, loading, error, fetchMore, client } =
  //   usePublicQuery<UserFollowerPublicQuery>(GET_PARTICIPANTS, {
  //     variables: { id },
  //   })

  // pagination
  // const user = data?.user
  // const connectionPath = 'user.followers'
  // const { edges, pageInfo } = user?.followers || {}

  // load next page
  // const loadMore = async () => {
  //   analytics.trackEvent('load_more', {
  //     type: 'follower',
  //     location: edges?.length || 0,
  //   })
  //   const { data: newData } = await fetchMore({
  //     variables: { after: pageInfo?.endCursor },
  //     updateQuery: (previousResult, { fetchMoreResult }) =>
  //       mergeConnections({
  //         oldData: previousResult,
  //         newData: fetchMoreResult,
  //         path: connectionPath,
  //       }),
  //   })

  //   loadPrivate(newData)
  // }

  /**
   * Render
   */
  // if (loading) {
  //   return <SpinnerBlock />
  // }

  // if (error) {
  //   return <QueryError error={error} />
  // }
  const campaign = MOCK_CAMPAIGN

  return (
    <Dialog.Content noSpacing>
      <InfiniteScroll
        // hasNextPage={pageInfo.hasNextPage}
        // loadMore={loadMore}
        hasNextPage={false}
        loadMore={async () => {}}
      >
        <List hasBorder={false}>
          {campaign.participants.edges.map(({ node }, i) => (
            <List.Item key={node.id}>
              <UserDigest.Rich
                user={node}
                // onClick={() =>
                //   analytics.trackEvent('click_feed', {
                //     type: 'follower',
                //     contentType: 'user',
                //     location: i,
                //     id: node.id,
                //   })
                // }
                spacing={[12, 16]}
                hasFollow={false}
              />
            </List.Item>
          ))}
        </List>
      </InfiniteScroll>
    </Dialog.Content>
  )
}

export default ParticipantsDialogContent

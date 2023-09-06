import { DataProxy } from 'apollo-cache'

import { ERROR_CODES } from '~/common/enums'
import { CircleFollowersPublicQuery } from '~/gql/graphql'
import { CIRCLE_FOLLOWERS_PUBLIC } from '~/views/Circle/Profile/FollowersDialog/gql'

export const updateCircleFollowers = ({
  cache,
  name,
  type,
  viewer,
}: {
  cache: DataProxy
  name: string
  type: 'follow' | 'unfollow'
  viewer: any
}) => {
  try {
    if (!name) {
      return
    }

    const variables = { name }
    const cacheData = cache.readQuery<CircleFollowersPublicQuery>({
      query: CIRCLE_FOLLOWERS_PUBLIC,
      variables,
    })

    if (
      !cacheData ||
      !cacheData.circle ||
      cacheData.circle.__typename !== 'Circle'
    ) {
      return
    }

    const followers = cacheData.circle.followers.edges || []

    switch (type) {
      case 'follow': {
        followers.push({
          cursor: window.btoa(`arrayconnection:${followers.length}`) || '',
          node: {
            avatar: viewer.avatar,
            displayName: viewer.displayName,
            id: viewer.id,
            info: {
              description: viewer.info.description,
              badges: viewer.info.badges,
              cryptoWallet: viewer.info.cryptoWallet,
              __typename: 'UserInfo',
            },
            isFollowee: false,
            isFollower: false,
            liker: {
              civicLiker: viewer.liker.civicLiker,
              __typename: 'Liker',
            },
            status: {
              state: viewer.status.state,
              __typename: 'UserStatus',
            },
            userName: viewer.userName,
            __typename: 'User',
          },
          __typename: 'UserEdge',
        })
        break
      }
      case 'unfollow': {
        cacheData.circle.followers.edges = followers.filter(
          (follower) => follower.node.id !== viewer.id
        )
        break
      }
    }

    cache.writeQuery({
      query: CIRCLE_FOLLOWERS_PUBLIC,
      variables,
      data: cacheData,
    })
  } catch (e) {
    if ((e as any).message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

import { DataProxy } from 'apollo-cache'

import TAG_FOLLOWERS from '~/components/GQL/queries/tagFollowers'

import { ERROR_CODES } from '~/common/enums'

import { TagFollowers } from '~/components/GQL/queries/__generated__/TagFollowers'

const update = ({
  cache,
  id,
  type,
  viewer,
}: {
  cache: DataProxy
  id: string
  type: 'follow' | 'unfollow'
  viewer: any
}) => {
  try {
    if (!id) {
      return
    }

    const variables = { id }
    const cacheData = cache.readQuery<TagFollowers>({
      query: TAG_FOLLOWERS,
      variables,
    })

    if (!cacheData || !cacheData.node || cacheData.node.__typename !== 'Tag') {
      return
    }

    const followers = cacheData.node.followers.edges || []
    if (type === 'follow') {
      followers.push({
        cursor:  window.btoa(`arrayconnection:${followers.length}:0`) || '',
        node: {
          avatar: viewer.avatar,
          id: viewer.id,
          liker: {
            civicLiker: viewer.liker.civicLiker,
            __typename: 'Liker',
          },
          __typename: 'User',
        },
        __typename: 'UserEdge',
      })
      cacheData.node.followers.edges = followers
      cacheData.node.followers.totalCount++
    } else {
      cacheData.node.followers.edges = followers.filter(follower => follower.node.id !== viewer.id)
      cacheData.node.followers.totalCount--
    }

    cache.writeQuery({
      query: TAG_FOLLOWERS,
      variables,
      data: cacheData,
    })
  } catch (e) {
    if (e.message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

export default update

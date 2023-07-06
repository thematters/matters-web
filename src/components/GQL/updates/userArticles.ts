import { DataProxy } from 'apollo-cache'

import { UserArticlesPublicQuery } from '~/gql/graphql'

const update = ({
  cache,
  targetId,
  userName,
  type,
}: {
  cache: DataProxy
  targetId: string
  userName?: string | null
  type: 'pin' | 'unpin' | 'archive'
}) => {
  // FIXME: circular dependencies
  const { USER_ARTICLES_PUBLIC } = require('~/views/User/Articles/gql')

  if (!userName) {
    return
  }

  try {
    const data = cache.readQuery<UserArticlesPublicQuery>({
      query: USER_ARTICLES_PUBLIC,
      variables: { userName },
    })

    if (!data?.user?.status || !data.user.articles.edges) {
      return
    }

    const articles = data.user.articles.edges.map((e) => e.node)
    const target = articles.find((a) => a.id === targetId)!
    let pinnedWorks = data.user.pinnedWorks || []

    switch (type) {
      case 'pin':
        pinnedWorks = [...pinnedWorks, target]
        break
      case 'unpin':
        pinnedWorks = pinnedWorks.filter((a) => a.id !== targetId)
        break
      case 'archive':
        // remove pinned article if it's archived
        pinnedWorks = pinnedWorks.filter((a) => a.id !== targetId)
        break
    }

    cache.writeQuery({
      query: USER_ARTICLES_PUBLIC,
      variables: { userName },
      data: {
        user: {
          ...data.user,
          pinnedWorks,
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}

export default update

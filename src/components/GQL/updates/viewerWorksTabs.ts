import { DataProxy } from '@apollo/client/cache'

import { MeWorksTabsQuery } from '~/gql/graphql'

export const updateViewerWorksTabs = ({
  cache,
  type,
}: {
  cache: DataProxy
  type: 'increaseDraft' | 'decreaseDraft'
}) => {
  const { ME_WORKS_TABS } = require('~/views/Me/Works/WorksTabs/gql.ts')
  try {
    const cacheData = cache.readQuery<MeWorksTabsQuery>({
      query: ME_WORKS_TABS,
    })

    if (!cacheData || !cacheData.viewer) {
      return
    }

    let newTotalCount = cacheData.viewer.drafts.totalCount

    if (type === 'increaseDraft') {
      newTotalCount += 1
    } else if (type === 'decreaseDraft') {
      newTotalCount -= 1
    }

    cache.writeQuery({
      query: ME_WORKS_TABS,
      data: {
        ...cacheData,
        viewer: {
          ...cacheData.viewer,
          drafts: {
            ...cacheData.viewer.drafts,
            totalCount: newTotalCount,
          },
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}

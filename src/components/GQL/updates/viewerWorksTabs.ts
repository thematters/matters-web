import { DataProxy } from 'apollo-cache'

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

    if (type === 'increaseDraft') {
      cacheData.viewer.drafts.totalCount++
    } else if (type === 'decreaseDraft') {
      cacheData.viewer.drafts.totalCount--
    }

    cache.writeQuery({
      query: ME_WORKS_TABS,
      data: cacheData,
    })
  } catch (e) {
    console.error(e)
  }
}

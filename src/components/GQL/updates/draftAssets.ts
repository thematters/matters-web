import { DataProxy } from 'apollo-cache'

import { DraftAssetsQuery } from '~/gql/graphql'

export const updateDraftAssets = ({
  cache,
  id,
  asset,
}: {
  cache: DataProxy
  id: string
  asset: NonNullable<
    DraftAssetsQuery['node'] & { __typename: 'Draft' }
  >['assets'][0]
}) => {
  const { DRAFT_ASSETS } = require('~/views/Me/DraftDetail/gql')

  try {
    if (!id) {
      return
    }

    const variables = { id }
    const cacheData = cache.readQuery<DraftAssetsQuery>({
      query: DRAFT_ASSETS,
      variables,
    })

    if (
      !cacheData ||
      !cacheData.node ||
      cacheData.node.__typename !== 'Draft'
    ) {
      return
    }

    cacheData.node.assets.unshift(asset)
    cache.writeQuery({
      query: DRAFT_ASSETS,
      variables,
      data: cacheData,
    })
  } catch (e) {
    console.error(e)
  }
}

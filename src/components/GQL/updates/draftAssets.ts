import { DataProxy } from '@apollo/client/cache'

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

    cache.writeQuery({
      query: DRAFT_ASSETS,
      variables,
      data: {
        ...cacheData,
        node: {
          ...cacheData.node,
          assets: [asset, ...cacheData.node.assets],
        },
      },
    })
  } catch (e) {
    console.error(e)
  }
}

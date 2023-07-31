import { DataProxy } from 'apollo-cache'

import { ERROR_CODES } from '~/common/enums'
import { DraftAssetsQuery } from '~/gql/graphql'
import { DRAFT_ASSETS } from '~/views/Me/DraftDetail/gql'

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
    if ((e as any).message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

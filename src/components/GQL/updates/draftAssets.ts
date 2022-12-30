import { DataProxy } from 'apollo-cache'

import { ERROR_CODES } from '~/common/enums'
import {
  DraftAssets,
  DraftAssets_node_Draft_assets as Asset,
} from '~/views/Me/DraftDetail/__generated__/DraftAssets'
import { DRAFT_ASSETS } from '~/views/Me/DraftDetail/gql'

const update = ({
  cache,
  id,
  asset,
}: {
  cache: DataProxy
  id: string
  asset: Asset
}) => {
  try {
    if (!id) {
      return
    }

    const variables = { id }
    const cacheData = cache.readQuery<DraftAssets>({
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

export default update

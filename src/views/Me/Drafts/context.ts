import { createCacheContext } from '~/components'

import { MeDraftFeed_viewer_drafts_edges } from './__generated__/MeDraftFeed'

export const DraftsContext =
  createCacheContext<MeDraftFeed_viewer_drafts_edges[]>()

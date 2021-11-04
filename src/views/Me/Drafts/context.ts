import { createContext, Dispatch, SetStateAction } from 'react'

import { MeDraftFeed_viewer_drafts_edges } from './__generated__/MeDraftFeed'

export const DraftContext = createContext<{
  edges: MeDraftFeed_viewer_drafts_edges[]
  setEdges: Dispatch<SetStateAction<MeDraftFeed_viewer_drafts_edges[]>>
}>({
  edges: [],
  setEdges: () => undefined,
})

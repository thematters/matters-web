import gql from 'graphql-tag'

import EditCollection from './EditCollection'
import EditCover from './EditCover'
import EditTags from './EditTags'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'

interface SidebarProps {
  draft: DraftSidebarDraft
}

const Sidebar = ({ draft }: SidebarProps) => (
  <>
    <EditCover draft={draft} />
    <EditTags draft={draft} />
    <EditCollection draft={draft} />
  </>
)

Sidebar.fragments = {
  draft: gql`
    fragment DraftSidebarDraft on Draft {
      id
      ...EditCoverDraft
      ...EditTagsDraft
      ...EditCollectionDraft
    }
    ${EditCover.fragments.draft}
    ${EditTags.fragments.draft}
    ${EditCollection.fragments.draft}
  `,
}

export default Sidebar

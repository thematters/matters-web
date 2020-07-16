import { gql } from '@apollo/client'

import AddCover from './AddCover'
import EditCollection from './EditCollection'
import EditTags from './EditTags'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'

interface SidebarProps {
  draft: DraftSidebarDraft
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

const Sidebar = ({ draft, setSaveStatus }: SidebarProps) => (
  <>
    <AddCover draft={draft} setSaveStatus={setSaveStatus} />
    <EditTags draft={draft} setSaveStatus={setSaveStatus} />
    <EditCollection draft={draft} setSaveStatus={setSaveStatus} />
  </>
)

Sidebar.fragments = {
  draft: gql`
    fragment DraftSidebarDraft on Draft {
      id
      ...AddCoverDraft
      ...EditTagsDraft
      ...EditCollectionDraft
    }
    ${AddCover.fragments.draft}
    ${EditTags.fragments.draft}
    ${EditCollection.fragments.draft}
  `,
}

export default Sidebar

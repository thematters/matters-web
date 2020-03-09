import gql from 'graphql-tag'

import AddCover from './AddCover'
import AddTags from './AddTags'
import CollectArticles from './CollectArticles'
import DraftList from './DraftList'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'

interface SidebarProps {
  draft: DraftSidebarDraft
  setSaveStatus: (status: 'saved' | 'saving' | 'saveFailed') => void
}

const Sidebar = ({ draft, setSaveStatus }: SidebarProps) => (
  <>
    <DraftList currentId={draft.id} />
    <AddCover draft={draft} setSaveStatus={setSaveStatus} />
    <AddTags draft={draft} setSaveStatus={setSaveStatus} />
    <CollectArticles draft={draft} setSaveStatus={setSaveStatus} />
  </>
)

Sidebar.fragments = {
  draft: gql`
    fragment DraftSidebarDraft on Draft {
      id
      ...AddCoverDraft
      ...AddTagsDraft
      ...CollectArticlesDraft
    }
    ${AddCover.fragments.draft}
    ${AddTags.fragments.draft}
    ${CollectArticles.fragments.draft}
  `
}

export default Sidebar

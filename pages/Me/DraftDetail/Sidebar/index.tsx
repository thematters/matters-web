import gql from 'graphql-tag'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'
import AddTags from './AddTags'
// import ConnectUpstream from './ConnectUpstream'
import DraftList from './DraftList'

const Sidebar = ({ draft }: { draft: DraftSidebarDraft }) => (
  <>
    <DraftList currentId={draft.id} />
    {/* <ConnectUpstream draft={draft} /> */}
    <AddTags draft={draft} />
  </>
)

Sidebar.fragments = {
  draft: gql`
    fragment DraftSidebarDraft on Draft {
      id
      ...AddTagsDraft
    }
    ${AddTags.fragments.draft}
  `
}

export default Sidebar

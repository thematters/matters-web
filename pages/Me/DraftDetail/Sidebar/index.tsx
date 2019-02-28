import gql from 'graphql-tag'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'
import ConnectUpstream from './ConnectUpstream'
import DraftList from './DraftList'

const Sidebar = ({ draft }: { draft: DraftSidebarDraft }) => (
  <>
    <DraftList />
    <ConnectUpstream draft={draft} />
  </>
)

Sidebar.fragments = {
  draft: gql`
    fragment DraftSidebarDraft on Draft {
      id
      ...ConnectUpstreamDraft
    }
    ${ConnectUpstream.fragments.draft}
  `
}

export default Sidebar

import gql from 'graphql-tag'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'
import AddTags from './AddTags'
import CollectArticles from './CollectArticles'
import DraftList from './DraftList'

const Sidebar = ({ draft }: { draft: DraftSidebarDraft }) => (
  <>
    <DraftList currentId={draft.id} />
    <AddTags draft={draft} />
    <CollectArticles draft={draft} />
  </>
)

Sidebar.fragments = {
  draft: gql`
    fragment DraftSidebarDraft on Draft {
      id
      ...AddTagsDraft
      ...CollectArticlesDraft
    }
    ${AddTags.fragments.draft}
    ${CollectArticles.fragments.draft}
  `
}

export default Sidebar

import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components/Viewer'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'
import AddCover from './AddCover'
import AddTags from './AddTags'
import CollectArticles from './CollectArticles'
import DraftList from './DraftList'

const Sidebar = ({ draft }: { draft: DraftSidebarDraft }) => {
  const viewer = useContext(ViewerContext)

  return (
    <>
      <DraftList currentId={draft.id} />
      <AddCover draft={draft} />
      <AddTags draft={draft} />
      {(viewer.isAdmin || viewer.isPartner) && (
        <CollectArticles draft={draft} />
      )}
    </>
  )
}

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

import gql from 'graphql-tag'
import { useContext } from 'react'

import { ViewerContext } from '~/components/Viewer'

import { DraftSidebarDraft } from './__generated__/DraftSidebarDraft'
import AddTags from './AddTags'
import CollectArticles from './CollectArticles'
import DraftList from './DraftList'

const Sidebar = ({ draft }: { draft: DraftSidebarDraft }) => {
  const viewer = useContext(ViewerContext)

  return (
    <>
      <DraftList currentId={draft.id} />
      <AddTags draft={draft} />
      {viewer.isAdmin && <CollectArticles draft={draft} />}
    </>
  )
}

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

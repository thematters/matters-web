import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { DraftDigest, Spinner, Translate } from '~/components'

import { TEXT } from '~/common/enums'

import Collapsable from '../Collapsable'
import {
  MeDraftsSidebar,
  MeDraftsSidebar_viewer_drafts_edges
} from './__generated__/MeDraftsSidebar'

const ME_DRAFTS_SIDEBAR = gql`
  query MeDraftsSidebar {
    viewer {
      id
      drafts(input: { first: null }) @connection(key: "viewerDrafts") {
        edges {
          node {
            id
            ...SidebarDigestDraft
          }
        }
      }
    }
  }
  ${DraftDigest.Sidebar.fragments.draft}
`

const DraftList = ({ currentId }: { currentId: string }) => {
  const { data, loading } = useQuery<MeDraftsSidebar>(ME_DRAFTS_SIDEBAR)
  const edges = data && data.viewer && data.viewer.drafts.edges

  return (
    <Collapsable
      title={
        <Translate zh_hans={TEXT.zh_hant.draft} zh_hant={TEXT.zh_hans.draft} />
      }
    >
      {loading && <Spinner />}
      {edges &&
        edges
          .filter(
            ({ node }: MeDraftsSidebar_viewer_drafts_edges) =>
              node.id !== currentId
          )
          .map(({ node }: MeDraftsSidebar_viewer_drafts_edges, i: number) => (
            <DraftDigest.Sidebar key={i} draft={node} />
          ))}
    </Collapsable>
  )
}

export default DraftList

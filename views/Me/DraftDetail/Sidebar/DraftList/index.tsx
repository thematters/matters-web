import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import { DraftDigest, Spinner, Translate } from '~/components'
import { Query } from '~/components/GQL'

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

const DraftList = ({ currentId }: { currentId: string }) => (
  <Collapsable
    title={
      <Translate zh_hans={TEXT.zh_hant.draft} zh_hant={TEXT.zh_hans.draft} />
    }
  >
    <Query query={ME_DRAFTS_SIDEBAR}>
      {({ data, loading }: QueryResult & { data: MeDraftsSidebar }) => {
        const edges = _get(data, 'viewer.drafts.edges')

        if (loading || !edges) {
          return <Spinner />
        }

        return edges
          .filter(
            ({ node }: MeDraftsSidebar_viewer_drafts_edges) =>
              node.id !== currentId
          )
          .map(({ node }: MeDraftsSidebar_viewer_drafts_edges, i: number) => (
            <DraftDigest.Sidebar key={i} draft={node} />
          ))
      }}
    </Query>
  </Collapsable>
)

export default DraftList

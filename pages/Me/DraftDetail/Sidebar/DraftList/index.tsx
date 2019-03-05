import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { DraftDigest, Spinner, Translate } from '~/components'

import Collapsable from '../Collapsable'
import {
  MeDrafts,
  MeDrafts_viewer_drafts_edges
} from './__generated__/MeDrafts'

const ME_DRAFTS = gql`
  query MeDrafts {
    viewer {
      id
      drafts(input: { first: 10 }) {
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
  <Collapsable title={<Translate zh_hans={'草稿'} zh_hant={'草稿'} />}>
    <Query query={ME_DRAFTS}>
      {({ data, loading }: QueryResult & { data: MeDrafts }) => {
        const edges = _get(data, 'viewer.drafts.edges')
        if (loading || !edges) {
          return <Spinner />
        }

        return edges
          .filter(
            ({ node }: MeDrafts_viewer_drafts_edges) => node.id !== currentId
          )
          .map(({ node }: MeDrafts_viewer_drafts_edges, i: number) => (
            <DraftDigest.Sidebar
              key={i}
              draft={node}
              refetchQueries={[{ query: ME_DRAFTS }]}
            />
          ))
      }}
    </Query>
  </Collapsable>
)

export default DraftList

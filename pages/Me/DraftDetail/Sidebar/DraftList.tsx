import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Query, QueryResult } from 'react-apollo'

import { DraftDigest, Spinner, Translate } from '~/components'

import {
  MeDrafts,
  MeDrafts_viewer_drafts_edges
} from './__generated__/MeDrafts'
import Collapsable from './Collapsable'

const ME_DRAFTS = gql`
  query MeDrafts {
    viewer {
      id
      drafts(input: { first: 5 }) {
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

const DraftList = () => (
  <Collapsable title={<Translate zh_hans={'草稿'} zh_hant={'草稿'} />}>
    <Query query={ME_DRAFTS}>
      {({ data, loading }: QueryResult & { data: MeDrafts }) => {
        const edges = _get(data, 'viewer.drafts.edges')
        if (loading || !edges) {
          return <Spinner />
        }

        return edges.map(({ node }: MeDrafts_viewer_drafts_edges) => (
          <DraftDigest.Sidebar
            draft={node}
            refetchQueries={[{ query: ME_DRAFTS }]}
          />
        ))
      }}
    </Query>
  </Collapsable>
)

export default DraftList

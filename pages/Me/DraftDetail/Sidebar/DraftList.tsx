import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { DraftDigest, Icon, Spinner, TextIcon, Translate } from '~/components'

import COLLAPSE_BRANCH from '~/static/icons/collapse-branch.svg?sprite'

import {
  MeDrafts,
  MeDrafts_viewer_drafts_edges
} from './__generated__/MeDrafts'
import styles from './styles.css'

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

const DraftList = () => {
  const [collapsed, toggleCollapse] = useState(true)

  return (
    <>
      <div
        onClick={() => {
          toggleCollapse(!collapsed)
        }}
        className={`sidebar-title-${collapsed ? 'collapsed' : 'expanded'}`}
      >
        <TextIcon
          icon={
            <Icon
              id={COLLAPSE_BRANCH.id}
              viewBox={COLLAPSE_BRANCH.viewBox}
              style={{
                width: 14,
                height: 14,
                transform: `rotate(${collapsed ? 180 : 0}deg)`
              }}
            />
          }
          className={'sidebar-title'}
          textPlacement={'left'}
        >
          <Translate zh_hans={'草稿'} zh_hant={'草稿'} />
        </TextIcon>
      </div>
      <Query query={ME_DRAFTS}>
        {({ data, loading }: QueryResult & { data: MeDrafts }) => {
          if (collapsed) {
            return null
          }
          const edges = _get(data, 'viewer.drafts.edges')
          if (loading || !edges) {
            return <Spinner />
          }

          return edges.map(({ node }: MeDrafts_viewer_drafts_edges) => (
            <DraftDigest.Sidebar draft={node} />
          ))
        }}
      </Query>
      <hr />
      <style jsx>{styles}</style>
    </>
  )
}

export default DraftList

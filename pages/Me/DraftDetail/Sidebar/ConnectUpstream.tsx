import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useState } from 'react'
import { Mutation, Query, QueryResult } from 'react-apollo'

import {
  ArticleDigest,
  Button,
  Dropdown,
  Icon,
  PopperInstance,
  Spinner,
  TextIcon,
  Translate
} from '~/components'

import COLLAPSE_BRANCH from '~/static/icons/collapse-branch.svg?sprite'

import { ConnectUpstreamDraft } from './__generated__/ConnectUpstreamDraft'
import {
  SearchUpstream,
  SearchUpstream_search_edges_node_Article
} from './__generated__/SearchUpstream'
import styles from './styles.css'

const SEARCH_UPSTREAM = gql`
  query SearchUpstream(
    $search: String!
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    search(input: { key: $search, type: Article, first: 10 }) {
      edges {
        cursor
        node {
          ... on Article {
            id
            title
            ...RelatedDigestArticle
          }
        }
      }
    }
  }
  ${ArticleDigest.Related.fragments.article}
`

const SET_UPSTREAM = gql`
  mutation SetUpstream($id: ID!, $upstream: ID) {
    putDraft(input: { id: $id, upstreamId: $upstream }) {
      id
      upstream {
        id
        title
      }
    }
  }
`

const ConnectUpstream = ({ draft }: { draft: ConnectUpstreamDraft }) => {
  // collapse state
  const [collapsed, toggleCollapse] = useState<boolean>(true)

  // dropdown state
  const [instance, setInstance] = useState<PopperInstance | null>(null)

  // search state
  const [search, setSearch] = useState(
    (draft.upstream && draft.upstream.title) || ''
  )

  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  const showDropdown = () => {
    if (instance) {
      setTimeout(() => {
        instance.show()
      }, 100) // unknown bug, needs set a timeout
    }
  }

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
          textPlacement={'left'}
        >
          <Translate zh_hans={'连接上游文章'} zh_hant={'連結上游文章'} />
        </TextIcon>
      </div>
      {!collapsed && (
        <>
          <span className={'sidebar-description'}>
            <Translate
              zh_hans={'通过连接上游帮助读者更好地找到你的文章。'}
              zh_hant={'通過連結上游幫助讀者更好地找到你的文章。'}
            />
          </span>
          <Query query={SEARCH_UPSTREAM} variables={{ search }}>
            {({ data, loading }: QueryResult & { data: SearchUpstream }) => (
              <Mutation mutation={SET_UPSTREAM}>
                {mutateUpsteam => (
                  <Dropdown
                    content={
                      loading ? (
                        <Spinner />
                      ) : (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          {data.search.edges.map(
                            ({
                              node,
                              cursor
                            }: {
                              node: SearchUpstream_search_edges_node_Article
                              cursor: string
                            }) => (
                              <span
                                key={cursor}
                                onClick={() => {
                                  setSearch(node.title)
                                  mutateUpsteam({
                                    variables: {
                                      id: draft.id,
                                      upstream: node.id
                                    }
                                  })
                                }}
                              >
                                {node.title}
                                {/* TODO:
                              change to ArticleDigest.Dropdown */}
                              </span>
                            )
                          )}
                        </div>
                      )
                    }
                    zIndex={101}
                    onCreate={i => setInstance(i)}
                  >
                    <span style={{ display: 'flex' }}>
                      <input
                        type="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onFocus={showDropdown}
                        onBlur={hideDropdown}
                      />
                      <Button
                        bgColor="white"
                        is="span"
                        outlineColor="green"
                        size="small"
                        onClick={() => {
                          setSearch('')
                          mutateUpsteam({
                            variables: {
                              id: draft.id,
                              upstream: null
                            }
                          })
                        }}
                      >
                        <Translate zh_hans={'解除'} zh_hant={'解除'} />
                      </Button>
                    </span>
                  </Dropdown>
                )}
              </Mutation>
            )}
          </Query>
        </>
      )}
      <hr />
      <style jsx>{styles}</style>
    </>
  )
}

ConnectUpstream.fragments = {
  draft: gql`
    fragment ConnectUpstreamDraft on Draft {
      id
      upstream {
        id
        title
      }
    }
  `
}

export default ConnectUpstream

import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
import { useContext, useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import { Dropdown, LanguageContext, Spinner, Translate } from '~/components'

import { translate } from '~/common/utils'

import {
  SearchTagsQuery,
  SearchTagsQuery_search_edges_node_Tag
} from './__generated__/SearchTagsQuery'
import styles from './styles.css'

const SEARCH_TAGS = gql`
  query SearchTagsQuery($search: String!) {
    search(input: { key: $search, type: Tag, first: 5 }) {
      edges {
        node {
          ... on Tag {
            id
            content
            articles(input: { first: 0 }) {
              totalCount
            }
          }
        }
      }
    }
  }
`

const SearchTags = ({
  hasTags,
  addTag
}: {
  hasTags: boolean
  addTag: (tag: string) => void
}) => {
  const { lang } = useContext(LanguageContext)

  const [search, setSearch] = useState('')

  const DropdownContent = ({
    tags
  }: {
    tags: SearchTagsQuery_search_edges_node_Tag[]
  }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '10.5rem',
        justifyContent: 'start'
      }}
    >
      {tags.map(tag => (
        <span
          className="tag-search"
          onClick={() => addTag(tag.content)}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            height: 40,
            alignItems: 'center'
          }}
        >
          <span style={{ marginLeft: '1rem', marginRight: '0.5rem' }}>
            {tag.content}
          </span>
          <span className="tag-count">{tag.articles.totalCount}</span>
        </span>
      ))}
      <hr />
      <span
        className="tag-search"
        style={{ height: '3.25rem', display: 'flex', alignItems: 'center' }}
        onClick={() => addTag(search)}
      >
        <span style={{ marginLeft: '1rem' }}>
          <Translate zh_hans="创建" zh_hant="創建" />
        </span>
        <span> {search} </span>
      </span>
      <style jsx>{styles}</style>
    </div>
  )

  return (
    <>
      <Query query={SEARCH_TAGS} variables={{ search }}>
        {({ data, loading }: QueryResult & { data: SearchTagsQuery }) => (
          <Dropdown
            content={
              loading ? (
                <Spinner />
              ) : (
                <DropdownContent
                  tags={data.search.edges.map(
                    ({
                      node
                    }: {
                      node: SearchTagsQuery_search_edges_node_Tag
                    }) => node
                  )}
                />
              )
            }
          >
            <input
              onChange={e => setSearch(e.target.value)}
              value={search}
              style={{ fontSize: 14, marginTop: 16 }}
              placeholder={translate({
                zh_hans: '增加標籤…',
                zh_hant: '增加标签…',
                lang
              })}
            />
          </Dropdown>
        )}
      </Query>
      <style jsx>{styles}</style>
    </>
  )
}

export default SearchTags

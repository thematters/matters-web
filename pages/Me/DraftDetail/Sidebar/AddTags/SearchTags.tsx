import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useState } from 'react'
import { Query, QueryResult } from 'react-apollo'

import {
  Dropdown,
  LanguageContext,
  Menu,
  PopperInstance,
  Spinner
} from '~/components'

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

const DropdownContent = ({
  tags,
  search,
  addTag,
  hideDropdown,
  loading
}: {
  tags: SearchTagsQuery_search_edges_node_Tag[]
  search: string
  addTag: (tag: string) => void
  hideDropdown: () => void
  loading: boolean
}) =>
  loading ? (
    <Menu>
      <Menu.Item>
        <Spinner />
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      {tags.map(tag => (
        <Menu.Item
          spacing={['xtight', 'tight']}
          hoverBgColor="green"
          key={tag.content}
        >
          <button
            className="search-tag-item"
            type="button"
            onClick={() => {
              addTag(tag.content)
              hideDropdown()
            }}
          >
            <span>{tag.content}</span>
            <span className="search-tag-count">{tag.articles.totalCount}</span>
            <style jsx>{styles}</style>
          </button>
        </Menu.Item>
      ))}
    </Menu>
  )

const SearchTags = ({
  hasTags,
  addTag
}: {
  hasTags: boolean
  addTag: (tag: string) => void
}) => {
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (instance) {
      instance.hide()
    }
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
      <Query query={SEARCH_TAGS} variables={{ search }} skip={!search}>
        {({ data, loading }: QueryResult & { data: SearchTagsQuery }) => {
          return (
            <Dropdown
              trigger="manual"
              onCreate={i => setInstance(i)}
              content={
                <DropdownContent
                  loading={loading}
                  search={search}
                  tags={_get(data, 'search.edges', []).map(
                    ({
                      node
                    }: {
                      node: SearchTagsQuery_search_edges_node_Tag
                    }) => node
                  )}
                  addTag={(tag: string) => {
                    addTag(tag)
                    setSearch('')
                  }}
                  hideDropdown={hideDropdown}
                />
              }
            >
              <input
                className="search-tag-input"
                onChange={e => {
                  const value = e.target.value
                  setSearch(value)
                  if (value) {
                    showDropdown()
                  } else {
                    hideDropdown()
                  }
                }}
                onFocus={() => search && showDropdown()}
                onClick={() => search && showDropdown()}
                value={search}
                placeholder={translate({
                  zh_hans: '增加標籤…',
                  zh_hant: '增加标签…',
                  lang
                })}
              />
            </Dropdown>
          )
        }}
      </Query>
      <style jsx>{styles}</style>
    </>
  )
}

export default SearchTags

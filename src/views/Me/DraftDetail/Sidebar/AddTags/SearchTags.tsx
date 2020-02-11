import { useQuery } from '@apollo/react-hooks'
import { useContext, useState } from 'react'
import { useDebounce } from 'use-debounce/lib'

import {
  Dropdown,
  hidePopperOnClick,
  LanguageContext,
  Menu,
  PopperInstance,
  Spinner,
  Translate
} from '~/components'
import SEARCH_TAGS from '~/components/GQL/queries/searchTags'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { numAbbr, translate } from '~/common/utils'

import styles from './styles.css'

import {
  SearchTagsQuery,
  SearchTagsQuery_search_edges_node_Tag
} from '~/components/GQL/queries/__generated__/SearchTagsQuery'

const DropdownContent = ({
  tags,
  search,
  addTag,
  loading
}: {
  tags: SearchTagsQuery_search_edges_node_Tag[]
  search: string
  addTag: (tag: string) => void
  loading: boolean
}) =>
  loading ? (
    <Menu width="sm">
      <Menu.Item>
        <Spinner />
      </Menu.Item>
    </Menu>
  ) : (
    <>
      <Menu width="sm">
        {tags.map(tag => (
          <Menu.Item
            onClick={() => {
              addTag(tag.content)
            }}
            key={tag.content}
          >
            <span className="search-tag-item">
              <span>{tag.content}</span>
              <span className="count">{numAbbr(tag.articles.totalCount)}</span>
            </span>
          </Menu.Item>
        ))}

        {tags && tags.length > 0 && <Menu.Divider />}

        <Menu.Item
          onClick={() => {
            addTag(search)
          }}
        >
          <span className="search-tag-item">
            <Translate zh_hant="創建" zh_hans="创建" />
            <span className="keyword">{search}</span>
          </span>
        </Menu.Item>
      </Menu>

      <style jsx>{styles}</style>
    </>
  )

const SearchTags = ({ addTag }: { addTag: (tag: string) => void }) => {
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (instance) {
      instance.hide()
    }
  }
  const showDropdown = () => {
    if (instance) {
      instance.show()
    }
  }

  const { data, loading } = useQuery<SearchTagsQuery>(SEARCH_TAGS, {
    variables: { search: debouncedSearch },
    skip: !debouncedSearch
  })

  return (
    <>
      <Dropdown
        trigger="manual"
        onCreate={setInstance}
        onShown={i => {
          hidePopperOnClick(i)
        }}
        content={
          <DropdownContent
            loading={loading}
            search={search}
            tags={
              (data?.search.edges || []).map(
                ({ node }) => node
              ) as SearchTagsQuery_search_edges_node_Tag[]
            }
            addTag={(tag: string) => {
              addTag(tag)
              setSearch('')
            }}
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
            zh_hant: '增加標籤…',
            zh_hans: '增加标签…',
            lang
          })}
        />
      </Dropdown>

      <style jsx>{styles}</style>
    </>
  )
}

export default SearchTags

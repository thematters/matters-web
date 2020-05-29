import { useQuery } from '@apollo/react-hooks'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

import {
  Dropdown,
  DropdownArticleList,
  hidePopperOnClick,
  LanguageContext,
  PopperInstance,
} from '~/components'
import SEARCH_ARTICLES from '~/components/GQL/queries/searchArticles'

import { INPUT_DEBOUNCE } from '~/common/enums'
import { translate } from '~/common/utils'

import styles from './styles.css'

import {
  SearchArticles,
  SearchArticles_search_edges_node_Article,
} from '~/components/GQL/queries/__generated__/SearchArticles'

interface Props {
  onAdd: (article: SearchArticles_search_edges_node_Article) => void
}

const CollectForm: React.FC<Props> = ({ onAdd }) => {
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, INPUT_DEBOUNCE)
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const inputNode: React.RefObject<HTMLInputElement> | null = useRef(null)

  // query
  const { loading, data } = useQuery<SearchArticles>(SEARCH_ARTICLES, {
    variables: { search: debouncedSearch },
    skip: !debouncedSearch,
  })
  const articles = (data?.search.edges || [])
    .filter(({ node }) => node.__typename === 'Article')
    .map(({ node }) => node) as SearchArticles_search_edges_node_Article[]

  // dropdown
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
  const isShowDropdown = (articles && articles.length) || loading

  useEffect(() => {
    if (isShowDropdown) {
      showDropdown()
    } else {
      hideDropdown()
    }
  })

  return (
    <>
      <Dropdown
        trigger="manual"
        onShown={hidePopperOnClick}
        placement="bottom-start"
        onCreate={setInstance}
        content={
          <DropdownArticleList
            articles={articles}
            loading={loading}
            onClick={(article) => {
              onAdd(article)
              setSearch('')
              if (inputNode && inputNode.current) {
                inputNode.current.value = ''
              }
            }}
          />
        }
      >
        <input
          ref={inputNode}
          type="search"
          placeholder={translate({
            zh_hant: '搜尋內容或 URL',
            zh_hans: '搜索内容或 URL',
            lang,
          })}
          onChange={(event) => {
            const value = event.target.value
            setSearch(value)
          }}
          onFocus={() => {
            if (isShowDropdown) {
              showDropdown()
            }
          }}
        />
      </Dropdown>

      <style jsx>{styles}</style>
    </>
  )
}

export default CollectForm

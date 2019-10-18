import _debounce from 'lodash/debounce'
import { useContext, useRef, useState } from 'react'
import { useQuery } from 'react-apollo'

import ArticleList from '~/components/Dropdown/ArticleList'
import {
  SearchArticles,
  SearchArticles_search_edges_node_Article
} from '~/components/GQL/queries/__generated__/SearchArticles'
import SEARCH_ARTICLES from '~/components/GQL/queries/searchArticles'
import { LanguageContext } from '~/components/Language'
import { Dropdown, PopperInstance } from '~/components/Popper'

import { translate } from '~/common/utils'

import styles from './styles.css'

interface Props {
  onAdd: (article: SearchArticles_search_edges_node_Article) => void
}

const debouncedSetSearch = _debounce((value, setSearch) => {
  setSearch(value)
}, 300)

const CollectForm: React.FC<Props> = ({ onAdd }) => {
  const { lang } = useContext(LanguageContext)
  const [search, setSearch] = useState('')
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const inputNode: React.RefObject<HTMLInputElement> | null = useRef(null)
  const { loading, data } = useQuery<SearchArticles>(SEARCH_ARTICLES, {
    variables: { search },
    skip: !search
  })
  const articles = ((data && data.search.edges) || [])
    .filter(({ node }) => node.__typename === 'Article')
    .map(({ node }) => node) as SearchArticles_search_edges_node_Article[]

  // dropdown
  const isShowDropdown = (articles && articles.length) || loading
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

  if (isShowDropdown) {
    showDropdown()
  } else {
    hideDropdown()
  }

  return (
    <>
      <Dropdown
        trigger="manual"
        placement="bottom-start"
        onCreate={setInstance}
        content={
          <ArticleList
            articles={articles}
            loading={loading}
            onClick={article => {
              onAdd(article)
              setSearch('')
              hideDropdown()
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
            zh_hant: '搜尋作品標題…',
            zh_hans: '搜索作品标题…',
            lang
          })}
          onChange={event => {
            const value = event.target.value
            debouncedSetSearch(value, setSearch)
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

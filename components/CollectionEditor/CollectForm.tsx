import _debounce from 'lodash/debounce'
import _get from 'lodash/get'
import { FC, useContext, useState } from 'react'
import { QueryResult } from 'react-apollo'

import ArticleList from '~/components/Dropdown/ArticleList'
import { Query } from '~/components/GQL'
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
  onAdd: (articleId: string) => void
}

const debouncedSetSearch = _debounce((value, setSearch) => {
  setSearch(value)
}, 300)

const CollectForm: FC<Props> = ({ onAdd }) => {
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
    <Query query={SEARCH_ARTICLES} variables={{ search }} skip={!search}>
      {({ data, loading }: QueryResult & { data: SearchArticles }) => {
        const articles = _get(data, 'search.edges', []).map(
          ({ node }: { node: SearchArticles_search_edges_node_Article }) => node
        )
        const isShowDropdown = (articles && articles.length) || loading

        if (isShowDropdown) {
          showDropdown()
        } else {
          hideDropdown()
        }

        return (
          <>
            <Dropdown
              maxWidth="20rem"
              trigger="manual"
              placement="bottom-start"
              onCreate={setInstance}
              content={
                <ArticleList
                  articles={articles}
                  loading={loading}
                  onClick={(
                    article: SearchArticles_search_edges_node_Article
                  ) => {
                    onAdd(article.id)
                    setSearch('')
                    hideDropdown()
                  }}
                />
              }
            >
              <input
                type="search"
                placeholder={translate({
                  zh_hant: '搜索標題或作者…',
                  zh_hans: '搜索标题或作者…',
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
      }}
    </Query>
  )
}

export default CollectForm

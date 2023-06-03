import _uniq from 'lodash/uniq'
import _without from 'lodash/without'
import { useContext, useEffect, useState } from 'react'

import {
  SEARCH_HISTORY_DISPLAY_LENGTH,
  SEARCH_HISTORY_LENGTH,
  STORAGE_KEY_SEARCH_HISTORY,
} from '~/common/enums'
import { storage } from '~/common/utils'
import {
  Head,
  Layout,
  Media,
  SearchBar,
  SearchHistory,
  useRoute,
  ViewerContext,
} from '~/components'

import AggregateResults from './AggregateResults'
// import EmptySearch from './EmptySearch'
import styles from './styles.module.css'
const Search = () => {
  const viewer = useContext(ViewerContext)
  const storageKey = STORAGE_KEY_SEARCH_HISTORY + '_' + viewer.id

  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const updateSearchHistory = (value: string[]) => {
    storage.set(storageKey, value)
    setSearchHistory(value)
  }

  const addSearchHistory = (searchKey: string) => {
    const nsh = _uniq([searchKey, ...(storage.get(storageKey) || [])]).slice(
      0,
      SEARCH_HISTORY_LENGTH
    )
    updateSearchHistory(nsh)
  }

  const removeSearchHistory = (searchKey: string) => {
    const nsh = _without(searchHistory, searchKey)
    updateSearchHistory(nsh)
  }

  const { getQuery } = useRoute()
  const q = getQuery('q')

  const isHistory = !q
  const isAggregate = !isHistory

  useEffect(() => {
    if (!isHistory) return

    setSearchHistory(storage.get(storageKey))
  }, [storageKey])

  useEffect(() => {
    if (!isAggregate) return

    addSearchHistory(q)
  }, [isAggregate, q, storageKey])

  return (
    <Layout.Main>
      <Media lessThan="xl">
        <Layout.Header
          right={
            <section className="layoutHeaderRight">
              <SearchBar hasDropdown={false} />
            </section>
          }
        />
      </Media>

      <Head title={{ id: 'search' }} />
      {isHistory && (
        <Media lessThan="xl">
          <SearchHistory
            data={searchHistory?.slice(0, SEARCH_HISTORY_DISPLAY_LENGTH)}
            removeSearchHistoryItem={removeSearchHistory}
          />
        </Media>
      )}
      {isAggregate && <AggregateResults />}
    </Layout.Main>
  )
}

export default Search

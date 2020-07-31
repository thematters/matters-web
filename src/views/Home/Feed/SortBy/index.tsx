import { Tabs, Translate } from '~/components'

export type SortByType = 'hottest' | 'newest' | 'icymi' | 'topics'

interface SortByProps {
  sortBy: SortByType
  setSortBy: (sortBy: SortByType) => void
}

const SortBy: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
  const isHottest = sortBy === 'hottest'
  const isNewset = sortBy === 'newest'
  const isICYMI = sortBy === 'icymi'
  const isTopics = sortBy === 'topics'

  return (
    <Tabs sticky>
      <Tabs.Tab onClick={() => setSortBy('hottest')} selected={isHottest}>
        <Translate zh_hant="熱門" zh_hans="热门" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('newest')} selected={isNewset}>
        <Translate zh_hant="最新" zh_hans="最新" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('topics')} selected={isTopics}>
        <Translate zh_hant="熱議" zh_hans="热议" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('icymi')} selected={isICYMI}>
        <Translate zh_hant="精華" zh_hans="精华" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SortBy

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
        <Translate zh_hant="都在看" zh_hans="都在看" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('newest')} selected={isNewset}>
        <Translate zh_hant="新作品" zh_hans="新作品" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('topics')} selected={isTopics}>
        <Translate zh_hant="正在聊" zh_hans="正在聊" />
      </Tabs.Tab>

      <Tabs.Tab onClick={() => setSortBy('icymi')} selected={isICYMI}>
        <Translate zh_hant="值得讀" zh_hans="值得读" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default SortBy

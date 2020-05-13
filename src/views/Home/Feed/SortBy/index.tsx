import { Button, TextIcon, Translate } from '~/components'

import styles from './styles.css'

export type SortByType = 'hottest' | 'newest' | 'icymi' | 'topics'

interface SortByProps {
  sortBy: SortByType
  setSortBy: (sortBy: SortByType) => void
}

type SortByButtonProps = SortByProps & {
  active: boolean
}

const SortByButton: React.FC<SortByButtonProps> = ({
  sortBy,
  setSortBy,
  active,
  children,
}) => (
  <Button
    spacing={['xtight', 'base']}
    bgColor={active ? 'green-lighter' : 'white'}
    bgActiveColor={active ? 'green-lighter' : 'grey-lighter'}
    onClick={() => setSortBy(sortBy)}
  >
    <TextIcon size="md" color={active ? 'green' : 'grey'} weight="semibold">
      {children}
    </TextIcon>
  </Button>
)

const SortBy: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
  const isHottest = sortBy === 'hottest'
  const isNewset = sortBy === 'newest'
  const isICYMI = sortBy === 'icymi'
  const isTopics = sortBy === 'topics'

  return (
    <ul role="tablist">
      <li role="tab">
        <SortByButton sortBy="hottest" setSortBy={setSortBy} active={isHottest}>
          <Translate zh_hant="熱門" zh_hans="热门" />
        </SortByButton>
      </li>

      <li role="tab">
        <SortByButton sortBy="newest" setSortBy={setSortBy} active={isNewset}>
          <Translate zh_hant="最新" zh_hans="最新" />
        </SortByButton>
      </li>

      <li role="tab">
        <SortByButton sortBy="icymi" setSortBy={setSortBy} active={isICYMI}>
          <Translate zh_hant="精選" zh_hans="精选" />
        </SortByButton>
      </li>

      <li role="tab">
        <SortByButton sortBy="topics" setSortBy={setSortBy} active={isTopics}>
          <Translate zh_hant="熱議" zh_hans="热议" />
        </SortByButton>
      </li>

      <style jsx>{styles}</style>
    </ul>
  )
}

export default SortBy

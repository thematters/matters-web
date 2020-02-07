import { Button, Icon, TextIcon, Translate } from '~/components'

interface SortByProps {
  sortBy: 'hottest' | 'newest'
  setSortBy: (sortBy: 'hottest' | 'newest') => void
}

const SortBy: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
  const isHottest = sortBy === 'hottest'

  return (
    <Button
      size={[null, '1.5rem']}
      spacing={[0, 'xtight']}
      bgHoverColor="green-lighter"
      onClick={() => {
        setSortBy(isHottest ? 'newest' : 'hottest')
      }}
    >
      <TextIcon
        icon={isHottest ? <Icon.Trends /> : <Icon.HistoryMedium />}
        size="sm"
        color="green"
      >
        {isHottest && <Translate zh_hant="最新排序" zh_hans="最新排序" />}
        {!isHottest && <Translate zh_hant="熱門排序" zh_hans="热门排序" />}
      </TextIcon>
    </Button>
  )
}

export default SortBy

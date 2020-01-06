import { Icon, TextIcon, Translate } from '~/components'

import styles from './styles.css'

interface SortByProps {
  sortBy: 'hottest' | 'newest'
  setSortBy: (sortBy: 'hottest' | 'newest') => void
}

const SortBy: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
  const isHottest = sortBy === 'hottest'

  return (
    <>
      <button
        type="button"
        className="sort-button"
        onClick={() => {
          setSortBy(isHottest ? 'newest' : 'hottest')
        }}
      >
        <TextIcon
          icon={isHottest ? <Icon.Trends /> : <Icon.ReadingHistoryGreen />}
          size="sm"
          spacing="xtight"
          color="green"
        >
          {isHottest && <Translate zh_hant="最新排序" zh_hans="最新排序" />}
          {!isHottest && <Translate zh_hant="熱門排序" zh_hans="热门排序" />}
        </TextIcon>
      </button>

      <style jsx>{styles}</style>
    </>
  )
}

export default SortBy

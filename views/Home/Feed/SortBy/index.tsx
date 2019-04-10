import { Icon, TextIcon, Translate } from '~/components'

import ICON_READING_HISTORY_GREEN from '~/static/icons/reading-history-green.svg?sprite'
import ICON_TRENDS from '~/static/icons/trends.svg?sprite'

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
          icon={
            <Icon
              id={isHottest ? ICON_READING_HISTORY_GREEN.id : ICON_TRENDS.id}
              viewBox={
                isHottest
                  ? ICON_READING_HISTORY_GREEN.viewBox
                  : ICON_TRENDS.viewBox
              }
              size="small"
            />
          }
          spacing="xtight"
          size="sm"
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

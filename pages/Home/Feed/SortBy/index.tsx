import classNames from 'classnames'

import { Dropdown, Icon, Menu, TextIcon } from '~/components'

import ICON_EXPAND from '~/static/icons/expand.svg?sprite'
import styles from './styles.css'

interface SortByProps {
  sortBy: string
  setSortBy: (sortBy: string) => void
}

const DropdownContent: React.FC<SortByProps> = ({ sortBy, setSortBy }) => {
  const hottestBtnClasses = classNames({
    dropdownBtn: true,
    active: sortBy === 'hottest'
  })
  const newestBtnClasses = classNames({
    dropdownBtn: true,
    active: sortBy === 'newest'
  })

  return (
    <>
      <Menu>
        <Menu.Item>
          <button
            type="button"
            onClick={() => setSortBy('hottest')}
            className={hottestBtnClasses}
          >
            熱門排序
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            type="button"
            onClick={() => setSortBy('newest')}
            className={newestBtnClasses}
          >
            最新排序
          </button>
        </Menu.Item>
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

const SortBy: React.FC<SortByProps> = props => (
  <>
    <Dropdown content={<DropdownContent {...props} />}>
      <button type="button" className="sortBtn">
        <TextIcon
          icon={
            <Icon
              id={ICON_EXPAND.id}
              viewBox={ICON_EXPAND.viewBox}
              style={{ width: 6, height: 10 }}
            />
          }
          spacing="xtight"
          text="排序"
          textPlacement="left"
        />
      </button>
    </Dropdown>
    <style jsx>{styles}</style>
  </>
)

export default SortBy

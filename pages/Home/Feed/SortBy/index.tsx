import classNames from 'classnames'
import { useState } from 'react'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { Menu } from '~/components/Menu'
import { Dropdown, PopperInstance } from '~/components/Popper'
import { TextIcon } from '~/components/TextIcon'

import ICON_EXPAND from '~/static/icons/expand.svg?sprite'

import styles from './styles.css'

interface SortByProps {
  sortBy: string
  setSortBy: (sortBy: string) => void
}

const DropdownContent: React.FC<SortByProps & { hideDropdown: () => void }> = ({
  sortBy,
  setSortBy,
  hideDropdown
}) => {
  const hottestBtnClasses = classNames({
    'dropdown-button': true,
    active: sortBy === 'hottest'
  })
  const newestBtnClasses = classNames({
    'dropdown-button': true,
    active: sortBy === 'newest'
  })

  return (
    <>
      <Menu>
        <Menu.Item>
          <button
            type="button"
            onClick={() => {
              setSortBy('hottest')
              hideDropdown()
            }}
            className={hottestBtnClasses}
          >
            <Translate zh_hant="熱門排序" zh_hans="热门排序" />
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            type="button"
            onClick={() => {
              setSortBy('newest')
              hideDropdown()
            }}
            className={newestBtnClasses}
          >
            <Translate zh_hant="最新排序" zh_hans="最新排序" />
          </button>
        </Menu.Item>
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

const SortBy: React.FC<SortByProps> = props => {
  const [instance, setInstance] = useState<PopperInstance | null>(null)
  const hideDropdown = () => {
    if (!instance) {
      return
    }
    instance.hide()
  }

  return (
    <>
      <Dropdown
        content={<DropdownContent {...props} hideDropdown={hideDropdown} />}
        trigger="click"
        onCreate={i => setInstance(i)}
      >
        <button type="button" className="sort-button">
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
}

export default SortBy

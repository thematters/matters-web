import classNames from 'classnames'

import { Menu, Translate } from '~/components'

import { toPath } from '~/common/utils'

import styles from './styles.css'

interface FallbackSearchItemProps {
  searchKey: string
  inPage?: boolean
}

const FallbackSearchItem = ({ searchKey, inPage }: FallbackSearchItemProps) => {
  const itemClasses = classNames({
    'key highlight': true,
    inPage,
  })

  return (
    <Menu.Item
      {...toPath({
        page: 'search',
        q: searchKey,
      })}
    >
      <span className={itemClasses}>
        <Translate id="search" />

        <b>&nbsp;{searchKey}</b>

        <style jsx>{styles}</style>
      </span>
    </Menu.Item>
  )
}

export default FallbackSearchItem

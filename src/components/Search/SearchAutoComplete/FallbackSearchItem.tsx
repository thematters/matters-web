import classNames from 'classnames'

import { Menu, Translate } from '~/components'

import { ANALYTICS_EVENTS } from '~/common/enums'
import { analytics, toPath } from '~/common/utils'

import styles from './styles.css'

interface FallbackSearchItemProps {
  searchKey: string
  inPage?: boolean
}

const FallbackSearchItem = ({ searchKey, inPage }: FallbackSearchItemProps) => {
  const itemClass = classNames({
    'key highlight': true,
    inPage
  })

  return (
    <Menu.Item
      {...toPath({
        page: 'search',
        q: searchKey
      })}
      onClick={() => {
        analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FREQUENT_SEARCH, {
          location: -1,
          entrance: searchKey
        })
      }}
    >
      <span className={itemClass}>
        <Translate id="search" />

        <b>&nbsp;{searchKey}</b>

        <style jsx>{styles}</style>
      </span>
    </Menu.Item>
  )
}

export default FallbackSearchItem

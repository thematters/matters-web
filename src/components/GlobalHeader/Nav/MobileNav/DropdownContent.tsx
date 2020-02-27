import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Menu, Translate } from '~/components'

import { PATHS } from '~/common/enums'

import styles from './styles.css'

const DropdownContent: React.FC<{
  isInDropdown?: boolean
  unread: boolean
}> = ({ isInDropdown, unread }) => {
  const router = useRouter()
  const homeClasses = classNames({
    'nav-link': true,
    active: router.pathname === PATHS.HOME.href
  })
  const followClasses = classNames({
    'nav-link': true,
    unread,
    active: router.pathname === PATHS.FOLLOW.href
  })

  return (
    <>
      <Menu width={isInDropdown ? 'sm' : undefined}>
        <Menu.Item {...PATHS.HOME}>
          <span className={homeClasses}>
            <Translate id="discover" />
          </span>
        </Menu.Item>
        <Menu.Item {...PATHS.FOLLOW}>
          <span className={followClasses}>
            <Translate id="follow" />
          </span>
        </Menu.Item>
      </Menu>

      <style jsx>{styles}</style>
    </>
  )
}

export default DropdownContent

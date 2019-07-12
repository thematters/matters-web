import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Menu, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import styles from './styles.css'

const DropdownContent: React.FC<{
  hideDropdown: () => void
  unread: boolean
}> = ({ hideDropdown, unread }) => {
  const router = useRouter()
  const homeClasses = classNames({
    'nav-link': true,
    active: router && router.pathname === PATHS.HOME.href
  })
  const followClasses = classNames({
    'nav-link': true,
    unread,
    active: router && router.pathname === PATHS.FOLLOW.href
  })

  return (
    <>
      <Menu>
        <Menu.Item>
          <Link {...PATHS.HOME}>
            <a onClick={hideDropdown} className={homeClasses}>
              <Translate
                zh_hant={TEXT.zh_hant.discover}
                zh_hans={TEXT.zh_hans.discover}
              />
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link {...PATHS.FOLLOW}>
            <a onClick={hideDropdown} className={followClasses}>
              <Translate
                zh_hant={TEXT.zh_hant.follow}
                zh_hans={TEXT.zh_hans.follow}
              />
            </a>
          </Link>
        </Menu.Item>
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

export default DropdownContent

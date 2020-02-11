import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Menu, Translate } from '~/components'

import { PATHS, TEXT } from '~/common/enums'

import styles from './styles.css'

const DropdownContent: React.FC<{
  unread: boolean
}> = ({ unread }) => {
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
      <Menu width="sm">
        <Menu.Item {...PATHS.HOME}>
          <span className={homeClasses}>
            <Translate
              zh_hant={TEXT.zh_hant.discover}
              zh_hans={TEXT.zh_hans.discover}
            />
          </span>
        </Menu.Item>
        <Menu.Item {...PATHS.FOLLOW}>
          <span className={followClasses}>
            <Translate
              zh_hant={TEXT.zh_hant.follow}
              zh_hans={TEXT.zh_hans.follow}
            />
          </span>
        </Menu.Item>
      </Menu>
      <style jsx>{styles}</style>
    </>
  )
}

export default DropdownContent

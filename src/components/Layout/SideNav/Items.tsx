import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconNavHome } from '@/public/static/icons/24px/nav-home.svg'
import { ReactComponent as IconNavHomeActive } from '@/public/static/icons/24px/nav-home-active.svg'
import { ReactComponent as IconNavSearch } from '@/public/static/icons/24px/nav-search.svg'
import { ReactComponent as IconNavSearchActive } from '@/public/static/icons/24px/nav-search-active.svg'
import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import { Icon, useRoute } from '~/components'

import NavListItem from './NavListItem'

export const NavListItemHome = () => {
  const { isInPath } = useRoute()
  const isInHome = isInPath('HOME')

  return (
    <NavListItem
      name={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
      icon={<Icon icon={IconNavHome} size="lg" />}
      activeIcon={<Icon icon={IconNavHomeActive} size="lg" />}
      active={isInHome}
      href={PATHS.HOME}
    />
  )
}

export const NavListItemSearch = () => {
  const { isInPath, router } = useRoute()
  const isInSearch = isInPath('SEARCH')

  return (
    <NavListItem
      name={<FormattedMessage defaultMessage="Search" id="xmcVZ0" />}
      icon={<Icon icon={IconNavSearch} size="lg" />}
      activeIcon={<Icon icon={IconNavSearchActive} size="lg" />}
      active={isInSearch}
      href={PATHS.SEARCH}
      onClick={(e) => {
        e?.preventDefault()

        const path = toPath({
          page: 'search',
        })

        if (isInSearch) {
          router.replace(path.href)
        } else {
          router.push(path.href)
        }

        return false
      }}
    />
  )
}

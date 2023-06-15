import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  IconNavHome32,
  IconNavHomeActive32,
  IconNavSearch32,
  IconNavSearchActive32,
  useRoute,
} from '~/components'

import NavListItem from './NavListItem'

export const NavListItemHome = ({ isMdUp }: { isMdUp: boolean }) => {
  const { isInPath } = useRoute()
  const isInHome = isInPath('HOME')

  return (
    <NavListItem
      name={<FormattedMessage defaultMessage="Discover" description="" />}
      icon={<IconNavHome32 size="lg" />}
      activeIcon={<IconNavHomeActive32 size="lg" />}
      active={isInHome}
      href={PATHS.HOME}
      isMdUp={isMdUp}
    />
  )
}

export const NavListItemSearch = ({ isMdUp }: { isMdUp: boolean }) => {
  const { isInPath, router } = useRoute()
  const isInSearch = isInPath('SEARCH')

  return (
    <NavListItem
      name={<FormattedMessage defaultMessage="Search" description="" />}
      icon={<IconNavSearch32 size="lg" />}
      activeIcon={<IconNavSearchActive32 size="lg" />}
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
      isMdUp={isMdUp}
    />
  )
}

import { Button, TextIcon } from '~/components'

import styles from './styles.css'

interface NavListItemProps {
  name: React.ReactNode
  href: string
  as: string
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
  isMediumUp: boolean
}

const NavListItem = ({
  name,
  href,
  as,
  icon,
  activeIcon,
  active,
  isMediumUp
}: NavListItemProps) => (
  <li>
    <Button
      href={href}
      as={as}
      bgHoverColor="green-lighter"
      spacing={isMediumUp ? ['xxtight', 'xtight'] : undefined}
      size={isMediumUp ? undefined : ['2rem', '2rem']}
    >
      <TextIcon
        icon={active ? activeIcon : icon}
        size="lg"
        weight="semibold"
        spacing="xtight"
        color={active ? 'green' : 'black'}
      >
        {isMediumUp && name}
      </TextIcon>
    </Button>

    <style jsx>{styles}</style>
  </li>
)

export default NavListItem

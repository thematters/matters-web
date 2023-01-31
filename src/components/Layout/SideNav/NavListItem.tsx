import jump from 'jump.js'
import { forwardRef } from 'react'

import { Button, ButtonProps, Media, TextIcon } from '~/components'

import styles from './styles.css'

type NavListItemProps = {
  name: React.ReactNode
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
  canScrollTop?: boolean
} & ButtonProps

type NavListItemButtonProps = NavListItemProps & { isMdUp?: boolean }

const NavListItemButton = forwardRef(
  (
    {
      name,
      icon,
      activeIcon,
      active,
      onClick,
      isMdUp,
      canScrollTop,
      ...props
    }: NavListItemButtonProps,
    ref
  ) => {
    return (
      <Button
        bgActiveColor="grey-lighter"
        spacing={isMdUp ? ['xtight', 'base'] : undefined}
        size={isMdUp ? undefined : ['2rem', '2rem']}
        ref={ref}
        {...props}
        onClick={onClick}
      >
        <TextIcon
          icon={active ? activeIcon : icon}
          size="lg"
          weight="semibold"
          spacing="tight"
          color={active ? 'green' : 'black'}
        >
          {isMdUp && name}
        </TextIcon>
      </Button>
    )
  }
)

NavListItemButton.displayName = 'NavListItemButton'

const NavListItem = forwardRef((props: NavListItemProps, ref) => {
  const { active, canScrollTop = true, onClick: baseOnClick } = props
  const onClick = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (baseOnClick) {
      baseOnClick()
    }

    if (active && canScrollTop) {
      event?.preventDefault()
      jump(document.body)
    }
  }

  return (
    <li role="menuitem">
      <Media greaterThanOrEqual="lg">
        <NavListItemButton {...props} onClick={onClick} ref={ref} isMdUp />
      </Media>
      <Media lessThan="lg">
        <NavListItemButton {...props} onClick={onClick} ref={ref} />
      </Media>

      <style jsx>{styles}</style>
    </li>
  )
})

NavListItem.displayName = 'NavListItem'

export default NavListItem

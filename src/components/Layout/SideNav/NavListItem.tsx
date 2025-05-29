import jump from 'jump.js'
import { forwardRef } from 'react'

import { Z_INDEX } from '~/common/enums'
import { Button, ButtonProps, TextIcon, Tooltip } from '~/components'

import styles from './styles.module.css'

type NavListItemProps = {
  name: React.ReactNode
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
  canScrollTop?: boolean
  showTooltip?: boolean
} & ButtonProps

const NavListItemButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement,
  NavListItemProps
>(
  (
    {
      name,
      icon,
      activeIcon,
      active,
      onClick,
      showTooltip = true,
      ...props
    }: NavListItemProps,
    ref
  ) => {
    if (!showTooltip) {
      return (
        <Button
          bgActiveColor="greyLighter"
          size={['2rem', '2rem']}
          ref={ref}
          {...props}
          onClick={onClick}
        >
          <TextIcon
            icon={active ? activeIcon : icon}
            size={32}
            weight="semibold"
            spacing={12}
            color="black"
          />
        </Button>
      )
    }
    return (
      <Tooltip
        content={name}
        placement="left"
        delay={[1000, null]}
        zIndex={Z_INDEX.OVER_STICKY_TABS}
      >
        <Button
          bgActiveColor="greyLighter"
          size={['2rem', '2rem']}
          ref={ref}
          {...props}
          onClick={onClick}
        >
          <TextIcon
            icon={active ? activeIcon : icon}
            size={32}
            weight="semibold"
            spacing={12}
            color="black"
          />
        </Button>
      </Tooltip>
    )
  }
)

NavListItemButton.displayName = 'NavListItemButton'

const NavListItem = forwardRef<HTMLLIElement, NavListItemProps>(
  (props, ref) => {
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
      <li role="menuitem" className={styles.listItem}>
        <NavListItemButton {...props} onClick={onClick} ref={ref} />
      </li>
    )
  }
)

NavListItem.displayName = 'NavListItem'

export default NavListItem

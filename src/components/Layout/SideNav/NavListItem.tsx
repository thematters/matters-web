import jump from 'jump.js'
import { forwardRef } from 'react'

import { Button, ButtonProps, TextIcon } from '~/components'

import styles from './styles.css'

type NavListItemProps = {
  name: React.ReactNode
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
  isMediumUp: boolean
  canScrollTop?: boolean
} & ButtonProps

const NavListItem = forwardRef(
  (
    {
      name,
      icon,
      activeIcon,
      active,
      isMediumUp,
      canScrollTop = true,
      ...props
    }: NavListItemProps,
    ref
  ) => {
    const { onClick: baseOnClick } = props
    const onClick = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      if (baseOnClick) {
        baseOnClick()
      }

      if (active && canScrollTop) {
        event?.preventDefault()
        jump(document.body)
      }
    }

    return (
      <li>
        <Button
          bgActiveColor="grey-lighter"
          spacing={isMediumUp ? ['xtight', 'base'] : undefined}
          size={isMediumUp ? undefined : ['2rem', '2rem']}
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
            {isMediumUp && name}
          </TextIcon>
        </Button>

        <style jsx>{styles}</style>
      </li>
    )
  }
)

export default NavListItem

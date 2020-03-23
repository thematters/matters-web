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
    const { onClick, href, as, ...restProps } = props
    const buttonProps =
      active && canScrollTop
        ? {
            onClick: () => {
              if (onClick) {
                buttonProps.onClick()
              }

              if (active) {
                jump(document.body)
              }
            },
            ...restProps
          }
        : props

    return (
      <li>
        <Button
          bgActiveColor="grey-lighter"
          spacing={isMediumUp ? ['xtight', 'base'] : undefined}
          size={isMediumUp ? undefined : ['2rem', '2rem']}
          ref={ref}
          {...buttonProps}
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

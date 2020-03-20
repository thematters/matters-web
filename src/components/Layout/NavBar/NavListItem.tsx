import jump from 'jump.js'

import { Button, ButtonProps } from '~/components'

import styles from './styles.css'

type NavListItemProps = {
  name: React.ReactNode
  icon: React.ReactNode
  activeIcon: React.ReactNode
  active: boolean
} & ButtonProps

const NavListItem = ({
  name,
  icon,
  activeIcon,
  active,
  ...props
}: NavListItemProps) => {
  const { onClick, href, as, ...restProps } = props
  const buttonProps = active
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
        size={['2rem', '2rem']}
        aira-label={name}
        {...buttonProps}
      >
        {active ? activeIcon : icon}
      </Button>

      <style jsx>{styles}</style>
    </li>
  )
}

export default NavListItem

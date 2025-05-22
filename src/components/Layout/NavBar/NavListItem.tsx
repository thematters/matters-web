import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import jump from 'jump.js'

import { Button, ButtonProps } from '~/components'

import styles from './styles.module.css'

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
  const { onClick: baseOnClick } = props
  const onClick = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (baseOnClick) {
      baseOnClick()
    }

    if (active) {
      event?.preventDefault()
      jump(document.body)
    }
  }

  return (
    <li className={styles.listItem}>
      <Button
        bgActiveColor="greyLighter"
        size={['2rem', '2rem']}
        {...props}
        onClick={onClick}
      >
        {active ? activeIcon : icon}

        <VisuallyHidden>
          <span>{name}</span>
        </VisuallyHidden>
      </Button>
    </li>
  )
}

export default NavListItem

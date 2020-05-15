import VisuallyHidden from '@reach/visually-hidden'
import { useRef } from 'react'

import { Button, Menu, useOutsideClick } from '~/components'

import { KEYCODES, TEXT } from '~/common/enums'

import NavMenu from '../../../../NavMenu'
import MeDigest from './MeDigest'
import styles from './styles.css'

interface DrawerContentProps {
  style: React.CSSProperties
  onDismiss: () => void
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  onDismiss,
  ...props
}) => {
  const node = useRef<HTMLElement>(null)
  const closeOnClick = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement
    if (target?.closest && target.closest('[data-clickable], a, button')) {
      onDismiss()
    }
    event.stopPropagation()
  }

  useOutsideClick(node, onDismiss)

  return (
    <nav
      ref={node}
      {...props}
      onKeyDown={(event) => {
        if (event.keyCode !== KEYCODES.enter) {
          return
        }
        closeOnClick(event)
      }}
      onClick={closeOnClick}
    >
      <VisuallyHidden>
        <Button onClick={onDismiss} aria-label={TEXT.zh_hant.close} />
      </VisuallyHidden>

      <header>
        <MeDigest />

        <Menu.Divider spacing="loose" />
        <NavMenu.Top isInSideDrawerNav />
      </header>

      <footer>
        <Menu.Divider spacing="loose" />
        <NavMenu.Bottom isInSideDrawerNav />
      </footer>
      <style jsx>{styles}</style>
    </nav>
  )
}

export default DrawerContent

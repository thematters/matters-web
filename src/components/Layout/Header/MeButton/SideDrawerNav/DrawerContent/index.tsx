import { VisuallyHidden } from '@reach/visually-hidden'
import { useContext, useRef } from 'react'

import { KEYCODES } from '~/common/enums'
import { translate } from '~/common/utils'
import { Button, LanguageContext, Menu, useOutsideClick } from '~/components'

import NavMenu from '../../../../NavMenu'
import MeDigest from './MeDigest'
import styles from './styles.module.css'

interface DrawerContentProps {
  style: React.CSSProperties
  onDismiss: () => void
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  onDismiss,
  ...props
}) => {
  const { lang } = useContext(LanguageContext)

  const node: React.RefObject<any> | null = useRef(null)
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
      className={styles.nav}
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
        <Button
          onClick={onDismiss}
          aria-label={translate({ id: 'close', lang })}
        />
      </VisuallyHidden>

      <header className={styles.header}>
        <MeDigest />

        <Menu.Divider spacing="loose" />
        <NavMenu.Top isInSideDrawerNav />
      </header>

      <footer className={styles.footer}>
        <Menu.Divider spacing="loose" />
        <NavMenu.Bottom isInSideDrawerNav />
      </footer>
    </nav>
  )
}

export default DrawerContent

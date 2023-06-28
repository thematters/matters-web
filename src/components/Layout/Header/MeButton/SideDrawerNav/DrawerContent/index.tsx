import { VisuallyHidden } from '@reach/visually-hidden'
import { useContext, useRef } from 'react'

import { KEYVALUE } from '~/common/enums'
import { translate } from '~/common/utils'
import { Button, LanguageContext, Menu, useOutsideClick } from '~/components'

import MeDigest from './MeDigest'
import MeMenu from './MeMenu'
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
        if (event.key.toLowerCase() !== KEYVALUE.enter) {
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

        <Menu.Divider />
        <MeMenu.Top />
      </header>

      <footer className={styles.footer}>
        <Menu.Divider />
        <MeMenu.Bottom />
      </footer>
    </nav>
  )
}

export default DrawerContent

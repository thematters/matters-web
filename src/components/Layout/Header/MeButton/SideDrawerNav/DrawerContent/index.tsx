import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useRef } from 'react'
import { useIntl } from 'react-intl'

import { KEYVALUE } from '~/common/enums'
import { Button, Menu, useOutsideClick } from '~/components'

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
  const intl = useIntl()
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
          aria-label={intl.formatMessage({
            defaultMessage: 'Close',
            id: 'rbrahO',
          })}
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

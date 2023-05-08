import VisuallyHidden from '@reach/visually-hidden'
import { useContext, useRef } from 'react'

import { KEYVALUE } from '~/common/enums'
import { translate } from '~/common/utils'
import { Button, LanguageContext, Menu, useOutsideClick } from '~/components'

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
      ref={node}
      {...props}
      onKeyDown={(event) => {
        if (event.key !== KEYVALUE.enter) {
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

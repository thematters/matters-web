import { useIntl } from 'react-intl'

import { IconClose24 } from '~/components'

import { TextButton } from '../Buttons'
import styles from './styles.module.css'

export interface HeaderProps {
  title: React.ReactNode
  leftBtn?: React.ReactNode
  rightBtn?: React.ReactNode
  closeDrawer?: () => any
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftBtn,
  rightBtn,
  closeDrawer,
}) => {
  const intl = useIntl()

  return (
    <header className={styles.header}>
      {leftBtn && <section>{leftBtn}</section>}
      <h2>{title}</h2>
      {rightBtn && <section>{rightBtn}</section>}
      {!rightBtn && closeDrawer && (
        <TextButton
          onClick={closeDrawer}
          aria-label={intl.formatMessage({
            defaultMessage: 'Close',
            id: 'rbrahO',
          })}
          text={<IconClose24 size="md" />}
        />
      )}
    </header>
  )
}

export default Header

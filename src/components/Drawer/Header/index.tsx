import classNames from 'classnames'
import { useIntl } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { Icon } from '~/components'

import { TextButton } from '../Buttons'
import styles from './styles.module.css'

export interface HeaderProps {
  title: React.ReactNode
  leftBtn?: React.ReactNode
  rightBtn?: React.ReactNode
  closeDrawer?: () => any
  fixedWidth?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftBtn,
  rightBtn,
  closeDrawer,
  fixedWidth = false,
}) => {
  const intl = useIntl()

  const headerClasses = classNames({
    [styles.header]: true,
    [styles.fixedWidth]: !!fixedWidth,
  })

  return (
    <header className={headerClasses}>
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
          text={<Icon icon={IconTimes} size={24} />}
        />
      )}
    </header>
  )
}

export default Header

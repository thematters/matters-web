import classNames from 'classnames'

import { TEST_ID } from '~/common/enums'

import MeButton from './MeButton'
import { RightButton } from './RightButton'
import { ShareButton } from './ShareButton'
import styles from './styles.module.css'
import Title from './Title'

interface HeaderProps {
  left?: React.ReactNode
  right?: React.ReactNode

  mode?: 'solid' | 'transparent' | 'compact'
}

const Header: React.FC<HeaderProps> & {
  RightButton: typeof RightButton
  MeButton: typeof MeButton
  ShareButton: typeof ShareButton
  Title: typeof Title
} = ({ left, right, mode = 'solid' }) => {
  const headerClasses = classNames({
    [styles.header]: true,
    [styles[mode]]: true,
  })

  return (
    <header className={headerClasses} data-test-id={TEST_ID.LAYOUT_HEADER}>
      <section className={styles.content}>
        {left && <section className={styles.left}>{left}</section>}
        {right && <section className={styles.right}>{right}</section>}
      </section>
    </header>
  )
}

Header.RightButton = RightButton
Header.MeButton = MeButton
Header.ShareButton = ShareButton
Header.Title = Title

export default Header

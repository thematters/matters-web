import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { Media } from '~/components'

import { TextButton } from '../Buttons'
import styles from './styles.module.css'

export interface HeaderProps {
  title: React.ReactNode
  titleLeft?: boolean
  hasSmUpTitle?: boolean

  leftBtn?: React.ReactNode
  rightBtn?: React.ReactNode | string

  closeText?: React.ReactNode
  closeDialog?: () => any
}

const Title = ({
  title,
  titleLeft,
}: Pick<HeaderProps, 'title' | 'titleLeft'>) => (
  <h1
    id="dialog-title"
    className={classNames({
      [styles.titleCenter]: !titleLeft,
      [styles.title]: true,
    })}
  >
    {title}
  </h1>
)

const Header: React.FC<HeaderProps> = ({
  title,
  titleLeft,
  hasSmUpTitle = true,
  leftBtn,
  rightBtn,
  closeText,
  closeDialog,
}) => {
  const text = closeText || (
    <FormattedMessage defaultMessage="Cancel" id="47FYwb" />
  )

  return (
    <>
      <Media at="sm">
        <header className={styles.header}>
          <Title title={title} titleLeft={titleLeft} />
          {leftBtn && <section className={styles.left}>{leftBtn}</section>}
          {!leftBtn && closeDialog && (
            <section className={styles.left}>
              <TextButton text={text} onClick={closeDialog} />
            </section>
          )}
          <section className={styles.right}>{rightBtn}</section>
        </header>
      </Media>

      <Media greaterThan="sm">
        {hasSmUpTitle ? (
          <header className={styles.smUpheader}>
            <Title title={title} />
          </header>
        ) : (
          <VisuallyHidden>
            <Title title={title} />
          </VisuallyHidden>
        )}
      </Media>
    </>
  )
}

export default Header

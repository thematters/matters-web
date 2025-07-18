import classNames from 'classnames'
import { useVisuallyHidden } from 'react-aria'
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
  closeDialog?: () => void
}

const Title = ({
  title,
  titleLeft,
  visuallyHidden = false,
}: Pick<HeaderProps, 'title' | 'titleLeft'> & { visuallyHidden?: boolean }) => {
  const { visuallyHiddenProps } = useVisuallyHidden()

  return (
    <h1
      id="dialog-title"
      className={classNames({
        [styles.titleCenter]: !titleLeft,
        [styles.title]: true,
      })}
      {...(visuallyHidden ? visuallyHiddenProps : {})}
    >
      {title}
    </h1>
  )
}

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
      <Media lessThan="md">
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

      <Media greaterThanOrEqual="md">
        {hasSmUpTitle ? (
          <header className={styles.smUpheader}>
            <Title title={title} />
          </header>
        ) : (
          <Title title={title} visuallyHidden />
        )}
      </Media>
    </>
  )
}

export default Header

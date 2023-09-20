import { VisuallyHidden } from '@reach/visually-hidden'
import { FormattedMessage } from 'react-intl'

import { TextId } from '~/common/enums'
import { Media, Translate } from '~/components'

import { TextButton } from '../Buttons'
import styles from './styles.module.css'

export interface HeaderProps {
  title: TextId | React.ReactNode
  hasSmUpTitle?: boolean

  leftBtn?: React.ReactNode
  rightBtn?: React.ReactNode | string

  closeText?: React.ReactNode
  closeDialog?: () => any
}

const Title = ({ title }: Pick<HeaderProps, 'title'>) => (
  <h1 id="dialog-title" className={styles.title}>
    {typeof title === 'string' ? <Translate id={title as TextId} /> : title}
  </h1>
)

const Header: React.FC<HeaderProps> = ({
  title,
  hasSmUpTitle = true,
  leftBtn,
  rightBtn,
  closeText,
  closeDialog,
}) => {
  const text = closeText || <FormattedMessage defaultMessage="Cancel" />

  return (
    <>
      <Media at="sm">
        <header className={styles.header}>
          <Title title={title} />
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

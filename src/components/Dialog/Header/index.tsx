import { VisuallyHidden } from '@reach/visually-hidden'
import classNames from 'classnames'

import { TextId } from '~/common/enums'
import { Media, Spacer, Translate } from '~/components'

import { BackButton, CloseButton, RightButton } from './Button'
import styles from './styles.module.css'

export interface HeaderProps {
  title: TextId | React.ReactNode
  closeDialog?: () => void
  closeTextId?: TextId
  mode?: 'hidden' | 'inner'
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode | string
}

const BaseHeader = ({
  title,
  closeDialog,
  closeTextId,
  mode,
  leftButton,
  rightButton,
}: HeaderProps) => {
  const headerClasses = classNames({
    [styles.header]: true,
    [styles.inner]: mode === 'inner',
  })

  return (
    <header className={headerClasses}>
      <h1>
        <span id="dialog-title">
          {typeof title === 'string' ? (
            <Translate id={title as TextId} />
          ) : (
            title
          )}
        </span>
      </h1>

      {(leftButton || closeDialog) && (
        <section className={styles.left}>
          {leftButton ||
            (closeDialog ? (
              <CloseButton closeDialog={closeDialog} textId={closeTextId} />
            ) : null)}
        </section>
      )}

      {rightButton && <section className={styles.right}>{rightButton}</section>}
    </header>
  )
}

const Header: React.FC<HeaderProps> & {
  RightButton: typeof RightButton
  BackButton: typeof BackButton
  CloseButton: typeof CloseButton
} = (props) => {
  if (props.mode !== 'hidden') {
    return <BaseHeader {...props} />
  }

  return (
    <>
      <Media at="sm">
        <Spacer size="xloose" />
      </Media>

      <VisuallyHidden>
        <BaseHeader {...props} />
      </VisuallyHidden>
    </>
  )
}

Header.RightButton = RightButton
Header.BackButton = BackButton
Header.CloseButton = CloseButton

export default Header

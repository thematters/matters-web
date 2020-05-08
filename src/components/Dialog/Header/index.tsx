import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'

import { Spacer, Translate } from '~/components'

import { TextId } from '~/common/enums'

import { BackButton, CloseButton, RightButton } from './Button'
import styles from './styles.css'

export interface HeaderProps {
  title: TextId | React.ReactElement
  close: () => void
  closeTextId?: TextId
  mode?: 'hidden' | 'inner'
  leftButton?: React.ReactNode
  rightButton?: React.ReactNode | string
}

const BaseHeader = ({
  title,
  close,
  closeTextId,
  mode,
  leftButton,
  rightButton,
}: HeaderProps) => {
  const headerClass = classNames({
    inner: mode === 'inner',
  })

  return (
    <header className={headerClass}>
      <h1>
        <span id="dialog-title">
          {typeof title === 'string' ? (
            <Translate id={title as TextId} />
          ) : (
            title
          )}
        </span>
      </h1>

      <section className="left">
        {leftButton || <CloseButton close={close} textId={closeTextId} />}
      </section>

      {rightButton && <section className="right">{rightButton}</section>}

      <style jsx>{styles}</style>
    </header>
  )
}

const Header: React.FC<HeaderProps> & {
  RightButton: typeof RightButton
  BackButton: typeof BackButton
} = (props) => {
  if (props.mode !== 'hidden') {
    return <BaseHeader {...props} />
  }

  return (
    <>
      <div className="u-sm-up-hide">
        <Spacer size="xloose" />
      </div>

      <VisuallyHidden>
        <BaseHeader {...props} />
      </VisuallyHidden>

      <style jsx>{styles}</style>
    </>
  )
}

Header.RightButton = RightButton
Header.BackButton = BackButton

export default Header

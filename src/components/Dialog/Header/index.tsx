import VisuallyHidden from '@reach/visually-hidden'

import { Translate } from '~/components'

import { TextId } from '~/common/enums'

import { CloseButton, RightButton } from './Button'
import styles from './styles.css'

export interface HeaderProps {
  title: TextId | React.ReactElement
  close: () => void
  headerHidden?: boolean
  rightButton?: React.ReactNode | string
}

const BaseHeader = ({ title, close, rightButton }: HeaderProps) => (
  <header>
    <h1>
      <span id="dialog-title">
        {typeof title === 'string' ? <Translate id={title as TextId} /> : title}
      </span>
    </h1>

    <section className="left">
      <CloseButton close={close} />
    </section>

    {rightButton && <section className="right">{rightButton}</section>}

    <style jsx>{styles}</style>
  </header>
)

const Header: React.FC<HeaderProps> & { RightButton: typeof RightButton } = ({
  headerHidden,
  ...restProps
}) => {
  if (!headerHidden) {
    return <BaseHeader {...restProps} />
  }

  return (
    <>
      <div className="spacing-holder" />

      <VisuallyHidden>
        <BaseHeader {...restProps} />
      </VisuallyHidden>

      <style jsx>{styles}</style>
    </>
  )
}

Header.RightButton = RightButton

export default Header

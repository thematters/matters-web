import VisuallyHidden from '@reach/visually-hidden'
import { forwardRef } from 'react'

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

const BaseHeader = forwardRef(
  ({ title, close, rightButton }: HeaderProps, ref) => (
    <header>
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
        <CloseButton close={close} ref={ref} />
      </section>

      {rightButton && <section className="right">{rightButton}</section>}

      <style jsx>{styles}</style>
    </header>
  )
)

const Header = forwardRef(({ headerHidden, ...restProps }, ref) => {
  if (!headerHidden) {
    return <BaseHeader {...restProps} ref={ref} />
  }

  return (
    <>
      <div className="spacing-holder" />

      <VisuallyHidden>
        <BaseHeader {...restProps} ref={ref} />
      </VisuallyHidden>

      <style jsx>{styles}</style>
    </>
  )
}) as React.ForwardRefExoticComponent<
  HeaderProps & React.RefAttributes<unknown>
> & { RightButton: typeof RightButton }

Header.RightButton = RightButton

export default Header

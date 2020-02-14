import classNames from 'classnames'
import { forwardRef } from 'react'

import { Button, Icon, TextIcon, Translate, useResponsive } from '~/components'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

interface HeaderProps {
  close: () => void
  showHeader?: boolean
  rightButton?: React.ReactNode | string
  children: React.ReactNode
}

const Header = forwardRef(
  (
    { close, showHeader, rightButton, children }: HeaderProps,
    closeButtonRef
  ) => {
    const isSmallUp = useResponsive({ type: 'sm-up' })()
    const headerClass = classNames({
      'u-visually-hidden': !showHeader
    })

    return (
      <header className={headerClass}>
        <section className="left">
          <Button onClick={close} aria-label="關閉" ref={closeButtonRef}>
            {!isSmallUp && (
              <TextIcon color="green" size="md">
                <Translate
                  zh_hant={TEXT.zh_hant.cancel}
                  zh_hans={TEXT.zh_hans.cancel}
                />
              </TextIcon>
            )}
            {isSmallUp && <Icon.CloseGreenMedium size="lg" />}
          </Button>
        </section>

        <h1>
          <span id="dialog-title">{children}</span>
        </h1>

        {rightButton && <section className="right">{rightButton}</section>}

        <style jsx>{styles}</style>
      </header>
    )
  }
)

export default Header

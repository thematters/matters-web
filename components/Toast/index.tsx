import classNames from 'classnames'

import { Icon } from '~/components'

import ICON_CLOSE_WHITE from '~/static/icons/close-white.svg?sprite'
import ICON_CLOSE from '~/static/icons/close.svg?sprite'

import styles from './styles.css'

/**
 * Pure UI Toast
 *
 * Usage:
 *
 * ```tsx
 * <Toast color="green" header="header content" />
 * ```
 */

export interface ToastProps {
  color: 'green' | 'grey' | 'red' | 'white'
  header?: string | React.ReactNode
  content?: string | React.ReactNode

  closeButton?: boolean
  onCloseButtonClick?: () => any
  customButton?: any
  buttonPlacement?: 'top' | 'bottom'
}

export const Toast: React.FC<ToastProps> = ({
  color,
  header,
  content,

  closeButton,
  onCloseButtonClick,
  customButton,
  buttonPlacement = 'top'
}) => {
  const mainClass = classNames({
    toast: true,
    [color]: !!color,
    [buttonPlacement]: buttonPlacement
  })
  const contentClass = classNames({
    content: true,
    opaque: header && content
  })
  const isWhite = color === 'white'

  return (
    <section className={mainClass}>
      <div>
        {header && <h4 className="header">{header}</h4>}
        {content && <p className={contentClass}>{content}</p>}
      </div>

      {closeButton && (
        <button type="button" onClick={onCloseButtonClick}>
          <Icon
            id={isWhite ? ICON_CLOSE.id : ICON_CLOSE_WHITE.id}
            viewBox={isWhite ? ICON_CLOSE.viewBox : ICON_CLOSE_WHITE.viewBox}
          />
        </button>
      )}

      {!closeButton && customButton && customButton}

      <style jsx>{styles}</style>
    </section>
  )
}

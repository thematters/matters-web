import classNames from 'classnames'
import { useContext } from 'react'

import { Icon, LanguageContext } from '~/components'

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
  translations?: {
    zh_hant: string
    zh_hans?: string
    en?: string
  }

  closeButton?: boolean
  onCloseButtonClick?: () => any
  customButton?: React.ReactNode
  buttonPlacement?: 'top' | 'bottom' | 'center'
}

export const Toast: React.FC<ToastProps> = ({
  color,
  header,
  content,
  translations,
  closeButton,
  onCloseButtonClick,
  customButton,
  buttonPlacement = 'top'
}) => {
  const { lang } = useContext(LanguageContext)
  const mainClass = classNames({
    toast: true,
    [color]: !!color,
    [buttonPlacement]: buttonPlacement
  })
  const isWhite = color === 'white'

  // overide content when translations provided
  if (translations) {
    content = translations[lang]
  }

  return (
    <section className={mainClass}>
      <div>
        {header && <h4 className="header">{header}</h4>}
        {content && <p className="content">{content}</p>}
      </div>

      {closeButton && (
        <button type="button" onClick={onCloseButtonClick}>
          <Icon
            id={ICON_CLOSE.id}
            viewBox={ICON_CLOSE.viewBox}
            color={isWhite ? 'white' : 'black'}
          />
        </button>
      )}

      {!closeButton && customButton && customButton}

      <style jsx>{styles}</style>
    </section>
  )
}

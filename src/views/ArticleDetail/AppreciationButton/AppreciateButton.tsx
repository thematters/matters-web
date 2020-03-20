import classNames from 'classnames'
import { useRef } from 'react'

import { Icon } from '~/components'

import { numAbbr } from '~/common/utils'

import * as clap from './clap'
import clapStyles from './styles.clap.css'
import styles from './styles.css'

interface AppreciateButtonProps {
  disabled?: boolean
  onClick?: () => void
  count?: number | 'MAX'
  total: number
}

const AppreciateButton: React.FC<AppreciateButtonProps> = ({
  disabled,
  onClick,
  count,
  total
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const buttonClass = classNames({
    'appreciate-button': true,
    clap: true
  })

  return (
    <>
      <button
        className={buttonClass}
        type="button"
        ref={btnRef}
        disabled={disabled}
        onClick={() => {
          if (btnRef.current) {
            clap.clap(btnRef.current)
          }

          if (onClick) {
            onClick()
          }
        }}
        aria-label="讚賞作品"
        onTransitionEnd={e => {
          if (e.propertyName === 'transform' && btnRef.current) {
            clap.handZoomOut(btnRef.current)
          }
        }}
      >
        <Icon.Like className="icon-like" size="md" color="green" />
        <span className="total">{numAbbr(total)}</span>
        {count && (
          <span className="count">
            {count === 'MAX' ? <Icon.AppreciationMAX color="white" /> : count}
          </span>
        )}
      </button>

      <style jsx>{styles}</style>
      <style jsx global>
        {clapStyles}
      </style>
    </>
  )
}

export default AppreciateButton

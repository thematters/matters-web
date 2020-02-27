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
  inFixedToolbar?: boolean
}

const AppreciateButton: React.FC<AppreciateButtonProps> = ({
  disabled,
  onClick,
  count,
  total,
  inFixedToolbar
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const buttonClass = classNames({
    'appreciate-button': true,
    clap: true,
    circle: !inFixedToolbar
  })
  const countClass = classNames({
    count: true,
    max: count === 'MAX'
  })
  const totalClass = classNames({
    total: true,
    inFixedToolbar
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
            clap.clap(btnRef.current, !!inFixedToolbar)
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
        {inFixedToolbar ? (
          <Icon.Like
            className="icon-like"
            color="green"
            style={{ width: 20, height: 20 }}
          />
        ) : (
          <>
            <Icon.Like
              className="icon-like"
              style={{ width: 22, height: 22 }}
            />
            {count && <span className={countClass}>{count}</span>}
          </>
        )}
      </button>

      <span className={totalClass}>{numAbbr(total)}</span>

      <style jsx>{styles}</style>
      <style jsx global>
        {clapStyles}
      </style>
    </>
  )
}

export default AppreciateButton

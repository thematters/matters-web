import classNames from 'classnames'
import { useRef } from 'react'

import { TextIcon } from '~/components'
import IconLike from '~/components/Icon/Like'

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

  return (
    <>
      <button
        className={buttonClass}
        type="button"
        ref={btnRef}
        disabled={disabled}
        aria-disabled={disabled}
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
        {inFixedToolbar ? (
          <TextIcon
            icon={
              <IconLike
                className="icon-like"
                style={{ width: 20, height: 20 }}
              />
            }
            color="green"
            weight="medium"
            text={total}
            size="xs"
            spacing="xtight"
          />
        ) : (
          <>
            <IconLike className="icon-like" style={{ width: 22, height: 22 }} />
            {count && <span className={countClass}>{count}</span>}
          </>
        )}
      </button>

      {!inFixedToolbar && <span className="total">{numAbbr(total)}</span>}

      <style jsx>{styles}</style>
      <style jsx global>
        {clapStyles}
      </style>
    </>
  )
}

export default AppreciateButton

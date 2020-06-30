import classNames from 'classnames'
import { useRef } from 'react'

import { IconAppreciationMAX, IconLike, IconSuperLike } from '~/components'

import { numAbbr } from '~/common/utils'

import * as clap from './clap'
import clapStyles from './styles.clap.css'
import styles from './styles.css'

interface AppreciateButtonProps {
  disabled?: boolean
  onClick?: () => void
  count?: number | 'MAX'
  total: number
  isSuperLike?: boolean
  canSuperLike?: boolean
  superLiked?: boolean
}

const AppreciateButton: React.FC<AppreciateButtonProps> = ({
  disabled,
  onClick,
  count,
  total,
  isSuperLike,
  canSuperLike,
  superLiked,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const buttonClass = classNames({
    'appreciate-button': true,
    clap: true,
    isSuperLike,
    superLiked,
  })

  return (
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
      onTransitionEnd={(e) => {
        if (e.propertyName === 'transform' && btnRef.current) {
          clap.handZoomOut(btnRef.current)
        }
      }}
    >
      <span className="icon">
        <IconLike className="icon-like" size="md" color="green" />
        <IconSuperLike className="icon-superlike" size="md" />
      </span>

      <span className="total">{numAbbr(total)}</span>

      {count && count !== 'MAX' && !isSuperLike && (
        <span className="count">{count}</span>
      )}

      {count === 'MAX' && (
        <span className="count">
          <IconAppreciationMAX color="white" />
        </span>
      )}

      <style jsx>{styles}</style>
      <style jsx global>
        {clapStyles}
      </style>
    </button>
  )
}

export default AppreciateButton

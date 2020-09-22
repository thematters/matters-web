import classNames from 'classnames'
import { useRef } from 'react'

import {
  IconAppreciationMAX,
  IconLike,
  IconSuperLike,
  IconSuperLikeInfinite,
} from '~/components'

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
  superLiked?: boolean
}

const AppreciateButton: React.FC<AppreciateButtonProps> = ({
  disabled,
  onClick,
  count,
  total,
  isSuperLike,
  superLiked,
}) => {
  const iconRef = useRef<HTMLButtonElement>(null)
  const buttonClasses = classNames({
    'appreciate-button': true,
    isSuperLike,
    superLiked,
  })

  return (
    <button
      className={buttonClasses}
      type="button"
      disabled={disabled}
      onClick={() => {
        if (iconRef.current) {
          clap.clap(iconRef.current)
        }

        if (onClick) {
          onClick()
        }
      }}
      aria-label="讚賞作品"
    >
      <span
        className="icon clap"
        ref={iconRef}
        onTransitionEnd={(e) => {
          if (e.propertyName === 'transform' && iconRef.current) {
            clap.handZoomOut(iconRef.current)
          }
        }}
      >
        <IconLike className="icon-like" size="md" color="green" />
        <IconSuperLike className="icon-superlike" size="md" />
      </span>

      <span className="total">{numAbbr(total)}</span>

      {!isSuperLike && count && count !== 'MAX' && (
        <span className="count">{count}</span>
      )}

      {isSuperLike && count === 'MAX' && (
        <span className="count">
          <IconSuperLikeInfinite color="gold" />
        </span>
      )}

      {!isSuperLike && count === 'MAX' && (
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

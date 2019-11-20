import classNames from 'classnames'
import _debounce from 'lodash/debounce'
import { useRef } from 'react'

import { TextIcon } from '~/components'
import IconLike from '~/components/Icon/Like'

import { numAbbr } from '~/common/utils'
import ICON_LIKE_EXPLODE from '~/static/icons/like-explode.svg?include'

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
  const $clapButton = btnRef.current

  const handZoomOut = () => {
    if (!$clapButton) {
      return
    }
    $clapButton.classList.remove('clap-hand-zoom-in')
  }
  const handZoomIn = _debounce(() => {
    if (!$clapButton) {
      return
    }
    $clapButton.classList.add('clap-hand-zoom-in')
  }, 1000 / 60)
  const clap = () => {
    if (!$clapButton) {
      return
    }

    // hand zoom in
    handZoomOut()
    handZoomIn()

    // explode
    const $likeExplode = document.createElement('span')
    $likeExplode.className = 'clap-explode'
    $likeExplode.innerHTML = ICON_LIKE_EXPLODE
    $clapButton.appendChild($likeExplode)
  }

  return (
    <>
      <button
        className={buttonClass}
        type="button"
        ref={btnRef}
        disabled={disabled}
        aria-disabled={disabled}
        onClick={() => {
          clap()

          if (onClick) {
            onClick()
          }
        }}
        aria-label="讚賞作品"
        onTransitionEnd={e => {
          if (e.propertyName === 'transform') {
            handZoomOut()
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

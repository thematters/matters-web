import classNames from 'classnames'
import { forwardRef } from 'react'

import { TextIcon } from '~/components'
import IconLike from '~/components/Icon/Like'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

interface AppreciateButtonProps {
  disabled?: boolean
  onClick?: () => void
  count?: number | 'MAX'
  total: number
  inFixedToolbar?: boolean
}

const AppreciateButton = forwardRef<HTMLButtonElement, AppreciateButtonProps>(
  ({ disabled, onClick, count, total, inFixedToolbar }, ref) => {
    const buttonClass = classNames({
      'appreciate-button': !inFixedToolbar
    })
    const countClass = classNames({
      'appreciated-count': true,
      max: count === 'MAX'
    })

    return (
      <>
        <button
          className={buttonClass}
          type="button"
          ref={ref}
          aria-disabled={disabled}
          onClick={onClick}
          aria-label="讚賞作品"
        >
          {inFixedToolbar ? (
            <TextIcon
              icon={<IconLike style={{ width: 20, height: 20 }} />}
              color="green"
              weight="medium"
              text={total}
              size="xs"
              spacing="xtight"
            />
          ) : (
            <>
              <IconLike style={{ width: 22, height: 22 }} />
              {count && <span className={countClass}>{count}</span>}
            </>
          )}
        </button>

        {!inFixedToolbar && (
          <span className="appreciate-count">{numAbbr(total)}</span>
        )}

        <style jsx>{styles}</style>
      </>
    )
  }
)

export default AppreciateButton

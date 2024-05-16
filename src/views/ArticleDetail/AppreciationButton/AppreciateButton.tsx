import classNames from 'classnames'
import { useRef } from 'react'
import { useIntl } from 'react-intl'

import { ReactComponent as IconClap } from '@/public/static/icons/24px/clap.svg'
import { ReactComponent as IconClapFill } from '@/public/static/icons/24px/clap-fill.svg'
import { ReactComponent as IconSuperLike } from '@/public/static/icons/superlike.svg'
import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, numAbbr } from '~/common/utils'
import { Button, ButtonProps, Icon, TextIcon } from '~/components'

import * as clap from './clap'
import clapStyles from './clap.module.css'
import styles from './styles.module.css'

export type AppreciateButtonProps = {
  disabled?: boolean
  onClick?: () => void
  count?: number | 'MAX'
  total: number
  isSuperLike?: boolean
  superLiked?: boolean
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
} & ButtonProps

const AppreciateButton: React.FC<AppreciateButtonProps> = ({
  disabled,
  onClick,
  count,
  total,
  isSuperLike,
  superLiked,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 8,
  ...buttonProps
}) => {
  const intl = useIntl()
  const iconRef = useRef<HTMLButtonElement>(null)
  const buttonClasses = classNames({
    [styles.appreciateButton]: true,
    [styles.isSuperLike]: isSuperLike,
    [styles.superLiked]: superLiked,
    [styles[`icon${capitalizeFirstLetter(iconSize + '')}`]]: true,
  })

  return (
    <span className={buttonClasses}>
      <Button
        aria-label={intl.formatMessage(
          {
            defaultMessage: `like article (current {total} likes)`,
            id: 'fnv5rD',
          },
          { total }
        )}
        disabled={disabled}
        onClick={() => {
          if (iconRef.current) {
            clap.clap(iconRef.current)
          }

          if (onClick) {
            onClick()
          }
        }}
        {...buttonProps}
      >
        <TextIcon
          weight={textWeight}
          spacing={total > 0 ? textIconSpacing : 0}
          size={14}
          icon={
            <span
              className={`${styles.icon} ${clapStyles.clap}`}
              ref={iconRef}
              onTransitionEnd={(e) => {
                if (e.propertyName === 'transform' && iconRef.current) {
                  clap.handZoomOut(iconRef.current)
                }
              }}
            >
              <Icon
                icon={
                  (typeof count === 'number' && count <= 0) || !count
                    ? IconClap
                    : IconClapFill
                }
                className={[styles.iconLike, clapStyles.iconLike].join(' ')}
                size={iconSize}
              />
              <Icon
                icon={IconSuperLike}
                className={[
                  styles.iconSuperlike,
                  clapStyles.iconSuperlike,
                ].join(' ')}
                size={iconSize}
              />
            </span>
          }
        >
          {total > 0 && (
            <span data-test-id={TEST_ID.ARTICLE_APPRECIATION_TOTAL}>
              {numAbbr(total)}
            </span>
          )}
        </TextIcon>
      </Button>
    </span>
  )
}

export default AppreciateButton

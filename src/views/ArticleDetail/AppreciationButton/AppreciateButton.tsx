import classNames from 'classnames'
import { useContext, useRef } from 'react'

import { TEST_ID } from '~/common/enums'
import { capitalizeFirstLetter, numAbbr, translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  IconClap24,
  IconSuperLike,
  LanguageContext,
  TextIcon,
} from '~/components'

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
  iconSize?: 'mdS' | 'md'
  textWeight?: 'md' | 'normal'
  textIconSpacing?: 'xxtight' | 'xtight' | 'basexxtight'
} & ButtonProps

const AppreciateButton: React.FC<AppreciateButtonProps> = ({
  disabled,
  onClick,
  count,
  total,
  isSuperLike,
  superLiked,
  iconSize = 'mdS',
  textWeight = 'md',
  textIconSpacing = 'xtight',
  ...buttonProps
}) => {
  const { lang } = useContext(LanguageContext)

  const iconRef = useRef<HTMLButtonElement>(null)
  const buttonClasses = classNames({
    [styles.appreciateButton]: true,
    [styles.isSuperLike]: isSuperLike,
    [styles.superLiked]: superLiked,
    [styles[`icon${capitalizeFirstLetter(iconSize)}`]]: true,
  })

  return (
    <span className={buttonClasses}>
      <Button
        aria-label={translate({
          zh_hant: `讚賞作品（當前 ${total} 次讚賞）`,
          zh_hans: `赞赏作品（当前 ${total} 次赞赏）`,
          en: `like article (current ${total} likes)`,
          lang,
        })}
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
          size="sm"
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
              <IconClap24
                className={[styles.iconLike, clapStyles.iconLike].join(' ')}
                size={iconSize}
              />
              <IconSuperLike
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

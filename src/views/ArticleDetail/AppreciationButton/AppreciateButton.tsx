import classNames from 'classnames'
import { useContext, useRef } from 'react'
import { FormattedMessage } from 'react-intl'

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
  showText?: boolean
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
  showText,
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
          spacing={textIconSpacing}
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
          {!showText && total > 0 && (
            <span data-test-id={TEST_ID.ARTICLE_APPRECIATION_TOTAL}>
              {numAbbr(total)}
            </span>
          )}
          {showText && (
            <FormattedMessage
              defaultMessage="Like"
              description="src/views/ArticleDetail/AppreciationButton/AppreciateButton.tsx"
              id="8rnUQH"
            ></FormattedMessage>
          )}
        </TextIcon>
      </Button>
    </span>
  )
}

export default AppreciateButton

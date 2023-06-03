import classNames from 'classnames'
import { useContext, useRef } from 'react'

import { TEST_ID } from '~/common/enums'
import { numAbbr, translate } from '~/common/utils'
import {
  Button,
  IconClap16,
  IconSuperLike,
  LanguageContext,
  TextIcon,
} from '~/components'

import * as clap from './clap'
import styles from './styles.module.css'

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
  const { lang } = useContext(LanguageContext)

  const iconRef = useRef<HTMLButtonElement>(null)
  const buttonClasses = classNames({
    'appreciate-button': true,
    isSuperLike,
    superLiked,
  })

  return (
    <span className={buttonClasses}>
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor="grey-lighter"
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
      >
        <TextIcon
          weight="md"
          spacing="xtight"
          size="sm"
          icon={
            <span
              className="icon clap"
              ref={iconRef}
              onTransitionEnd={(e) => {
                if (e.propertyName === 'transform' && iconRef.current) {
                  clap.handZoomOut(iconRef.current)
                }
              }}
            >
              <IconClap16 className="icon-like" size="md-s" />
              <IconSuperLike className="icon-superlike" size="md-s" />
            </span>
          }
        >
          <span data-test-id={TEST_ID.ARTICLE_APPRECIATION_TOTAL}>
            {total > 0 ? numAbbr(total) : undefined}
          </span>
        </TextIcon>
      </Button>
    </span>
  )
}

export default AppreciateButton

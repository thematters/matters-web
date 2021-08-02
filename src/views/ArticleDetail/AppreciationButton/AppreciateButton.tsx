import classNames from 'classnames'
import { useRef } from 'react'

import { Button, IconClap16, IconSuperLike, TextIcon } from '~/components'

import { numAbbr } from '~/common/utils'

import * as clap from './clap'
import clapStyles from './styles.clap.css'
import styles from './styles.css'
import { TEXT } from '@/src/common/enums'

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
    <span className={buttonClasses}>
      <Button
        spacing={['xtight', 'xtight']}
        bgActiveColor="grey-lighter"
        aria-label={`${TEXT.zh_hant.appreciate} ${
          TEXT.zh_hant.appreciateCount
        }: ${total > 0 ? total : 0}`}
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
          {total > 0 ? numAbbr(total) : undefined}
        </TextIcon>
      </Button>

      <style jsx>{styles}</style>
      <style jsx global>
        {clapStyles}
      </style>
    </span>
  )
}

export default AppreciateButton

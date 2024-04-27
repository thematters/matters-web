import classNames from 'classnames'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconUp } from '@/public/static/icons/24px/up.svg'
import { capitalizeFirstLetter, collapseContent } from '~/common/utils'
import {
  Button,
  Icon,
  TextIcon,
  Translate,
  Truncate,
  useIsomorphicLayoutEffect,
} from '~/components'

import styles from './styles.module.css'

type CollapseTextColor =
  | 'black'
  | 'grey'
  | 'greyLight'
  | 'greyDarker'
  | 'greyDark'
  | 'white'

interface ExpandableProps {
  children: ReactElement
  content?: string | null
  limit?: number
  buffer?: number
  color?: CollapseTextColor
  size?: 'sm' | 'mdS' | 'md'
  spacingTop?: 'tight' | 'base'
  textIndent?: boolean
  isRichShow?: boolean
  collapseable?: boolean
  bgColor?: 'greyLighter' | 'white'
}

export const Expandable: React.FC<ExpandableProps> = ({
  children,
  content,
  limit = 3,
  buffer = 0,
  color,
  size,
  spacingTop,
  textIndent = false,
  isRichShow = false,
  collapseable = true,
  bgColor = 'white',
}) => {
  const [expandable, setExpandable] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [expand, setExpand] = useState(true)
  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)
  const collapsedContent = collapseContent(content)

  const contentClasses = classNames({
    [styles.expandable]: true,
    [styles[`${color}`]]: !!color,
    [size ? styles[`size${capitalizeFirstLetter(size)}`] : '']: !!size,
    [spacingTop
      ? styles[`spacingTop${capitalizeFirstLetter(spacingTop)}`]
      : '']: !!spacingTop,
    [styles.textIndent]: textIndent,
  })

  const richWrapperClasses = classNames({
    [styles.richWrapper]: true,
    [styles[`${bgColor}`]]: !!bgColor,
  })

  const richShowMoreButtonClasses = classNames({
    [styles.richShowMoreButton]: true,
    [styles[`${bgColor}`]]: !!bgColor,
  })

  useIsomorphicLayoutEffect(() => {
    setExpandable(false)
    setExpand(true)
    if (node?.current) {
      const height = node.current.firstElementChild?.clientHeight || 0
      const lineHeight = window
        .getComputedStyle(node.current, null)
        .getPropertyValue('line-height')
      const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)

      if (lines > limit + buffer) {
        setExpandable(true)
        setExpand(false)
      }
    }
  }, [content])

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false)
    }
  }, [firstRender])

  return (
    <section className={contentClasses}>
      <div ref={node}>
        {(!expandable || (expandable && expand)) && (
          <div
            className={firstRender ? styles.lineClamp : ''}
            style={{ WebkitLineClamp: limit + 2 }}
          >
            {children}
          </div>
        )}
      </div>
      {expandable && collapseable && expand && !isRichShow && (
        <section className={styles.collapseWrapper}>
          <Button
            spacing={['xxtight', 'xtight']}
            bgColor="greyLighter"
            textColor="grey"
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <TextIcon icon={<Icon icon={IconUp} />} textPlacement="left">
              <Translate zh_hans="收起" zh_hant="收合" en="collapse" />
            </TextIcon>
          </Button>
        </section>
      )}
      {expandable && !expand && (
        <p className={styles.unexpandWrapper}>
          {!isRichShow && (
            <Truncate
              lines={limit}
              ellipsis={
                <span
                  onClick={(e) => {
                    setExpand(!expand)
                    e.stopPropagation()
                  }}
                  className={styles.expandButton}
                >
                  ...
                  <Translate id="expand" />
                </span>
              }
              trimWhitespace={true}
            >
              {collapsedContent}
            </Truncate>
          )}
          {isRichShow && (
            <>
              <section
                className={richWrapperClasses}
                style={{ WebkitLineClamp: limit }}
              >
                {children}
              </section>
              <button
                className={richShowMoreButtonClasses}
                onClick={() => {
                  setExpand(!expand)
                }}
              >
                <FormattedMessage
                  defaultMessage="Expand"
                  id="L79o74"
                  description="src/components/Expandable/index.tsx"
                />
              </button>
            </>
          )}
        </p>
      )}
    </section>
  )
}

import classNames from 'classnames'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import TextTruncate from 'react-text-truncate'

import { capitalizeFirstLetter, collapseContent } from '~/common/utils'
import {
  Button,
  IconArrowDown16,
  IconArrowUp16,
  TextIcon,
  Translate,
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
  const [lineHeight, setLineHeight] = useState(24)
  const [expand, setExpand] = useState(true)
  const [truncated, setTruncated] = useState(false)
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

  useEffect(() => {
    setExpandable(false)
    setExpand(true)
    setTruncated(false)
    setTimeout(() => {
      if (node?.current) {
        const height = node.current.firstElementChild?.clientHeight || 0
        const lineHeight = window
          .getComputedStyle(node.current, null)
          .getPropertyValue('line-height')
        setLineHeight(parseInt(lineHeight, 10))
        const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)

        if (lines > limit + buffer) {
          setExpandable(true)
          setExpand(false)
        }
      }
    })
  }, [content])

  return (
    <section className={contentClasses}>
      <div ref={node}>
        {(!expandable || (expandable && expand)) && <div>{children}</div>}
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
            <TextIcon icon={<IconArrowUp16 />} textPlacement="left">
              <Translate zh_hans="收起" zh_hant="收合" en="collapse" />
            </TextIcon>
          </Button>
        </section>
      )}
      {expandable && !expand && (
        <p className={styles.unexpandWrapper}>
          {!isRichShow && (
            <TextTruncate
              line={limit}
              element="span"
              truncateText=""
              text={collapsedContent}
              onTruncated={() => {
                setTruncated(true)
              }}
              textTruncateChild={
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
            />
          )}
          {!isRichShow && !truncated && (
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
          )}
          {isRichShow && (
            <>
              <div
                className={richWrapperClasses}
                style={{ maxHeight: `${limit * lineHeight}px` }}
              >
                {children}
              </div>
              <button
                className={richShowMoreButtonClasses}
                onClick={() => {
                  setExpand(!expand)
                }}
              >
                <TextIcon icon={<IconArrowDown16 />}>
                  <Translate id="expand" />
                </TextIcon>
              </button>
            </>
          )}
        </p>
      )}
    </section>
  )
}

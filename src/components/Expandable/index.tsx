import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import TextTruncate from 'react-text-truncate'

import { stripHtml } from '~/common/utils/text'
import { Button, IconArrowUp16, TextIcon, Translate } from '~/components'

import styles from './styles.css'

type CollapseTextColor =
  | 'black'
  | 'grey'
  | 'grey-light'
  | 'grey-darker'
  | 'grey-dark'
  | 'white'

interface ExpandableProps {
  children: ReactElement
  content?: string | null
  limit?: number
  buffer?: number
  color?: CollapseTextColor
  size?: 'sm' | 'md-s' | 'md'
  spacingTop?: 'base'
  textIndent?: boolean
  isRichShow?: boolean
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
}) => {
  const [expandable, setExpandable] = useState(false)
  const [lineHeight, setLineHeight] = useState(24)
  const [expand, setExpand] = useState(true)
  const [truncated, setTruncated] = useState(false)
  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)
  const collapseContent = stripHtml(
    content && content.replace(/\r?\n|\r|\s\s/g, ''),
    ''
  )
  const contentClasses = classNames({
    expandable: true,
    [`${color}`]: !!color,
    [`size-${size}`]: !!size,
    [`spacing-top-${spacingTop}`]: !!spacingTop,
    [`textIndent`]: textIndent,
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
        console.log({ height, lineHeight, limit, lines, content })

        if (lines > limit + buffer) {
          setExpandable(true)
          setExpand(false)
        }
      }
    })
  }, [content])

  return (
    <section className={contentClasses}>
      <VisuallyHidden>
        <div>{children}</div>
      </VisuallyHidden>
      <div ref={node}>
        {(!expandable || (expandable && expand)) && <div>{children}</div>}
      </div>
      {expandable && expand && (
        <section className="collapseWrapper">
          <Button
            spacing={['xxtight', 'xtight']}
            bgColor="grey-lighter"
            textColor="grey"
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <TextIcon icon={<IconArrowUp16 />}>
              <Translate zh_hans="收起" zh_hant="收合" en="collapse" />
            </TextIcon>
          </Button>
        </section>
      )}
      {expandable && !expand && (
        <p>
          {!isRichShow && (
            <TextTruncate
              line={limit}
              element="span"
              truncateText=""
              text={collapseContent}
              onTruncated={() => {
                setTruncated(true)
              }}
              textTruncateChild={
                <span
                  onClick={(e) => {
                    setExpand(!expand)
                    e.stopPropagation()
                  }}
                  className="expandButton"
                >
                  ...
                  <Translate id="expand" />
                </span>
              }
            />
          )}
          {isRichShow && (
            <div
              className="richWrapper"
              style={{ maxHeight: `${limit * lineHeight}px` }}
            >
              {children}
            </div>
          )}
          {!truncated && (
            <span
              onClick={(e) => {
                setExpand(!expand)
                e.stopPropagation()
              }}
              className="expandButton"
            >
              ...
              <Translate id="expand" />
            </span>
          )}
        </p>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

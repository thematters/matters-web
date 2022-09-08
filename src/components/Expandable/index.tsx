import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import TextTruncate from 'react-text-truncate'

import { Button, IconArrowUp16, TextIcon, Translate } from '~/components'

import { stripHtml } from '@/src/common/utils/text'

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
  content: string | null
  limit?: number
  buffer?: number
  color?: CollapseTextColor
  size?: 'sm' | 'md-s' | 'md'
  spacingTop?: 'base'
}

export const Expandable: React.FC<ExpandableProps> = ({
  children,
  content,
  limit = 3,
  buffer = 0,
  color,
  size,
  spacingTop,
}) => {
  const [expandable, setExpandable] = useState(false)
  const [expand, setExpand] = useState(true)
  const [truncated, setTruncated] = useState(false)
  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)
  const collapseContent = stripHtml(
    content && content.replace(/\r?\n|\r|\s\s/g, '')
  )
  // const collapseContent = content
  console.log({ collapseContent })
  const contentClasses = classNames({
    expandable: true,
    [`${color}`]: !!color,
    [`size-${size}`]: !!size,
    [`spacing-top-${spacingTop}`]: !!spacingTop,
  })

  useEffect(() => {
    setExpandable(false)
    setExpand(true)
    setTruncated(false)
    setTimeout(() => {
      if (node?.current) {
        console.log('styled', window.getComputedStyle(node.current, null))
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
      )}
      {expandable && !expand && (
        <p>
          <TextTruncate
            line={limit}
            element="span"
            truncateText="..."
            text={collapseContent}
            onTruncated={() => {
              setTruncated(true)
            }}
            textTruncateChild={
              <span
                onClick={() => {
                  setExpand(!expand)
                }}
                className="expandButton"
              >
                <Translate id="expand" />
              </span>
            }
          />
          {!truncated && (
            <span
              onClick={() => {
                setExpand(!expand)
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

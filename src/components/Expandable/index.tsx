import VisuallyHidden from '@reach/visually-hidden'
import classNames from 'classnames'
import React, { ReactElement, useEffect, useRef, useState } from 'react'

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
  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)
  const collapseContent = stripHtml(
    content && content.replace(/\r?\n|\r|\s\s/g, '')
  )
  const contentClasses = classNames({
    expandable: true,
    [`${color}`]: !!color,
    [`size-${size}`]: !!size,
    [`spacing-top-${spacingTop}`]: !!spacingTop,
  })

  useEffect(() => {
    setExpandable(false)
    setExpand(true)
    setTimeout(() => {
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
    })
  }, [content])

  return (
    <section
      className={contentClasses}
      style={{
        WebkitLineClamp: expand ? 'unset' : limit,
      }}
    >
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
          {collapseContent}
          <span
            onClick={() => {
              setExpand(!expand)
            }}
            className="expandButton"
          >
            ...
            <Translate id="expand" />
          </span>
        </p>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

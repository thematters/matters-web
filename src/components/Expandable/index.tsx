import React, { useEffect, useRef, useState } from 'react'

import { Icon, TextIcon, Translate } from '~/components'

import styles from './styles.css'

export const Expandable: React.FC<{
  limit?: number
  buffer?: number
}> = ({ children, limit = 3, buffer = 0 }) => {
  const [expandable, setExpandable] = useState(false)
  const [expand, setExpand] = useState(true)
  const [fontSize, setFontSize] = useState('15px')

  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)

  useEffect(() => {
    if (node?.current) {
      const height = node.current.clientHeight
      const lineHeight = window
        .getComputedStyle(node.current, null)
        .getPropertyValue('line-height')
      const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)

      if (lines > limit + buffer) {
        const childNode = node.current.firstChild as Element
        const nodeFontSize = window
          .getComputedStyle(childNode, null)
          .getPropertyValue('font-size')
        setFontSize(nodeFontSize)

        setExpandable(true)
        setExpand(false)
      }
    }
  }, [])

  return (
    <section
      className="expandable"
      style={{
        WebkitLineClamp: expand ? 'unset' : limit
      }}
    >
      <div ref={node}>{children}</div>
      {expandable && !expand && (
        <button
          type="button"
          className="expand-button"
          onClick={() => setExpand(true)}
        >
          <TextIcon
            icon={<Icon.Expand size="xs" />}
            weight="normal"
            color="green"
            style={{ fontSize }}
          >
            <Translate zh_hant="展開" zh_hans="展开" />
          </TextIcon>
        </button>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

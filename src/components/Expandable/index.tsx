import React, { useEffect, useRef, useState } from 'react'

import { Translate } from '~/components'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import ICON_EXPAND from '~/static/icons/expand.svg?sprite'

import styles from './styles.css'

export const Expandable: React.FC<{ limit?: number; buffer?: number }> = ({
  children,
  limit = 3,
  buffer = 0
}) => {
  const [expandable, setExpandable] = useState(false)
  const [expand, setExpand] = useState(true)
  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)

  useEffect(() => {
    if (node && node.current) {
      const height = node.current.clientHeight
      const lineHeight = window
        .getComputedStyle(node.current, null)
        .getPropertyValue('line-height')
      const lines = Math.max(Math.ceil(height / parseInt(lineHeight, 10)), 0)

      if (lines > limit + buffer) {
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
      <div ref={node} style={{ overflow: 'hidden' }}>
        {children}
      </div>
      {expandable && !expand && (
        <button type="button" onClick={() => setExpand(true)}>
          <TextIcon
            icon={
              <Icon
                id={ICON_EXPAND.id}
                viewBox={ICON_EXPAND.viewBox}
                size="xsmall"
              />
            }
            size="sm"
            weight="normal"
            color="green"
          >
            <Translate zh_hant="展開" zh_hans="展开" />
          </TextIcon>
        </button>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

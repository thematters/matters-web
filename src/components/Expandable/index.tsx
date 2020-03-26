import React, { useEffect, useRef, useState } from 'react'

import { Button, Icon, TextIcon, Translate } from '~/components'

import styles from './styles.css'

interface ExpandableProps {
  limit?: number
  buffer?: number
}

export const Expandable: React.FC<ExpandableProps> = ({
  children,
  limit = 3,
  buffer = 0,
}) => {
  const [expandable, setExpandable] = useState(false)
  const [expand, setExpand] = useState(true)

  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)

  useEffect(() => {
    if (node?.current) {
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
        WebkitLineClamp: expand ? 'unset' : limit,
      }}
    >
      <div ref={node}>{children}</div>

      {expandable && !expand && (
        <Button
          spacing={['xxtight', 'xtight']}
          bgColor="green-lighter"
          textColor="green"
          onClick={() => {
            setExpand(true)
          }}
        >
          <TextIcon icon={<Icon.Expand size="xs" />}>
            <Translate id="expand" />
          </TextIcon>
        </Button>
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

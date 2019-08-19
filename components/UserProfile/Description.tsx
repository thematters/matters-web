import { useEffect, useRef, useState } from 'react'

import { Translate } from '~/components'
import { Icon } from '~/components/Icon'
import { TextIcon } from '~/components/TextIcon'

import ICON_EXPAND from '~/static/icons/expand.svg?sprite'

import styles from './styles.css'

const Description = ({ description }: { description: string }) => {
  const [expandable, setExpandable] = useState(false)
  const [expand, setExpand] = useState(false)
  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)

  useEffect(() => {
    if (node && node.current) {
      const height = node.current.clientHeight
      const lineHeight = window
        .getComputedStyle(node.current, null)
        .getPropertyValue('line-height')
      const lines = Math.max(Math.floor(height / parseInt(lineHeight, 10)), 0)

      if (lines >= 3) {
        setExpandable(true)
      }
    }
  }, [])

  return (
    <section className={`description ${expand ? 'expand' : ''}`}>
      <p ref={node}>{description}</p>
      {expandable && !expand && (
        <button type="button" onClick={() => setExpand(true)}>
          <TextIcon
            icon={
              <Icon
                id={ICON_EXPAND.id}
                viewBox={ICON_EXPAND.viewBox}
                size="xsmall"
                color="green"
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

export default Description

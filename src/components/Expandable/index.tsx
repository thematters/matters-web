import classNames from 'classnames'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconUp } from '@/public/static/icons/24px/up.svg'
import { capitalizeFirstLetter, stripHtml } from '~/common/utils'
import {
  Button,
  Icon,
  TextIcon,
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
  size?: 14 | 15 | 16
  spacingTop?: 'tight' | 'base'
  textIndent?: boolean
  isRichShow?: boolean
  isComment?: boolean
  collapseable?: boolean
  bgColor?: 'greyLighter' | 'white'
}

const calculateCommentContentHeight = (element: HTMLElement): number => {
  let height = 0
  const contentNode = element.firstElementChild?.firstElementChild
  if (contentNode) {
    contentNode.childNodes.forEach((child) => {
      const e = child as HTMLElement
      height += e.clientHeight
    })
  }
  return height
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
  isComment = false,
  collapseable = true,
  bgColor = 'white',
}) => {
  const [isOverFlowing, setIsOverFlowing] = useState(false)
  const [firstRender, setFirstRender] = useState(true)
  const [expand, setExpand] = useState(true)
  const node: React.RefObject<HTMLParagraphElement> | null = useRef(null)
  const collapsedContent = stripHtml(content || '')

  const contentClasses = classNames({
    [styles.content]: true,
    [styles[`${color}`]]: !!color,
    [styles[`text${size}`]]: !!size,
    [styles[`spacingTop${capitalizeFirstLetter(spacingTop || '')}`]]:
      !!spacingTop,
    [styles.textIndent]: textIndent,
  })

  const richWrapperClasses = classNames({
    [styles.richWrapper]: true,
    [styles[`${bgColor}`]]: !!bgColor,
  })

  const richShowMoreButtonClasses = classNames({
    [styles.richShowMoreButton]: true,
    [styles[`${bgColor}`]]: !!bgColor,
    [styles[`text${size}`]]: !!size,
  })

  useIsomorphicLayoutEffect(() => {
    setIsOverFlowing(false)
    setExpand(true)
    if (node?.current) {
      let height = node.current.firstElementChild?.clientHeight || 0
      if (isRichShow && isComment) {
        height = calculateCommentContentHeight(node.current)
      }

      const lineHeight = window
        .getComputedStyle(node.current, null)
        .getPropertyValue('line-height')
      const lines = Math.max(Math.ceil(height / parseFloat(lineHeight)), 0)

      if (lines > limit + buffer) {
        setIsOverFlowing(true)
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
        {(!isOverFlowing || (isOverFlowing && expand)) && (
          <div
            className={firstRender ? styles.lineClamp : ''}
            // Set WebkitLineClamp to limit + 2 to prevent displaying too many lines
            // thus providing a better user experience when first render.
            style={{ WebkitLineClamp: limit + 2 }}
          >
            {children}
          </div>
        )}
      </div>
      {isOverFlowing && collapseable && expand && !isRichShow && (
        <section className={styles.collapseWrapper}>
          <Button
            spacing={[4, 8]}
            bgColor="greyLighter"
            textColor="grey"
            onClick={() => {
              setExpand(!expand)
            }}
          >
            <TextIcon icon={<Icon icon={IconUp} />} placement="left">
              <FormattedMessage defaultMessage="Collapse" id="W/V6+Y" />
            </TextIcon>
          </Button>
        </section>
      )}
      {isOverFlowing && !expand && (
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
                  <FormattedMessage defaultMessage="Expand" id="0oLj/t" />
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

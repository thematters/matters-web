import classNames from 'classnames'
import { forwardRef } from 'react'

import { Card, CardProps, IconArrowRight16, TextIcon } from '~/components'

import styles from './styles.module.css'

type ItemProps = {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode

  leftAlign?: 'top'
  right?: React.ReactNode
  rightText?: string | React.ReactNode
  rightTextColor?: 'green' | 'grey-darker' | 'black'
  rightSubText?: string | React.ReactNode
  forceGreyStyle?: boolean
  bold?: boolean

  ref?: any
} & CardProps

const Item: React.FC<ItemProps> = forwardRef(
  (
    {
      title,
      subtitle,
      leftAlign,
      right,
      rightText,
      rightTextColor = 'grey-darker',
      rightSubText,

      forceGreyStyle,
      bold,

      ...cardProps
    },
    ref
  ) => {
    const clickable = cardProps.href || cardProps.htmlHref || cardProps.onClick
    const leftClasses = classNames({
      left: true,
      top: leftAlign === 'top',
      bold: !!bold,
    })
    const itemContent = (
      <section className="container">
        <section className={leftClasses}>
          <h5 className="title">{title}</h5>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </section>

        <section className="right">
          {right || (
            <TextIcon
              icon={clickable && <IconArrowRight16 color={'grey'} />}
              size="md"
              textPlacement="left"
              spacing="xtight"
              color={rightTextColor}
            >
              {rightText}
              {rightSubText && <span className="subtext">{rightSubText}</span>}
            </TextIcon>
          )}
        </section>
      </section>
    )

    return (
      <li role="listitem">
        <Card
          bgActiveColor="none"
          {...cardProps}
          spacing={cardProps.spacing || [0, 0]}
          ref={ref}
        >
          {itemContent}
        </Card>
      </li>
    )
  }
)

Item.displayName = 'List.Item'

export default Item

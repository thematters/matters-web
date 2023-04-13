import classNames from 'classnames'
import { forwardRef } from 'react'

import {
  Card,
  CardProps,
  IconArrowRight16,
  Media,
  TextIcon,
} from '~/components'

import styles from './styles.css'

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
              icon={
                clickable && (
                  <IconArrowRight16 color={bold ? 'black' : 'grey'} />
                )
              }
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

        <style jsx>{styles}</style>
      </section>
    )

    return (
      <li role="listitem">
        <>
          <Media at="sm">
            <Card
              bgColor={forceGreyStyle ? 'grey-lighter' : 'white'}
              {...cardProps}
              spacing={cardProps.spacing || [0, 0]}
              ref={ref}
            >
              {itemContent}
            </Card>
          </Media>
          <Media greaterThan="sm">
            <Card
              bgColor="grey-lighter"
              {...cardProps}
              spacing={cardProps.spacing || [0, 0]}
              ref={ref}
            >
              {itemContent}
            </Card>
          </Media>
        </>

        <style jsx>{styles}</style>
      </li>
    )
  }
)

Item.displayName = 'List.Item'

export default Item

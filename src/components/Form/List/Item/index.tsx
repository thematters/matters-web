import classNames from 'classnames'
import { forwardRef } from 'react'

import { Card, CardProps, IconArrowRight20, TextIcon } from '~/components'

import styles from './styles.module.css'

type ItemProps = {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode

  right?: React.ReactNode
  rightText?: string | React.ReactNode
  rightTextColor?: 'green' | 'greyDarker' | 'grey' | 'black'
  rightSubText?: string | React.ReactNode
  rightIcon?: React.ReactNode

  bold?: boolean
  clickable?: boolean

  ref?: any
} & CardProps

const Item: React.FC<ItemProps> = forwardRef(
  (
    {
      title,
      subtitle,
      right,
      rightText,
      rightTextColor = 'greyDarker',
      rightSubText,
      rightIcon = <IconArrowRight20 size="mdS" color="greyDarker" />,

      bold,
      clickable: isClickable,

      ...cardProps
    },
    ref
  ) => {
    const clickable =
      isClickable || cardProps.href || cardProps.htmlHref || cardProps.onClick
    const leftClasses = classNames({
      [styles.left]: true,
      [styles.bold]: !!bold,
    })
    const rightClasses = classNames({
      [styles.right]: true,
      [styles.clickable]: !!clickable,
    })

    const itemContent = (
      <section className={styles.container}>
        <section className={leftClasses}>
          <h5 className={styles.title}>{title}</h5>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </section>

        <section className={rightClasses}>
          {right || (
            <TextIcon
              icon={clickable && rightIcon}
              size="sm"
              textPlacement="left"
              spacing="basexxtight"
              color={rightTextColor}
            >
              {rightText}
              {rightSubText && (
                <span className={styles.subtext}>{rightSubText}</span>
              )}
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

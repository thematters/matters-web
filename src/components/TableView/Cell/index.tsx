import classNames from 'classnames'
import { forwardRef } from 'react'

import IconRight from '@/public/static/icons/24px/right.svg'
import { capitalizeFirstLetter } from '~/common/utils'
import { Card, CardProps, Icon } from '~/components'

import styles from './styles.module.css'

type CellProps = {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode

  right?: React.ReactNode
  rightText?: string | React.ReactNode
  rightTextColor?: 'green' | 'greyDarker' | 'grey' | 'black'
  rightIcon?: React.ReactNode

  ref?: React.Ref<HTMLDivElement>
} & CardProps

const Cell: React.FC<CellProps> = forwardRef<HTMLDivElement, CellProps>(
  (
    {
      title,
      subtitle,

      right,
      rightText,
      rightTextColor = 'greyDarker',
      rightIcon = <Icon icon={IconRight} size={20} color="greyDarker" />,

      ...cardProps
    },
    ref
  ) => {
    const clickable = cardProps.href || cardProps.htmlHref || cardProps.onClick
    const leftClasses = classNames({
      [styles.left]: true,
    })
    const rightClasses = classNames({
      [styles.right]: true,
      [styles[`rightText${capitalizeFirstLetter(rightTextColor)}`]]: true,
    })

    const itemContent = (
      <section className={styles.container}>
        <section className={leftClasses}>
          <h5 className={styles.title}>{title}</h5>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </section>

        <section className={rightClasses}>
          {right || (
            <>
              <span className={styles.text}>{rightText}</span>
              {clickable && rightIcon}
            </>
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

Cell.displayName = 'TableView.Cell'

export default Cell

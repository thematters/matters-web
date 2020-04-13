import { Card, CardProps, Icon, TextIcon, useResponsive } from '~/components'

import styles from './styles.css'

type ItemProps = {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  rightText?: string | React.ReactNode
  rightTextColor?: 'green' | 'grey-darker'
  rightSubText?: string | React.ReactNode
} & CardProps

const Item: React.FC<ItemProps> = ({
  title,
  subtitle,
  rightText,
  rightTextColor = 'grey-darker',
  rightSubText,

  ...cardProps
}) => {
  const isSmallUp = useResponsive('sm-up')
  const clickable = cardProps.as || cardProps.href || cardProps.onClick

  return (
    <li>
      <Card
        bgColor={isSmallUp ? 'grey-lighter' : 'white'}
        {...cardProps}
        spacing={cardProps.spacing || [0, 0]}
      >
        <section className="container">
          <section className="left">
            <h5 className="title">{title}</h5>
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </section>

          <section className="right">
            <TextIcon
              icon={clickable && <Icon.Right color="grey" />}
              size="md"
              textPlacement="left"
              spacing="xtight"
              color={rightTextColor}
            >
              {rightText}
              {rightSubText && <span className="subtext">{rightSubText}</span>}
            </TextIcon>
          </section>
        </section>
      </Card>

      <style jsx>{styles}</style>
    </li>
  )
}

export default Item

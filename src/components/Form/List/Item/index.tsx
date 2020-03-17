import { Card, CardProps, Icon, TextIcon, useResponsive } from '~/components'

import styles from './styles.css'

type ItemProps = {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  rightText?: string | React.ReactNode
} & CardProps

const Item: React.FC<ItemProps> = ({
  title,
  subtitle,
  rightText,

  ...cardProps
}) => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <li>
      <Card
        bgColor={isSmallUp ? 'grey-lighter' : 'white'}
        {...cardProps}
        spacing={cardProps.spacing || [0, 0]}
      >
        <section className="container">
          <section>
            <h5 className="title">{title}</h5>
            {subtitle && <p className="subtitle">{subtitle}</p>}
          </section>

          <TextIcon
            icon={<Icon.Right size="xs" color="grey" />}
            textPlacement="left"
            spacing="xtight"
            color="green"
          >
            {rightText}
          </TextIcon>
        </section>
      </Card>

      <style jsx>{styles}</style>
    </li>
  )
}

export default Item

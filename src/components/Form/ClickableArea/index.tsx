import { Card, CardProps, Icon, TextIcon } from '~/components'

import styles from './styles.css'

type ClickableAreaProps = {
  title: string | React.ReactNode
  subtitle?: string | React.ReactNode
  rightText?: string | React.ReactNode
} & CardProps

const ClickableArea: React.FC<ClickableAreaProps> = ({
  title,
  subtitle,
  rightText,

  ...cardProps
}) => (
  <Card {...cardProps} spacing={cardProps.spacing || [0, 0]}>
    <section className="container">
      <section className="left">
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </section>

      <section className="right">
        <TextIcon
          icon={<Icon.Right size="xs" color="grey" />}
          textPlacement="left"
          spacing="xtight"
          color="green"
        >
          {rightText}
        </TextIcon>
      </section>

      <style jsx>{styles}</style>
    </section>
  </Card>
)

export default ClickableArea

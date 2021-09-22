import { Card, CardProps, IconArrowRight16, withIcon } from '~/components'

import { ReactComponent as IconOnboardChecked } from '@/public/static/icons/40px/done.svg'

import styles from './styles.css'

type TaskItemProps = {
  order: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  done?: boolean

  hasArrowIcon?: boolean
} & CardProps

const TaskItem: React.FC<TaskItemProps> = ({
  order,
  title,
  subtitle,
  done,
  hasArrowIcon = true,
  ...cardProps
}) => {
  return (
    <section>
      <Card
        bgColor="grey-lighter"
        borderRadius="base"
        spacing={['tight', 'base']}
        {...cardProps}
      >
        <section className="container">
          <section className="left">
            <section className="content">
              <p className="order">{order}</p>
              <h5 className="title">{title}</h5>
              {subtitle && <p className="subtitle">{subtitle}</p>}
            </section>
          </section>

          <section className="right">
            {done && (
              <span className="check">
                {withIcon(IconOnboardChecked)({ size: 'sm', color: 'gold' })}
              </span>
            )}
            {!done && hasArrowIcon && <IconArrowRight16 color="grey" />}
          </section>
        </section>
      </Card>

      <style jsx>{styles}</style>
    </section>
  )
}

export default TaskItem

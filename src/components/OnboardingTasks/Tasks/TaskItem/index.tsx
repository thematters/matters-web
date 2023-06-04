import { ReactComponent as IconOnboardChecked } from '@/public/static/icons/40px/done.svg'
import { Card, CardProps, IconArrowRight16, withIcon } from '~/components'

import styles from './styles.module.css'

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
        bgColor="greyLighter"
        borderRadius="base"
        spacing={['tight', 'base']}
        {...cardProps}
      >
        <section className={styles.container}>
          <section className={styles.left}>
            <section className={styles.content}>
              <p className={styles.order}>{order}</p>
              <h5 className={styles.title}>{title}</h5>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </section>
          </section>

          <section className={styles.right}>
            {done && (
              <span className={styles.check}>
                {withIcon(IconOnboardChecked)({ size: 'sm', color: 'gold' })}
              </span>
            )}
            {!done && hasArrowIcon && <IconArrowRight16 color="grey" />}
          </section>
        </section>
      </Card>
    </section>
  )
}

export default TaskItem

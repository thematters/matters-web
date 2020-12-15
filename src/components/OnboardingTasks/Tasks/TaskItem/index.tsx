import classNames from 'classnames'

import { Card, CardProps, IconRight, withIcon } from '~/components'

import { ReactComponent as IconOnboardChecked } from '@/public/static/icons/onboard-checked.svg'

import styles from './styles.css'

type TaskItemProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  done?: boolean
} & CardProps

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  subtitle,
  done,
  ...cardProps
}) => {
  const clickable = cardProps.href || cardProps.onClick

  const containerClasses = classNames({
    container: true,
    done,
  })

  return (
    <li>
      <Card bgColor="white" {...cardProps} spacing={['tight', 'base']}>
        <section className={containerClasses}>
          <section className="left">
            <span className="check">
              {withIcon(IconOnboardChecked)({ size: 'xl-m' })}
            </span>

            <section className="content">
              <h5 className="title">{title}</h5>
              {subtitle && <p className="subtitle">{subtitle}</p>}
            </section>
          </section>

          {clickable && (
            <section className="right">
              <IconRight color="grey" />
            </section>
          )}
        </section>
      </Card>

      <style jsx>{styles}</style>
    </li>
  )
}

export default TaskItem

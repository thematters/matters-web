import classNames from 'classnames'
import { forwardRef } from 'react'

import { ReactComponent as IconDown } from '@/public/static/icons/24px/down.svg'
import { Card, CardProps, Icon, TextIcon } from '~/components'

import styles from './styles.module.css'

type OptionProps = {
  id?: string
  name: string | React.ReactNode
  subtitle?: string | React.ReactNode
  extra?: string | React.ReactNode

  selected?: boolean
  expanded?: boolean

  size?: 14 | 16

  role?: 'button' | 'option'

  ref?: any
} & CardProps

const Option: React.FC<OptionProps> = forwardRef(
  (
    {
      id,
      name,
      subtitle,
      extra,

      selected,
      expanded,

      size = 16,

      role = 'option',

      onClick,

      ...cardProps
    },
    ref
  ) => {
    const nameClasses = classNames({
      [styles.name]: true,
      [styles[`text${size}`]]: !!size,
    })

    return (
      <li
        {...(id ? { id } : {})}
        {...(role === 'option'
          ? { role: 'option', 'aria-selected': !!selected }
          : { role: 'button' })}
        onClick={onClick}
      >
        <Card
          bgColor={expanded ? undefined : 'greyLighter'}
          {...cardProps}
          spacing={cardProps.spacing || [0, 0]}
          ref={ref}
        >
          <section className={styles.container}>
            <section className={styles.left}>
              <h5 className={nameClasses}>{name}</h5>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              {extra && <div className={styles.extra}>{extra}</div>}
            </section>

            {!expanded && (
              <section className={styles.right}>
                <TextIcon icon={<Icon icon={IconDown} color="grey" />} />
              </section>
            )}
          </section>
        </Card>
      </li>
    )
  }
)

Option.displayName = 'Option'

export default Option

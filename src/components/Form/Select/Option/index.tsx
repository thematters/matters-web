import classNames from 'classnames'
import { forwardRef } from 'react'

import { Card, CardProps, IconArrowDown16, TextIcon } from '~/components'

import styles from './styles.css'

type OptionProps = {
  id?: string
  name: string | React.ReactNode
  subtitle?: string | React.ReactNode
  extra?: string | React.ReactNode

  selected?: boolean
  expanded?: boolean

  size?: 'md' | 'sm'

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

      size = 'md',

      role = 'option',

      ...cardProps
    },
    ref
  ) => {
    const nameClasses = classNames({
      name: true,
      [`${size}`]: !!size,
    })

    return (
      <li
        {...(id ? { id } : {})}
        {...(role === 'option'
          ? { role: 'option', 'aria-selected': !!selected }
          : {})}
      >
        <Card
          bgColor={expanded ? undefined : 'grey-lighter'}
          {...(role === 'option' ? {} : { role: 'button' })}
          {...cardProps}
          spacing={cardProps.spacing || [0, 0]}
          ref={ref}
        >
          <section className="container">
            <section className="left">
              <h5 className={nameClasses}>{name}</h5>
              {subtitle && <p className="subtitle">{subtitle}</p>}
              {extra && <p className="extra">{extra}</p>}
            </section>

            {!expanded && (
              <section className="right">
                <TextIcon icon={<IconArrowDown16 color="grey" />} />
              </section>
            )}
          </section>
        </Card>

        <style jsx>{styles}</style>
      </li>
    )
  }
)

Option.displayName = 'Option'

export default Option

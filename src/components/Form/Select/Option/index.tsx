import classNames from 'classnames'
import { forwardRef } from 'react'

import { Card, CardProps, IconArrowDown16, TextIcon } from '~/components'

import styles from './styles.css'

type OptionProps = {
  id?: string
  name: string | React.ReactNode
  subtitle?: string | React.ReactNode

  selected?: boolean
  expanded?: boolean

  size?: 'md' | 'sm'

  ariaRole?: 'button' | 'option'

  ref?: any
} & CardProps

const Option: React.FC<OptionProps> = forwardRef(
  (
    {
      id,
      name,
      subtitle,

      selected,
      expanded,

      size = 'md',

      ariaRole = 'option',

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
        {...(ariaRole === 'option'
          ? { ariaRole: 'option', 'aria-selected': !!selected }
          : { ariaRole: 'button' })}
      >
        <Card
          bgColor={expanded ? undefined : 'grey-lighter'}
          {...cardProps}
          spacing={cardProps.spacing || [0, 0]}
          ref={ref}
        >
          <section className="container">
            <section className="left">
              <h5 className={nameClasses}>{name}</h5>
              {subtitle && <p className="subtitle">{subtitle}</p>}
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

export default Option

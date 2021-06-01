import { forwardRef } from 'react'

import { Card, CardProps, IconArrowDown16, TextIcon } from '~/components'

import styles from './styles.css'

type OptionProps = {
  name: string | React.ReactNode
  subtitle?: string | React.ReactNode

  selected?: boolean
  expanded?: boolean

  ref?: any
} & CardProps

const Option: React.FC<OptionProps> = forwardRef(
  (
    {
      name,
      subtitle,

      selected,
      expanded,

      ...cardProps
    },
    ref
  ) => {
    return (
      <li role="option" aria-selected={!!selected}>
        <Card
          bgColor={expanded ? undefined : 'grey-lighter'}
          {...cardProps}
          spacing={cardProps.spacing || [0, 0]}
          ref={ref}
        >
          <section className="container">
            <section className="left">
              <h5 className="name">{name}</h5>
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

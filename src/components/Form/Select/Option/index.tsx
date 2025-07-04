import classNames from 'classnames'
import { forwardRef } from 'react'

import IconDown from '@/public/static/icons/24px/down.svg'
import {
  Card,
  CardBgColor,
  CardBorderColor,
  CardBorderRadius,
  CardProps,
  Icon,
  IconColor,
  TextIcon,
} from '~/components'

import styles from './styles.module.css'

type OptionProps = {
  id?: string
  name: string | React.ReactNode
  subtitle?: string | React.ReactNode
  extra?: string | React.ReactNode

  selected?: boolean
  expanded?: boolean
  disabled?: boolean

  size?: 14 | 16
  theme?: 'campaign' | 'editorDatePicker'

  role?: 'button' | 'option'

  ref?: React.RefObject<HTMLLIElement>
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
      disabled,

      size = 16,
      theme,

      role = 'option',

      onClick,

      ...cardProps
    },
    ref
  ) => {
    const containerClasses = classNames({
      [styles.container]: true,
      [styles[`${theme}`]]: !!theme,
      [styles.expanded]: expanded,
      [styles.disabled]: disabled,
    })
    const nameClasses = classNames({
      [styles.name]: true,
      [styles[`text${size}`]]: !!size,
    })

    let bgColor: CardBgColor = 'greyLighter'
    let color: IconColor = 'grey'
    let borderColor: CardBorderColor | undefined = undefined
    let borderRadius: CardBorderRadius | undefined = undefined
    if (theme === 'campaign') {
      bgColor = 'campaignBlue'
      color = 'campaignBlue'
    } else if (theme === 'editorDatePicker') {
      bgColor = 'white'
      color = 'black'
      borderColor = 'lineGreyLight'
      borderRadius = 'xtight'
    }

    return (
      <li
        {...(id ? { id } : {})}
        {...(role === 'option'
          ? { role: 'option', 'aria-selected': !!selected }
          : { role: 'button' })}
        onClick={disabled ? undefined : onClick}
      >
        <Card
          bgColor={expanded ? undefined : bgColor}
          borderColor={expanded ? undefined : borderColor}
          borderRadius={expanded ? undefined : borderRadius}
          {...cardProps}
          spacing={cardProps.spacing || [0, 0]}
          ref={ref}
        >
          <section className={containerClasses}>
            <section className={styles.left}>
              <h5 className={nameClasses}>{name}</h5>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
              {extra && <div className={styles.extra}>{extra}</div>}
            </section>

            {!expanded && (
              <section className={styles.right}>
                <TextIcon icon={<Icon icon={IconDown} color={color} />} />
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

import classNames from 'classnames'
import React, { useContext } from 'react'

import { capitalizeFirstLetter, datetimeFormat } from '~/common/utils'
import { LanguageContext } from '~/components'

import styles from './styles.module.css'

interface DateTimeProps {
  date: Date | string | number
  size?: 'xs' | 'sm'
  color?: 'grey' | 'greyDark'
  type?: 'absolute' | 'relative' | 'standard'
}

/**
 * This component is for DateTime showing
 *
 * Usage:
 *
 * ```tsx
 * // absolute date
 * <DateTime date="2019-02-15T08:09:03.626Z" type="absolute" />
 *
 * // relative date
 * <DateTime date={1550218410080} type="relative" />
 * <DateTime date={new Date()} type="relative" />
 *
 * ```
 */

const BaseDateTime = ({
  date,
  size = 'xs',
  type = 'absolute',
  color = 'greyDark',
}: DateTimeProps) => {
  const { lang } = useContext(LanguageContext)
  const timeclasses = classNames({
    [styles.time]: true,
    [styles[color]]: !!color,
    [styles[`size${capitalizeFirstLetter(size)}`]]: !!size,
  })

  return (
    <time dateTime={new Date(date).toISOString()} className={timeclasses}>
      {datetimeFormat[type](date, lang)}
    </time>
  )
}

/**
 * Memoizing
 */
type MemoizedDateTime = React.MemoExoticComponent<React.FC<DateTimeProps>>

export const DateTime = React.memo(BaseDateTime) as MemoizedDateTime

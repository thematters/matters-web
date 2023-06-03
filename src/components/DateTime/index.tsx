import classNames from 'classnames'
import React, { useContext } from 'react'

import { datetimeFormat } from '~/common/utils'
import { LanguageContext } from '~/components'

import styles from './styles.module.css'

interface DateTimeProps {
  date: Date | string | number
  color?: 'grey' | 'grey-dark'
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
  type = 'absolute',
  color = 'grey-dark',
}: DateTimeProps) => {
  const { lang } = useContext(LanguageContext)
  const timeclasses = classNames({
    [styles.time]: true,
    [styles[color]]: !!color,
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

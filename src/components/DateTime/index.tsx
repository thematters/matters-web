import React, { useContext } from 'react'

import { datetimeFormat } from '~/common/utils'
import { LanguageContext } from '~/components'

import styles from './styles.css'

interface DateTimeProps {
  date: Date | string | number
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

const BaseDateTime = ({ date, type = 'absolute' }: DateTimeProps) => {
  const { lang } = useContext(LanguageContext)

  return (
    <time dateTime={new Date(date).toISOString()}>
      {datetimeFormat[type](date, lang)}

      <style jsx>{styles}</style>
    </time>
  )
}

/**
 * Memoizing
 */
type MemoizedDateTime = React.MemoExoticComponent<React.FC<DateTimeProps>>

export const DateTime = React.memo(BaseDateTime) as MemoizedDateTime

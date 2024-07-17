import classNames from 'classnames'
import React, { useContext } from 'react'

import { capitalizeFirstLetter, datetimeFormat } from '~/common/utils'
import { LanguageContext } from '~/components'

import styles from './styles.module.css'

interface DateTimeProps {
  date: Date | string | number
  size?: 'xs' | 'sm'
  color?: 'grey' | 'greyDark' | 'greyDarker'
}

const BaseDateTime = ({
  date,
  size = 'xs',
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
      {datetimeFormat['relative'](date, lang)}
    </time>
  )
}

/**
 * Memoizing
 */
type MemoizedDateTime = React.MemoExoticComponent<React.FC<DateTimeProps>>

export const DateTime = React.memo(BaseDateTime) as MemoizedDateTime

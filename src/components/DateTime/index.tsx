import { LanguageConsumer } from '~/components'

import { datetimeFormat } from '~/common/utils'

import styles from './styles.css'

interface DateTimeProps {
  date: Date | string | number
  type?: 'absolute' | 'relative' | 'standard'
}

/**
 * <DateTime> component will
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

export const DateTime: React.FC<DateTimeProps> = ({
  date,
  type = 'absolute'
}) => (
  <LanguageConsumer>
    {({ lang }) => (
      <time dateTime={new Date(date).toISOString()}>
        {datetimeFormat[type](date, lang)}

        <style jsx>{styles}</style>
      </time>
    )}
  </LanguageConsumer>
)

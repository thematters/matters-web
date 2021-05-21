import classNames from 'classnames'
import differenceInDays from 'date-fns/differenceInDays'
import parseISO from 'date-fns/parseISO'

import { Translate } from '~/components'

import styles from './styles.css'

import { CircleInvitation as CircleInvitationType } from './__generated__/CircleInvitation'

type PeriodProps = Pick<
  CircleInvitationType,
  'freePeriod' | 'acceptedAt' | 'state'
>

const Period = ({ freePeriod, acceptedAt, state }: PeriodProps) => {
  const isPending = state === 'pending'
  const isAccepted = state === 'accepted'

  const classes = classNames({
    period: true,
    'margin-right': isPending,
  })

  if (isPending) {
    return (
      <span className={classes}>
        {freePeriod} <Translate id="days" />
        <style jsx>{styles}</style>
      </span>
    )
  }

  if (isAccepted && acceptedAt) {
    const date = parseISO(acceptedAt)
    const diffDays = differenceInDays(new Date(), date) || 1
    const remainDays = freePeriod - diffDays

    return (
      <span className={classes}>
        <Translate zh_hant="剩餘" zh_hans="剩余" en="Trial ends in" /> {remainDays}{' '}
        <Translate id="days" />
        <style jsx>{styles}</style>
      </span>
    )
  }

  return null
}

export default Period

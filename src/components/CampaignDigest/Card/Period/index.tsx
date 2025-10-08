import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import IconDot from '@/public/static/icons/dot.svg'
import { datetimeFormat, isUTC8 } from '~/common/utils'
import { Icon, LanguageContext } from '~/components'
import { CampaignDigestCardCampaignFragment } from '~/gql/graphql'

import styles from './styles.module.css'

type PeriodProps = {
  campaign: CampaignDigestCardCampaignFragment
  hasDot?: boolean
}

const Period = ({ campaign, hasDot }: PeriodProps) => {
  const { lang } = useContext(LanguageContext)
  const { start: applyStart, end: applyEnd } = campaign.applicationPeriod || {}
  const { start: writingStart, end: writingEnd } = campaign.writingPeriod || {}

  const now = new Date()
  const isInWritingPeriod = now >= new Date(writingStart)
  const isInApplyPeriod = !isInWritingPeriod && now >= new Date(applyStart)

  return (
    <span className={styles.period}>
      {isInApplyPeriod && (
        <>
          {hasDot && <Icon icon={IconDot} color="greyLight" size={20} />}
          <FormattedMessage
            defaultMessage="Application period{tz}: {period}"
            id="wC7v0l"
            values={{
              tz: isUTC8() ? '' : ' (UTC+8) ',
              period: (
                <span>
                  {applyStart
                    ? datetimeFormat.absolute.monthDay(applyStart, lang, true)
                    : ''}{' '}
                  -{' '}
                  {applyEnd
                    ? datetimeFormat.absolute.monthDay(applyEnd, lang, true)
                    : ''}
                </span>
              ),
            }}
          />
        </>
      )}
      {isInWritingPeriod && (
        <>
          {hasDot && <Icon icon={IconDot} color="greyLight" size={20} />}
          <FormattedMessage
            defaultMessage="Event period{tz}"
            id="K+pFNS"
            values={{ tz: isUTC8() ? '' : ' (UTC+8)' }}
          />
          {lang === 'en' ? ': ' : '：'}
          <span>
            {writingStart
              ? datetimeFormat.absolute({
                  date: writingStart,
                  lang,
                  utc8: true,
                })
              : ''}{' '}
            -{' '}
            {writingEnd
              ? datetimeFormat.absolute({
                  date: writingEnd,
                  lang,
                  utc8: true,
                })
              : ''}
          </span>
        </>
      )}
    </span>
  )
}

export default Period

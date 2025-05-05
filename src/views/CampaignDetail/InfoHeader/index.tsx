import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { datetimeFormat, isUTC8 } from '~/common/utils'
import { LanguageContext, ResponsiveImage, useChannels } from '~/components'
import {
  InfoHeaderCampaignPrivateFragment,
  InfoHeaderCampaignPublicFragment,
} from '~/gql/graphql'

import Apply from '../Apply'
import { fragments } from './gql'
import Participants from './Participants'
import styles from './styles.module.css'

type InfoHeaderProps = {
  campaign: InfoHeaderCampaignPublicFragment &
    Partial<InfoHeaderCampaignPrivateFragment>
}

const InfoHeader = ({ campaign }: InfoHeaderProps) => {
  const { lang } = useContext(LanguageContext)
  const { isInWritingChallengeChannel } = useChannels()
  const now = new Date()
  const { start: appStart, end: appEnd } = campaign.applicationPeriod || {}
  const { start: writingStart, end: writingEnd } = campaign.writingPeriod || {}
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)
  const applicationState = campaign.application?.state
  const isRejected = applicationState === 'rejected'

  const headerClasses = classNames(styles.header, {
    [styles.horizontalSpacing]: !isInWritingChallengeChannel,
  })

  const name =
    campaign[
      lang === 'zh_hans'
        ? 'nameZhHans'
        : lang === 'zh_hant'
          ? 'nameZhHant'
          : 'nameEn'
    ]

  const description =
    campaign[
      lang === 'zh_hans'
        ? 'descriptionZhHans'
        : lang === 'zh_hant'
          ? 'descriptionZhHant'
          : 'descriptionEn'
    ]

  return (
    <Apply.Dialog campaign={campaign}>
      {({ openDialog }) => (
        <header className={headerClasses}>
          {campaign.cover && (
            <section className={styles.cover}>
              <ResponsiveImage url={campaign.cover} width={1376} />
            </section>
          )}

          <section className={styles.title}>
            <h1 className={styles.name}>{name}</h1>

            <section className={styles.apply}>
              <Apply.Button
                campaign={campaign}
                size="sm"
                onClick={openDialog}
              />
            </section>
          </section>

          <section className={styles.meta}>
            <section className={styles.left}>
              {isInApplicationPeriod && (
                <span>
                  <FormattedMessage
                    defaultMessage="Application period{tz}: "
                    id="FYeEw1"
                    values={{ tz: isUTC8() ? '' : ' (UTC+8) ' }}
                  />

                  <span className={styles.period}>
                    {appStart
                      ? datetimeFormat.absolute({
                          date: appStart,
                          lang,
                          utc8: true,
                        })
                      : ''}{' '}
                    -{' '}
                    {appEnd
                      ? datetimeFormat.absolute({
                          date: appEnd,
                          lang,
                          utc8: true,
                        })
                      : ''}
                  </span>
                </span>
              )}
              {!isInApplicationPeriod && (
                <span>
                  <FormattedMessage
                    defaultMessage="Event period{tz}"
                    id="K+pFNS"
                    values={{ tz: isUTC8() ? '' : ' (UTC+8)' }}
                  />
                  {lang === 'en' ? ': ' : '：'}
                  <span className={styles.period}>
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
                </span>
              )}
            </section>
          </section>

          <section className={styles.description}>
            <p dangerouslySetInnerHTML={{ __html: description || '' }} />
          </section>

          <section className={styles.extra}>
            <Participants campaign={campaign} />
          </section>

          {!isRejected && (
            <section className={styles.mobileApply}>
              <Apply.Button
                campaign={campaign}
                size="lg"
                onClick={openDialog}
              />
            </section>
          )}
        </header>
      )}
    </Apply.Dialog>
  )
}

InfoHeader.fragments = fragments

export default InfoHeader

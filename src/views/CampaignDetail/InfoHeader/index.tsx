import classNames from 'classnames'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEMPORARY_CHANNEL_URL } from '~/common/enums'
import { datetimeFormat, isUTC8 } from '~/common/utils'
import {
  Expandable,
  LanguageContext,
  Media,
  ResponsiveImage,
  useRoute,
} from '~/components'
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
  const { isPathStartWith } = useRoute()
  const { lang } = useContext(LanguageContext)
  const now = new Date()
  const { start: appStart, end: appEnd } = campaign.applicationPeriod || {}
  const { start: writingStart, end: writingEnd } = campaign.writingPeriod || {}
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)
  const applicationState = campaign.application?.state
  const isRejected = applicationState === 'rejected'

  const isInTemporaryChannel = isPathStartWith(TEMPORARY_CHANNEL_URL, true)

  const headerClasses = classNames(styles.header, {
    [styles.horizontalSpacing]: !isInTemporaryChannel,
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
                    defaultMessage="Event period{tz}: "
                    id="krvjo9"
                    values={{ tz: isUTC8() ? '' : ' (UTC+8) ' }}
                  />
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
            <Media at="sm">
              <Expandable
                content={description}
                limit={3}
                size={15}
                collapseable={false}
              >
                <p dangerouslySetInnerHTML={{ __html: description || '' }} />
              </Expandable>
            </Media>
            <Media greaterThan="sm">
              <Expandable
                content={description}
                limit={2}
                size={15}
                collapseable={false}
              >
                <p dangerouslySetInnerHTML={{ __html: description || '' }} />
              </Expandable>
            </Media>
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

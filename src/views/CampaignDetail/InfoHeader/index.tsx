import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
import { datetimeFormat } from '~/common/utils'
import {
  DotDivider,
  Icon,
  LanguageContext,
  ResponsiveImage,
  TextIcon,
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
  const { lang } = useContext(LanguageContext)
  const now = new Date()
  const { start: appStart, end: appEnd } = campaign.applicationPeriod || {}
  const { start: writingStart } = campaign.writingPeriod || {}
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)

  return (
    <Apply.Dialog campaign={campaign}>
      {({ openDialog }) => (
        <header className={styles.header}>
          {campaign.cover && (
            <section className={styles.cover}>
              <ResponsiveImage url={campaign.cover} width={1376} />
            </section>
          )}

          <h1 className={styles.name}>{campaign.name}</h1>

          <section className={styles.meta}>
            <section className={styles.left}>
              {isInApplicationPeriod && (
                <span>
                  <FormattedMessage
                    defaultMessage="Application period: "
                    id="MnTJ0Q"
                  />
                  {datetimeFormat.absolute(appStart, lang)} -{' '}
                  {datetimeFormat.absolute(appEnd, lang)}
                </span>
              )}
              {!isInApplicationPeriod && (
                <span>
                  <FormattedMessage
                    defaultMessage="Event period: "
                    id="Bmy3Ms"
                  />
                  {datetimeFormat.absolute(writingStart, lang)} -{' '}
                  {datetimeFormat.absolute(writingStart, lang)}
                </span>
              )}

              <section className={styles.dot}>
                <DotDivider />
              </section>

              <a
                className={styles.viewMore}
                href={campaign.link}
                target="_blank"
              >
                <TextIcon
                  icon={<Icon icon={IconRight} size={14} />}
                  spacing={4}
                  placement="left"
                >
                  <FormattedMessage
                    defaultMessage="Event Information"
                    id="buf5vO"
                  />
                </TextIcon>
              </a>
            </section>

            <section className={styles.right}>
              <Apply.Button
                campaign={campaign}
                size="sm"
                onClick={openDialog}
              />
            </section>
          </section>

          <Participants campaign={campaign} />

          <section className={styles.mobileApply}>
            <Apply.Button campaign={campaign} size="lg" onClick={openDialog} />
          </section>
        </header>
      )}
    </Apply.Dialog>
  )
}

InfoHeader.fragments = fragments

export default InfoHeader

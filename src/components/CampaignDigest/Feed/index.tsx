import Link from 'next/link'
import { useContext } from 'react'

import IconDot from '@/public/static/icons/dot.svg'
import { datetimeFormat, toPath } from '~/common/utils'
import {
  Icon,
  LanguageContext,
  ResponsiveImage,
  UserDigest,
} from '~/components'
import { CampaignDigestFeedCampaignFragment } from '~/gql/graphql'

import CampaignDigestTitle from '../Title'
import { fragments } from './gql'
import styles from './styles.module.css'

type CampaignDigestFeedProps = {
  campaign: CampaignDigestFeedCampaignFragment
  isFirstFold: boolean
}

const CampaignDigestFeed = ({
  campaign,
  isFirstFold,
}: CampaignDigestFeedProps) => {
  const { lang } = useContext(LanguageContext)
  const cover = campaign.cover
  const organizer = campaign.organizers[0]
  const { start: writingStart, end: writingEnd } = campaign.writingPeriod || {}
  const path = toPath({ page: 'campaignDetail', campaign })

  const hasOrganizer = !!organizer

  return (
    <section className={styles.wrapper}>
      <section className={styles.container}>
        <section className={styles.content}>
          <section className={styles.header}>
            {hasOrganizer && (
              <UserDigest.Mini
                user={organizer}
                avatarSize={20}
                textSize={12}
                spacing={6}
                hasAvatar
                hasDisplayName
              />
            )}
            <Icon icon={IconDot} color="greyLight" size={20} />
            <span className={styles.date}>
              {datetimeFormat.absolute.monthDay(writingStart, lang, true)}
              {writingEnd && (
                <>
                  &nbsp;-&nbsp;
                  {datetimeFormat.absolute.monthDay(writingEnd, lang, true)}
                </>
              )}
            </span>
          </section>

          <CampaignDigestTitle
            className={styles.title}
            campaign={campaign}
            textWeight="normal"
            lineClamp={1}
            is="h2"
          />

          <Link {...path}>
            <p className={styles.desc}>{campaign.description}</p>
          </Link>
        </section>

        {cover && (
          <Link {...path}>
            <section className={styles.cover}>
              <ResponsiveImage
                url={cover}
                width={152}
                height={152}
                smUpWidth={212}
                smUpHeight={212}
                loading={isFirstFold ? undefined : 'lazy'}
                fetchPriority={isFirstFold ? 'high' : 'low'}
              />
            </section>
          </Link>
        )}
      </section>
    </section>
  )
}

CampaignDigestFeed.fragments = fragments

export default CampaignDigestFeed

import Link from 'next/link'

import { ReactComponent as IconRight } from '@/public/static/icons/24px/right.svg'
import { datetimeFormat } from '~/common/utils'
import { DotDivider, Icon, ResponsiveImage, TextIcon } from '~/components'
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
  const now = new Date()
  const isInApplicationPeriod =
    !campaign.applicationPeriod.end ||
    now < new Date(campaign.applicationPeriod.end)

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
                  Registration period:{' '}
                  {datetimeFormat.absolute(campaign.applicationPeriod.start)} -{' '}
                  {datetimeFormat.absolute(campaign.applicationPeriod.end)}
                </span>
              )}
              {!isInApplicationPeriod && (
                <span>
                  Wiriting period:{' '}
                  {datetimeFormat.absolute(campaign.writingPeriod.start)} -{' '}
                  {datetimeFormat.absolute(campaign.writingPeriod.start)}
                </span>
              )}

              <section className={styles.dot}>
                <DotDivider />
              </section>

              <Link href={campaign.link} legacyBehavior>
                <a className={styles.viewMore}>
                  <TextIcon
                    icon={<Icon icon={IconRight} size={14} />}
                    spacing={4}
                    placement="left"
                  >
                    View More
                  </TextIcon>
                </a>
              </Link>
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

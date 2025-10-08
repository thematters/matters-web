import Link from 'next/link'

import { toPath } from '~/common/utils'
import { Card, ResponsiveImage, UserDigest } from '~/components'
import { CampaignDigestCardCampaignFragment } from '~/gql/graphql'

import CampaignDigestTitle from '../Title'
import { fragments } from './gql'
import Label from './Label'
import Period from './Period'
import Stage from './Stage'
import styles from './styles.module.css'
import Users from './Users'

export type CampaignDigestCardProps = {
  campaign: CampaignDigestCardCampaignFragment
}

const CampaignDigestCard = ({ campaign }: CampaignDigestCardProps) => {
  const cover = campaign?.cover || null
  const organizer = campaign.organizers[0]
  const path = toPath({ page: 'campaignDetail', campaign })

  const hasOrganizer = !!organizer

  return (
    <Card {...path} spacing={[0, 0]} bgColor="none">
      <section className={styles.cover}>
        {cover && (
          <Link {...path}>
            <ResponsiveImage url={cover} width={332} />
          </Link>
        )}
      </section>

      <section className={styles.organizer}>
        {organizer && (
          <UserDigest.Mini
            user={organizer}
            avatarSize={20}
            textSize={13}
            spacing={6}
            hasAvatar
            hasDisplayName
          />
        )}
        <Period campaign={campaign} hasDot={hasOrganizer} />
      </section>

      <section className={styles.title}>
        <CampaignDigestTitle
          campaign={campaign}
          textWeight="normal"
          lineClamp={2}
          is="h2"
        />
      </section>

      <section className={styles.desc}>
        <Link {...path}>{campaign.description}</Link>
      </section>

      <section className={styles.misc}>
        <Label campaign={campaign} />
        <Stage campaign={campaign} />
        <Users campaign={campaign} />
      </section>
    </Card>
  )
}

CampaignDigestCard.fragments = fragments

export default CampaignDigestCard

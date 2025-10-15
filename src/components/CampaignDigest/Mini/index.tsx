import { toPath } from '~/common/utils'
import { Card, ResponsiveImage } from '~/components'
import { CampaignDigestMiniCampaignFragment } from '~/gql/graphql'

import CampaignDigestTitle from '../Title'
import { fragments } from './gql'
import styles from './styles.module.css'

export type CampaignDigestMiniProps = {
  campaign: CampaignDigestMiniCampaignFragment
}

const CampaignDigestMini = ({ campaign }: CampaignDigestMiniProps) => {
  const cover = campaign.cover
  const path = toPath({ page: 'campaignDetail', campaign })

  return (
    <Card {...path} spacing={[0, 0]} bgColor="none">
      {cover && (
        <section className={styles.cover}>
          <ResponsiveImage url={cover} width={264} />
        </section>
      )}
      <section className={styles.title}>
        <CampaignDigestTitle
          campaign={campaign}
          textWeight="normal"
          is="span"
        />
      </section>
    </Card>
  )
}

CampaignDigestMini.fragments = fragments

export default CampaignDigestMini

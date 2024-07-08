import gql from 'graphql-tag'

import { Layout } from '~/components'
import { DescriptionCampaignFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const Description = ({
  campaign,
}: {
  campaign: DescriptionCampaignFragment
}) => {
  return (
    <Layout.Main.Spacing hasVertical={false}>
      <section
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: campaign.description }}
      />
    </Layout.Main.Spacing>
  )
}

Description.fragments = gql`
  fragment DescriptionCampaign on WritingChallenge {
    id
    description
  }
`

export default Description

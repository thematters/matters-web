import {
  CampaignDigest,
  List,
  QueryError,
  SpinnerBlock,
  usePublicQuery,
} from '~/components'
import { CampaignDetailOtherCampaignsQuery } from '~/gql/graphql'

import { OTHER_CAMPAIGNS } from './gql'
import SectionHeader from './SectionHeader'

type OtherCampaignsProps = {
  id: string
}

const OtherCampaigns = ({ id }: OtherCampaignsProps) => {
  const { data, loading, error } =
    usePublicQuery<CampaignDetailOtherCampaignsQuery>(OTHER_CAMPAIGNS, {
      variables: { excludes: [id] },
    })
  const { edges } = data?.campaigns || {}

  if (loading) {
    return <SpinnerBlock />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  if (error) {
    return <QueryError error={error} />
  }

  return (
    <section>
      <SectionHeader />

      <List spacing={['base', 0]} hasBorder={false}>
        {edges &&
          edges.map(({ node }) => (
            <List.Item key={node.id} spacing={[0, 0]}>
              <CampaignDigest.Mini campaign={node} />
            </List.Item>
          ))}
      </List>
    </section>
  )
}

export default OtherCampaigns

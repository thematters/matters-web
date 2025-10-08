import { List, QueryError, usePublicQuery, UserDigest } from '~/components'
import { CampaignOrganizersQuery } from '~/gql/graphql'

import { CAMPAIGN_ORGANIZERS_PUBLIC } from './gql'
import SectionHeader from './SectionHeader'

const Organizers = () => {
  const { data, loading, error } = usePublicQuery<CampaignOrganizersQuery>(
    CAMPAIGN_ORGANIZERS_PUBLIC,
    {
      variables: {},
    }
  )

  const edges = data?.campaignOrganizers?.edges

  if (loading) {
    return null
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
      <List hasBorder={false}>
        {edges &&
          edges.map(({ node }) => (
            <List.Item key={node.id}>
              <UserDigest.Rich
                user={node}
                is="link"
                spacing={[8, 8]}
                bgColor="none"
                bgActiveColor="greyLighter"
                borderRadius="xtight"
                hasFollow={false}
                hasState={false}
                showLogbook={false}
              />
            </List.Item>
          ))}
      </List>
    </section>
  )
}

export default Organizers

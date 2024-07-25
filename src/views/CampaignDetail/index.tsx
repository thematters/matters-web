import { useQuery } from '@apollo/react-hooks'
import { useContext } from 'react'

import { toPath } from '~/common/utils'
import {
  EmptyLayout,
  Head,
  LanguageContext,
  Layout,
  SpinnerBlock,
  Throw404,
  useRoute,
} from '~/components'
import { QueryError } from '~/components/GQL'
import { CampaignDetailQuery } from '~/gql/graphql'

import ArticleFeeds from './ArticleFeeds'
import Description from './Description'
import { CAMPAIGN_DETAIL } from './gql'
import InfoHeader from './InfoHeader'
import SideParticipants from './SideParticipants'

const CampaignDetail = () => {
  const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { data, loading, error } = useQuery<CampaignDetailQuery>(
    CAMPAIGN_DETAIL,
    { variables: { shortHash } }
  )

  const campaign = data?.campaign

  if (loading) {
    return (
      <EmptyLayout>
        <SpinnerBlock />
      </EmptyLayout>
    )
  }

  if (!campaign) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  if (error) {
    return (
      <EmptyLayout>
        <QueryError error={error} />
      </EmptyLayout>
    )
  }

  const path = toPath({ page: 'campaignDetail', campaign })
  const now = new Date()
  const { end: appEnd } = campaign.applicationPeriod || {}
  const isInApplicationPeriod = !appEnd || now < new Date(appEnd)

  return (
    <Layout.Main aside={<SideParticipants campaign={campaign} />}>
      <Head
        title={
          campaign[
            lang === 'zh_hans'
              ? 'nameZhHans'
              : lang === 'zh_hant'
              ? 'nameZhHant'
              : 'nameEn'
          ]
        }
        path={path.href}
        description={
          campaign[
            lang === 'zh_hans'
              ? 'descriptionZhHans'
              : lang === 'zh_hant'
              ? 'descriptionZhHant'
              : 'descriptionEn'
          ]
        }
        image={campaign.cover}
      />

      <InfoHeader campaign={campaign} />

      {isInApplicationPeriod && <Description campaign={campaign} />}

      {!isInApplicationPeriod && <ArticleFeeds campaign={campaign} />}
    </Layout.Main>
  )
}

export default CampaignDetail

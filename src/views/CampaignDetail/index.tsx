import { useQuery } from '@apollo/client'
import dynamic from 'next/dynamic'
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
import { CAMPAIGN_DETAIL } from './gql'
import InfoHeader from './InfoHeader'

const DynamicSideParticipants = dynamic(() => import('./SideParticipants'), {
  loading: () => <SpinnerBlock />,
  ssr: false,
})

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

  return (
    <Layout.Main aside={<DynamicSideParticipants campaign={campaign} />}>
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
        image={campaign.cover}
      />

      <InfoHeader campaign={campaign} />

      <ArticleFeeds campaign={campaign} />
    </Layout.Main>
  )
}

export default CampaignDetail

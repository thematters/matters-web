import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import { toPath } from '~/common/utils'
import {
  EmptyLayout,
  Head,
  LanguageContext,
  Layout,
  SpinnerBlock,
  Throw404,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'
import { QueryError } from '~/components/GQL'
import { CampaignDetailPublicQuery } from '~/gql/graphql'

import ArticleFeeds from './ArticleFeeds'
import Billboard from './Billboard'
import { CAMPAIGN_DETAIL_PRIVATE, CAMPAIGN_DETAIL_PUBLIC } from './gql'
import InfoHeader from './InfoHeader'

const DynamicOtherCampaigns = dynamic(() => import('./OtherCampaigns'), {
  loading: () => <SpinnerBlock />,
  ssr: false,
})

const DynamicSideParticipants = dynamic(() => import('./SideParticipants'), {
  loading: () => <SpinnerBlock />,
  ssr: false,
})

const CampaignDetail = () => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)
  const { getQuery } = useRoute()
  const shortHash = getQuery('shortHash')

  const { data, loading, error, client } =
    usePublicQuery<CampaignDetailPublicQuery>(
      CAMPAIGN_DETAIL_PUBLIC,
      { variables: { shortHash } },
      { publicQuery: !viewer.isAdmin }
    )

  const campaign = data?.campaign

  const loadPrivate = async () => {
    if (!viewer.isAuthed || !campaign) {
      return
    }

    await client.query({
      query: CAMPAIGN_DETAIL_PRIVATE,
      fetchPolicy: 'network-only',
      variables: { shortHash },
    })
  }

  useEffect(() => {
    loadPrivate()
  }, [campaign?.shortHash, viewer.id])

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
    <Layout.Main
      aside={
        <>
          {campaign.showOther && <DynamicOtherCampaigns id={campaign.id} />}
          <DynamicSideParticipants campaign={campaign} />
          {campaign.showAd && <Billboard />}
        </>
      }
    >
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
        description={
          campaign[
            lang === 'zh_hans'
              ? 'descriptionZhHans'
              : lang === 'zh_hant'
                ? 'descriptionZhHant'
                : 'descriptionEn'
          ]
        }
      />

      <InfoHeader campaign={campaign} />

      <ArticleFeeds campaign={campaign} />
    </Layout.Main>
  )
}

export default CampaignDetail

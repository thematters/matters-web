import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import { BREAKPOINTS } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  EmptyLayout,
  Head,
  LanguageContext,
  Layout,
  SpinnerBlock,
  Throw404,
  useMediaQuery,
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

const DynamicDiscussion = dynamic(() => import('./Discussion'), {
  loading: () => <SpinnerBlock />,
  ssr: false,
})

const DynamicQuoteWall = dynamic(() => import('./QuoteWall'), {
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
  // desktop (md-up): discussion in the right aside; mobile: in the main column.
  // rendered once (not double-mounted) to avoid duplicate comment-form ids.
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)

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
          {/* desktop: quote wall + discussion sit in the right aside, below
              the avatars (quote wall first — it's the lighter "trailer") */}
          {isMdUp && (
            <>
              <DynamicQuoteWall shortHash={campaign.shortHash} />
              <DynamicDiscussion
                campaignId={campaign.id}
                shortHash={campaign.shortHash}
              />
            </>
          )}
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

      {/* mobile: the aside is hidden, so the quote wall + discussion shrink to
          one-line entries under the header (still on the first screen);
          tapping either opens its full dialog */}
      {!isMdUp && (
        <>
          <DynamicQuoteWall shortHash={campaign.shortHash} entry="chip" />
          <DynamicDiscussion
            campaignId={campaign.id}
            shortHash={campaign.shortHash}
            entry="chip"
          />
        </>
      )}

      <ArticleFeeds campaign={campaign} />
    </Layout.Main>
  )
}

export default CampaignDetail

import dynamic from 'next/dynamic'
import { useContext, useEffect } from 'react'

import { BREAKPOINTS } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  EmptyLayout,
  Head,
  HorizontalRule,
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
          {/* Option A: discussion sits on top of the right aside, participants
              below it (quote wall moved to the centre column as a band) */}
          {isMdUp && (
            <>
              <DynamicDiscussion
                campaignId={campaign.id}
                shortHash={campaign.shortHash}
              />
              {/* dashed rule to mark the seam between the two aside sections */}
              <HorizontalRule />
            </>
          )}
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

      {/* mobile: the aside is hidden, so the discussion shrinks to a one-line
          entry button under the header; tapping it opens the full dialog.
          (participants already show as an avatar row inside InfoHeader, so we
          don't repeat them here) */}
      {!isMdUp && (
        <DynamicDiscussion
          campaignId={campaign.id}
          shortHash={campaign.shortHash}
          entry="chip"
        />
      )}

      {/* Option A: the quote wall is a pull-quote band in the centre column,
          shown on every viewport, between the header and the article feed */}
      <DynamicQuoteWall shortHash={campaign.shortHash} entry="band" />

      <ArticleFeeds campaign={campaign} />
    </Layout.Main>
  )
}

export default CampaignDetail

// import {
//   useContext,
//  useEffect
// } from 'react'

// import { ERROR_CODES } from '~/common/enums'
import { toPath } from '~/common/utils'
import {
  // EmptyLayout,
  // EmptyTag,
  // Expandable,
  Head,
  Layout,
  // SpinnerBlock,
  // Throw404,
  // usePublicQuery,
  // useRoute,
  // ViewerContext,
} from '~/components'
// import { getErrorCodes, QueryError } from '~/components/GQL'
// import { CampaignFragmentFragment, CampaignPublicQuery } from '~/gql/graphql'
import { MOCK_CAMPAIGN } from '~/stories/mocks'

import ArticleFeeds from './ArticleFeeds'
import Description from './Description'
import InfoHeader from './InfoHeader'
import SideParticipants from './SideParticipants'

// import { CAMPAIGN_DETAIL_PRIVATE, CAMPAIGN_DETAIL_PUBLIC } from './gql'
// import styles from './styles.module.css'

const BaseCampaignDetail = ({
  campaign,
}: {
  campaign: typeof MOCK_CAMPAIGN
}) => {
  // const { router } = useRoute()
  // const viewer = useContext(ViewerContext)

  // feed type
  // const { getQuery } = useRoute()
  // const qsType = getQuery('type')
  // const [feedType, setFeedType] = useState(qsType)
  const path = toPath({ page: 'campaignDetail', campaign })

  const now = new Date()
  const isInApplicationPeriod =
    new Date(campaign.applicationPeriod.start) < now &&
    now < new Date(campaign.applicationPeriod.end)

  // const changeFeed = (newType: string) => {
  //   setQuery('type', newType)
  //   setFeedType(newType)
  // }

  // useEffect(() => {
  //   setFeedType(qsType)
  // }, [qsType])

  /**
   * Render
   */
  return (
    <Layout.Main aside={<SideParticipants campaign={campaign} />}>
      <Head
        title={campaign.name}
        path={path.href}
        description={campaign.description}
        image={campaign.cover}
      />

      <InfoHeader campaign={campaign} />

      {isInApplicationPeriod && (
        <Description description={campaign.description} />
      )}

      {!isInApplicationPeriod && <ArticleFeeds campaign={campaign} />}
    </Layout.Main>
  )
}

const CampaignDetail = () => {
  // const viewer = useContext(ViewerContext)
  // const { getQuery } = useRoute()
  // const shortHash = getQuery('shortHash')

  /**
   * Data Fetching
   */
  // public data
  // const { data, loading, error, client } = usePublicQuery<CampaignPublicQuery>(
  //   CAMPAIGN_DETAIL_PUBLIC,
  //   {
  //     variables: { shortHash },
  //   }
  // )

  // private data
  // const loadPrivate = (shortHash: string) => {
  //   if (!viewer.isAuthed || !shortHash) {
  //     return
  //   }

  //   client.query({
  //     query: CAMPAIGN_DETAIL_PRIVATE,
  //     fetchPolicy: 'network-only',
  //     variables: { shortHash },
  //   })
  // }

  // fetch private data
  // useEffect(() => {
  //   if (shortHash) {
  //     loadPrivate(shortHash)
  //   }
  // }, [shortHash])

  /**
   * Render
   */
  // if (loading) {
  //   return (
  //     <EmptyLayout>
  //       <SpinnerBlock />
  //     </EmptyLayout>
  //   )
  // }

  // if (error) {
  //   const errorCodes = getErrorCodes(error)

  //   if (errorCodes[0] === ERROR_CODES.ENTITY_NOT_FOUND) {
  //     return (
  //       <EmptyLayout>
  //         <Throw404 />
  //       </EmptyLayout>
  //     )
  //   }

  //   return (
  //     <EmptyLayout>
  //       <QueryError error={error} />
  //     </EmptyLayout>
  //   )
  // }

  return <BaseCampaignDetail campaign={MOCK_CAMPAIGN} />
}

export default CampaignDetail

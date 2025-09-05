import { useContext } from 'react'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import {
  Announcements,
  Head,
  LanguageContext,
  Layout,
  Spacer,
  useChannels,
  useRoute,
} from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = ({
  showRecommendation = true,
}: {
  showRecommendation?: boolean
} = {}) => {
  const { lang } = useContext(LanguageContext)
  const { isInPath, getQuery } = useRoute()
  const isInChannel = isInPath('CHANNEL')
  const shortHash = getQuery('shortHash')
  const { channels } = useChannels()
  const channel = channels?.find((channel) => channel.shortHash === shortHash)
  return (
    <Layout.Main
      aside={
        <>
          <Spacer size="sp16" />
          <Announcements />
          {showRecommendation && <Sidebar.Authors />}
          {showRecommendation && <Sidebar.Tags />}
          <Sidebar.Billboard />
          <Spacer size="sp32" />
        </>
      }
    >
      <Head
        image={IMAGE_INTRO.src}
        title={
          isInChannel &&
          (channel?.__typename === 'CurationChannel' ||
            channel?.__typename === 'TopicChannel')
            ? lang === 'zh_hans'
              ? channel.nameZhHans
              : lang === 'zh_hant'
                ? channel.nameZhHant
                : channel.nameEn
            : undefined
        }
      />

      <Feed showRecommendation={showRecommendation} />
    </Layout.Main>
  )
}

export default Home

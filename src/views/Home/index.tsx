import { useContext } from 'react'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import {
  Announcements,
  Head,
  Layout,
  Spacer,
  useRoute,
  ViewerContext,
} from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = ({
  showRecommendation = true,
}: {
  showRecommendation?: boolean
} = {}) => {
  const { isInPath } = useRoute()
  const viewer = useContext(ViewerContext)
  const isAuthed = viewer.isAuthed
  const isInNewest = isInPath('NEWEST')
  const isInChannel = isInPath('CHANNEL')
  const isInFeatured = isInPath('FEATURED') || (!isAuthed && isInPath('HOME'))
  const isInHottest = isInPath('HOTTEST')
  return (
    <Layout.Main
      aside={
        <>
          {(isInNewest || isInFeatured || isInHottest) && (
            <Spacer size="sp44" />
          )}
          {isInChannel && <Spacer size="sp16" />}
          <Announcements />
          {showRecommendation && <Sidebar.Authors />}
          {showRecommendation && <Sidebar.Tags />}
          <Sidebar.Billboard />
          <Spacer size="sp32" />
        </>
      }
    >
      <Head image={IMAGE_INTRO.src} />

      <Feed showRecommendation={showRecommendation} />
    </Layout.Main>
  )
}

export default Home

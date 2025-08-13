import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { Announcements, Head, Layout, Spacer } from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = ({
  showRecommendation = true,
}: {
  showRecommendation?: boolean
} = {}) => {
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
      <Head image={IMAGE_INTRO.src} />

      <Feed showRecommendation={showRecommendation} />
    </Layout.Main>
  )
}

export default Home

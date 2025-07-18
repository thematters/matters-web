import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { Announcements, Head, Layout, Spacer } from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <Layout.Main
      aside={
        <>
          <Spacer size="sp16" />
          <Announcements />
          <Sidebar.Authors />
          <Sidebar.Tags />
          <Sidebar.Billboard />
          <Spacer size="sp32" />
        </>
      }
    >
      <Head image={IMAGE_INTRO.src} />

      <Feed />
    </Layout.Main>
  )
}

export default Home

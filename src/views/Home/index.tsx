import { Billboard, Layout, Spacer } from '~/components'

import Announcements from './Announcements'
import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <Layout.Main
      aside={
        <>
          <Billboard tokenId={1} />
          <Sidebar.Tags />
          <Sidebar.Authors />
        </>
      }
    >
      <Layout.AuthHeader title="discover" />

      <Announcements />

      <Spacer size="xtight" />

      <Feed />
    </Layout.Main>
  )
}

export default Home

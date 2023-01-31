import dynamic from 'next/dynamic'

import { Layout, Spacer } from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'

const DynamicAnnouncements = dynamic(() => import('./Announcements'), {
  ssr: true, // enable for first screen
})

const Home = () => {
  return (
    <Layout.Main
      aside={
        <>
          <Sidebar.Tags />
          <Sidebar.Authors />
        </>
      }
    >
      <Layout.AuthHeader title="discover" />

      <DynamicAnnouncements />

      <Spacer size="xtight" />

      <Feed />
    </Layout.Main>
  )
}

export default Home

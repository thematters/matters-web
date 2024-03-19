import { FormattedMessage } from 'react-intl'

import { Billboard, Layout, Spacer } from '~/components'

import Announcements from './Announcements'
import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <Layout.Main
      aside={
        <>
          <Billboard />
          <Sidebar.Tags />
          <Sidebar.Authors />
        </>
      }
    >
      <Layout.AuthHeader
        title={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
      />

      <Announcements />

      <Spacer size="xtight" />

      <Feed />
    </Layout.Main>
  )
}

export default Home

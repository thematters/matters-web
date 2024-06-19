import { FormattedMessage } from 'react-intl'

import { Layout } from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <Layout.Main
      aside={
        <>
          <Sidebar.Billboard />
          <Sidebar.Authors />
          <Sidebar.Tags />
        </>
      }
    >
      <Layout.AuthHeader
        title={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
      />

      <Feed />
    </Layout.Main>
  )
}

export default Home

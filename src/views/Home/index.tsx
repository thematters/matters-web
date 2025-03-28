import { FormattedMessage } from 'react-intl'

import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { Head, Layout } from '~/components'

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
      <Head image={IMAGE_INTRO.src} />

      <Layout.AuthHeader
        title={<FormattedMessage defaultMessage="Discover" id="cE4Hfw" />}
      />

      <Feed />
    </Layout.Main>
  )
}

export default Home

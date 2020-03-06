import { Layout, useResponsive } from '~/components'

import Authors from './Authors'
import Feed from './Feed'
import Icymi from './Icymi'
import Tags from './Tags'
import Topics from './Topics'

const Home = () => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Layout
      rightSide={
        <>
          <Icymi />
          <Tags />
          <Topics />
          <Authors />
        </>
      }
    >
      {!isSmallUp && (
        <Layout.Header
          left={<Layout.Header.MeButton />}
          right={<Layout.Header.Title id="discover" />}
        />
      )}

      <Feed />
    </Layout>
  )
}

export default Home

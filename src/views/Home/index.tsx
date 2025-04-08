import IMAGE_INTRO from '@/public/static/images/intro.jpg'
import { Head, Layout } from '~/components'

import Feed from './Feed'
import Sidebar from './Sidebar'

const Home = () => {
  return (
    <Layout.Main
      aside={
        <>
          <Sidebar.Authors />
          <Sidebar.Tags />
          <Sidebar.Billboard />
        </>
      }
    >
      <Head image={IMAGE_INTRO.src} />
      <Feed />
    </Layout.Main>
  )
}

export default Home

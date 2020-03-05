import { Layout } from '~/components'

import Authors from './Authors'
import Feed from './Feed'
import Icymi from './Icymi'
import Tags from './Tags'
import Topics from './Topics'

export default () => (
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
    <Feed />
  </Layout>
)

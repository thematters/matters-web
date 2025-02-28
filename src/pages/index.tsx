import { useContext } from 'react'

import { Protected, useRoute, ViewerContext } from '~/components'
import Follow from '~/views/Follow'
import _Home from '~/views/Home'

const Home = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()

  const type = getQuery('type')

  if (viewer.isAuthed && !type) {
    return (
      <Protected>
        <Follow />
      </Protected>
    )
  }

  return <_Home />
}

export default Home

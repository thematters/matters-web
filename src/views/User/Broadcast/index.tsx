import {
  Layout,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  useRoute,
} from '~/components'

import BaseBroadcast from './Broadcast'
import { USER_BROADCAST } from './gql'

import { UserBroadcast } from './__generated__/UserBroadcast'

const Broadcast = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const { data, loading, error } = usePublicQuery<UserBroadcast>(
    USER_BROADCAST,
    { variables: { userName } }
  )
  const user = data?.user

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!user) {
    return <Throw404 />
  }

  const circles = user?.ownCircles

  if (!circles || circles.length === 0) {
    return <Throw404 />
  }

  const circle = circles[0]

  if (!circle) {
    return <Throw404 />
  }

  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <Layout.Header.Title
            zh_hant={`${user.displayName}的廣播間`}
            zh_hans={`${user.displayName}的广播间`}
            en={`${user.displayName}'s broadcast`}
          />
        }
      />

      <BaseBroadcast id={circle.id} />
    </Layout.Main>
  )
}

export default Broadcast

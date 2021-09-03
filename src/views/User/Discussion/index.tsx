import {
  Layout,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  useRoute,
} from '~/components'

import BaseDiscussion from './Discussion'
import { USER_DISCUSSION } from './gql'

import { UserDiscussion } from './__generated__/UserDiscussion'

const Discussion = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const { data, loading, error } = usePublicQuery<UserDiscussion>(
    USER_DISCUSSION,
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
            zh_hant={`${user.displayName}的眾聊室`}
            zh_hans={`${user.displayName}的众聊室`}
            en={`${user.displayName}'s discussion`}
          />
        }
      />

      <BaseDiscussion id={circle.id} />
    </Layout.Main>
  )
}

export default Discussion

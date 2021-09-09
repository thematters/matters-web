import { useState } from 'react'

import {
  Layout,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  useRoute,
  UserProfile,
} from '~/components'

import Articles from './Articles'
import CustomHead from './CustomHead'
import { USER_LANDING } from './gql'
import Topics from './Topics'
import UserTabs, { FeedType } from './UserTabs'

import {
  UserLanding as UserLandingType,
  UserLanding_user,
} from './__generated__/UserLanding'

const BaseUserLanding = ({ user }: { user: UserLanding_user }) => {
  const hasTopics = user.topics.totalCount > 0
  const [feed, setFeed] = useState<FeedType>(hasTopics ? 'topics' : 'articles')

  return (
    <Layout.Main>
      <CustomHead user={user} />

      <UserProfile />

      <UserTabs user={user} feed={feed} setFeed={setFeed} />

      {feed === 'topics' && <Topics />}
      {feed === 'articles' && <Articles />}
    </Layout.Main>
  )
}

const UserLanding = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const { data, loading, error } = usePublicQuery<UserLandingType>(
    USER_LANDING,
    { variables: { userName } }
  )
  const user = data?.user

  if (loading) {
    return (
      <Layout.Main>
        <Spinner />
      </Layout.Main>
    )
  }

  if (error) {
    return (
      <Layout.Main>
        <QueryError error={error} />
      </Layout.Main>
    )
  }

  if (!user || user?.status?.state === 'archived') {
    return <Throw404 />
  }

  return <BaseUserLanding user={user} />
}

export default UserLanding

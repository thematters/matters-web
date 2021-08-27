import {
  Layout,
  QueryError,
  Spinner,
  Throw404,
  usePublicQuery,
  useRoute,
} from '~/components'

import Followers from './Followers'
import Following from './Following'
import { USER_ABOUT_PUBLIC } from './gql'
import Profile from './Profile'

import { UserAboutUserPublic } from './__generated__/UserAboutUserPublic'

const BaseUserAbout = () => {
  const { getQuery } = useRoute()
  const userName = getQuery('name')

  const { data, loading, error } = usePublicQuery<UserAboutUserPublic>(
    USER_ABOUT_PUBLIC,
    { variables: { userName } }
  )

  const user = data?.user
  const isUserArchived = user?.status?.state === 'archived'
  const isUserBanned = user?.status?.state === 'banned'
  const isUserInactive = isUserArchived || isUserBanned

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
  }

  if (!user || isUserInactive) {
    return <Throw404 />
  }

  return (
    <>
      <Profile user={user} />
      <Followers user={user} />
      <Following user={user} />
    </>
  )
}

const UserAbout = () => {
  return (
    <Layout.Main>
      <Layout.Header
        left={<Layout.Header.BackButton />}
        right={
          <Layout.Header.Title
            zh_hant="關於我"
            zh_hans="关于我"
            en="About Me"
          />
        }
      />

      <BaseUserAbout />
    </Layout.Main>
  )
}

export default UserAbout

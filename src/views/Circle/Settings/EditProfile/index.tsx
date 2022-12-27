import { useContext } from 'react'

import {
  CreateCircleForm,
  EmptyLayout,
  Head,
  Layout,
  Spinner,
  Throw404,
  usePublicQuery,
  useRoute,
  ViewerContext,
} from '~/components'

import { CIRCLE_BASIC_PROFILE } from './gql'

import { CircleBasicProfile } from './__generated__/CircleBasicProfile'

const EditProfile = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const { data, loading } = usePublicQuery<CircleBasicProfile>(
    CIRCLE_BASIC_PROFILE,
    {
      variables: { name },
    }
  )
  const circle = data?.circle
  const isOwner = circle?.owner.id === viewer.id

  if (loading) {
    return (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    )
  }

  if (!circle || !isOwner) {
    return (
      <EmptyLayout>
        <Throw404 />
      </EmptyLayout>
    )
  }

  return (
    <Layout.Main smBgColor="grey-lighter">
      <Head title={{ id: 'basicProfile' }} />

      <CreateCircleForm.Profile circle={circle} type="edit" purpose="page" />
    </Layout.Main>
  )
}

export default EditProfile

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
import { CircleBasicProfileQuery } from '~/gql/graphql'

import { CIRCLE_BASIC_PROFILE } from './gql'

const EditProfile = () => {
  const viewer = useContext(ViewerContext)
  const { getQuery } = useRoute()
  const name = getQuery('name')

  const { data, loading } = usePublicQuery<CircleBasicProfileQuery>(
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
    <Layout.Main>
      <Head title={{ id: 'basicProfile' }} />

      <CreateCircleForm.Profile circle={circle} type="edit" purpose="page" />
    </Layout.Main>
  )
}

export default EditProfile

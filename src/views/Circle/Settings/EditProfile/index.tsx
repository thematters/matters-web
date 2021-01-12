import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  CreateCircleForm,
  EmptyLayout,
  Head,
  Layout,
  Spinner,
  Throw404,
  usePublicQuery,
  ViewerContext,
} from '~/components'

import { getQuery } from '~/common/utils'

import { CIRCLE_BASIC_PROFILE } from './gql'

import { CircleBasicProfile } from './__generated__/CircleBasicProfile'

const EditProfile = () => {
  const viewer = useContext(ViewerContext)
  const router = useRouter()
  const name = getQuery({ router, key: 'name' })

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
    <Layout.Main bgColor="grey-lighter">
      <Head title={{ id: 'basicProfile' }} />

      <CreateCircleForm.Profile circle={circle} type="edit" purpose="page" />
    </Layout.Main>
  )
}

export default EditProfile

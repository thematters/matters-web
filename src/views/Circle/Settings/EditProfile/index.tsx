import { useRouter } from 'next/router'
import { useContext } from 'react'

import {
  CreateCircleForm,
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
      <Layout.Main bgColor="grey-lighter">
        <Spinner />
      </Layout.Main>
    )
  }

  if (!circle || !isOwner) {
    return (
      <Layout.Main>
        <Throw404 />
      </Layout.Main>
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

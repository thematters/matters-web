import { useEffect } from 'react'

import {
  Layout,
  QueryError,
  Spinner,
  usePublicQuery,
  useRoute,
} from '~/components'

import { toPath } from '~/common/utils'

import { CIRCLE_LANDING } from './gql'

import { CircleLanding as CircleLandingType } from './__generated__/CircleLanding'

const CircleLanding = () => {
  const { getQuery, router } = useRoute()
  const circleName = getQuery('name')

  const { data, loading, error } = usePublicQuery<CircleLandingType>(
    CIRCLE_LANDING,
    { variables: { name: circleName } }
  )
  const circle = data?.circle

  // redirect to user profile page
  useEffect(() => {
    if (!circle?.id || !circle.owner.userName) {
      return
    }

    const userPath = toPath({
      page: 'userProfile',
      userName: circle.owner.userName,
    })
    router.replace(userPath.href)
  }, [circle?.id])

  return (
    <Layout.Main bgColor="grey-lighter">
      {loading && <Spinner />}
      {error && <QueryError error={error} />}
    </Layout.Main>
  )
}

export default CircleLanding

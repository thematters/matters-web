import dynamic from 'next/dynamic'

import { EmptyLayout, Spinner, Throw404, useRoute } from '~/components'

const DynamicUserFollowers = dynamic(() => import('~/views/User/Followers'), {
  ssr: true,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const DynamicCircleFollowers = dynamic(
  () => import('~/views/Circle/Followers'),
  {
    ssr: true,
    loading: () => (
      <EmptyLayout>
        <Spinner />
      </EmptyLayout>
    ),
  }
)

const Followers = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/@', true)) {
    return <DynamicUserFollowers />
  } else if (isPathStartWith('/~', true)) {
    return <DynamicCircleFollowers />
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default Followers

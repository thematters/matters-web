import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { EmptyLayout, Spinner, Throw404 } from '~/components'

import { getNameType } from '~/common/utils'

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
  const router = useRouter()
  const nameType = getNameType({ router })

  switch (nameType) {
    case 'circle': {
      return <DynamicCircleFollowers />
    }
    case 'user': {
      return <DynamicUserFollowers />
    }
    default: {
      return (
        <EmptyLayout>
          <Throw404 />
        </EmptyLayout>
      )
    }
  }
}

export default Followers

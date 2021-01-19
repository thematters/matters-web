import { useRouter } from 'next/router'
import CircleFollowers from '~/views/Circle/Followers'
import UserFollowers from '~/views/User/Followers'

import { EmptyLayout, Throw404 } from '~/components'

import { getNameType } from '~/common/utils'

const Followers = () => {
  const router = useRouter()
  const nameType = getNameType({ router })

  switch (nameType) {
    case 'circle': {
      return <CircleFollowers />
    }
    case 'user': {
      return <UserFollowers />
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

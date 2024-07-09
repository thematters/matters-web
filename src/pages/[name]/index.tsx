import { EmptyLayout, Throw404, useRoute } from '~/components'
import CircleWorks from '~/views/Circle/Works'
import UserWritings from '~/views/User/Writings'

const NameIndex = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/@', true)) {
    return <UserWritings />
  } else if (isPathStartWith('/~', true)) {
    return <CircleWorks />
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameIndex

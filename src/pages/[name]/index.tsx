import { EmptyLayout, Throw404, useRoute } from '~/components'
import CircleWorks from '~/views/Circle/Works'
import UserArticles from '~/views/User/Articles'

const NameIndex = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/@', true)) {
    return <UserArticles />
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

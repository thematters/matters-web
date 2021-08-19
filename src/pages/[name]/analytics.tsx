import CircleAnalytics from '~/views/Circle/Analytics'

import { EmptyLayout, Protected, Throw404, useRoute } from '~/components'

const NameCircleAnalytics = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/~', true)) {
    return (
      <Protected>
        <CircleAnalytics />
      </Protected>
    )
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameCircleAnalytics

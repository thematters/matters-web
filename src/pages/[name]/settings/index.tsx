import CircleSettings from '~/views/Circle/Settings'

import { EmptyLayout, Protected, Throw404, useRoute } from '~/components'

const NameSettings = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/~', true)) {
    return (
      <Protected>
        <CircleSettings />
      </Protected>
    )
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameSettings

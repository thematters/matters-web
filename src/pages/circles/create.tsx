import CreateCircle from '~/views/CreateCircle'

import { Protected } from '~/components'

const ProtectedCreateCircle = () => (
  <Protected>
    <CreateCircle />
  </Protected>
)

export default ProtectedCreateCircle

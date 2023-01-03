import { Protected } from '~/components'
import CreateCircle from '~/views/CreateCircle'

const ProtectedCreateCircle = () => (
  <Protected>
    <CreateCircle />
  </Protected>
)

export default ProtectedCreateCircle

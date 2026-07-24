import { Protected } from '~/components'
import Fediverse from '~/views/Me/Fediverse'

const ProtectedFediverse = () => (
  <Protected>
    <Fediverse />
  </Protected>
)

export default ProtectedFediverse

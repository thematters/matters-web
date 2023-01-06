import { Protected } from '~/components'
import MeLikesSent from '~/views/Me/LikesSent'

const ProtectedMeLikesSent = () => (
  <Protected>
    <MeLikesSent />
  </Protected>
)

export default ProtectedMeLikesSent

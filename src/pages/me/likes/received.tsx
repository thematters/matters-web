import { Protected } from '~/components'
import MeLikesReceived from '~/views/Me/LikesReceived'

const ProtectedMeLikesReceived = () => (
  <Protected>
    <MeLikesReceived />
  </Protected>
)

export default ProtectedMeLikesReceived

import { Protected } from '~/components'
import MeHistoryLikesReceived from '~/views/Me/History/LikesReceived'

const ProtectedMeHistoryLikesReceived = () => (
  <Protected>
    <MeHistoryLikesReceived />
  </Protected>
)

export default ProtectedMeHistoryLikesReceived

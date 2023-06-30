import { Protected } from '~/components'
import MeHistoryLikesSent from '~/views/Me/History/LikesSent'

const ProtectedMeHistoryLikesSent = () => (
  <Protected>
    <MeHistoryLikesSent />
  </Protected>
)

export default ProtectedMeHistoryLikesSent

import { Protected } from '~/components'
import MeHistoryComments from '~/views/Me/History/Comments'

const ProtectedMeHistoryComments = () => (
  <Protected>
    <MeHistoryComments />
  </Protected>
)

export default ProtectedMeHistoryComments

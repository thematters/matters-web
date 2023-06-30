import { Protected } from '~/components'
import MeHistory from '~/views/Me/History'

const ProtectedMeHistory = () => (
  <Protected>
    <MeHistory />
  </Protected>
)

export default ProtectedMeHistory

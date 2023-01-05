import { Protected } from '~/components'
import MeAppreciationsSent from '~/views/Me/AppreciationsSent'

const ProtectedMeAppreciationsSent = () => (
  <Protected>
    <MeAppreciationsSent />
  </Protected>
)

export default ProtectedMeAppreciationsSent

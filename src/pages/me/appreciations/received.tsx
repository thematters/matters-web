import { Protected } from '~/components'
import MeAppreciationsReceived from '~/views/Me/AppreciationsReceived'

const ProtectedMeAppreciationsReceived = () => (
  <Protected>
    <MeAppreciationsReceived />
  </Protected>
)

export default ProtectedMeAppreciationsReceived

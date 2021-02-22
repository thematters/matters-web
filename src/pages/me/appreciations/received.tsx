import MeAppreciationsReceived from '~/views/Me/AppreciationsReceived'

import { Protected } from '~/components'

const ProtectedMeAppreciationsReceived = () => (
  <Protected>
    <MeAppreciationsReceived />
  </Protected>
)

export default ProtectedMeAppreciationsReceived

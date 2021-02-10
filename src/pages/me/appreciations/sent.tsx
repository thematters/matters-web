import MeAppreciationsSent from '~/views/Me/AppreciationsSent'

import { Protected } from '~/components'

const ProtectedMeAppreciationsSent = () => (
  <Protected>
    <MeAppreciationsSent />
  </Protected>
)

export default ProtectedMeAppreciationsSent

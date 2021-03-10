import MeHistory from '~/views/Me/History'

import { Protected } from '~/components'

const ProtectedMeHistory = () => (
  <Protected>
    <MeHistory />
  </Protected>
)

export default ProtectedMeHistory

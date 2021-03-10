import MeSettings from '~/views/Me/Settings/Settings'

import { Protected } from '~/components'

const ProtectedMeSettings = () => (
  <Protected>
    <MeSettings />
  </Protected>
)

export default ProtectedMeSettings

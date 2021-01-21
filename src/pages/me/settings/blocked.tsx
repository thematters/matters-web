import MeSettingsBlocked from '~/views/Me/Settings/Blocked'

import { Protected } from '~/components'

const ProtectedMeSettingsBlocked = () => (
  <Protected>
    <MeSettingsBlocked />
  </Protected>
)

export default ProtectedMeSettingsBlocked

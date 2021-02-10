import MeSettingsChangePassword from '~/views/Me/Settings/ChangePassword'

import { Protected } from '~/components'

const ProtectedMeSettingsChangePassword = () => (
  <Protected>
    <MeSettingsChangePassword />
  </Protected>
)

export default ProtectedMeSettingsChangePassword

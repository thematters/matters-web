import { Protected } from '~/components'
import MeSettingsChangePassword from '~/views/Me/Settings/ChangePassword'

const ProtectedMeSettingsChangePassword = () => (
  <Protected>
    <MeSettingsChangePassword />
  </Protected>
)

export default ProtectedMeSettingsChangePassword

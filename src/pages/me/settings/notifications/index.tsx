import { Protected } from '~/components'
import MeSettingsNotifications from '~/views/Me/Settings/Notifications'

const ProtectedMeSettingsNotifications = () => (
  <Protected>
    <MeSettingsNotifications />
  </Protected>
)

export default ProtectedMeSettingsNotifications

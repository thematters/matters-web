import { Protected } from '~/components'
import NotificationGeneralSettings from '~/views/Me/Settings/Notification/General'

const ProtectedMeSettingsNotification = () => (
  <Protected>
    <NotificationGeneralSettings />
  </Protected>
)

export default ProtectedMeSettingsNotification

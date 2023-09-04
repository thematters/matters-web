import { Protected } from '~/components'
import NotificationsCircleSettings from '~/views/Me/Settings/Notifications/CircleSettings'

const ProtectedMeSettingsNotifications = () => (
  <Protected>
    <NotificationsCircleSettings />
  </Protected>
)

export default ProtectedMeSettingsNotifications

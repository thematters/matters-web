import { Protected } from '~/components'
import NotificationCircleSettings from '~/views/Me/Settings/Notification/Circle'

const ProtectedMeSettingsNotification = () => (
  <Protected>
    <NotificationCircleSettings />
  </Protected>
)

export default ProtectedMeSettingsNotification

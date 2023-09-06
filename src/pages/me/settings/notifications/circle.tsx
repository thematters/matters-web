import { Protected } from '~/components'
import MeSettingsNotificationsCircle from '~/views/Me/Settings/Notifications/CircleSettings'

const ProtectedMeSettingsNotificationsCircle = () => (
  <Protected>
    <MeSettingsNotificationsCircle />
  </Protected>
)

export default ProtectedMeSettingsNotificationsCircle

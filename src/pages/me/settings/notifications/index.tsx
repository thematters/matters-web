import { Protected } from '~/components'
import MeSettingsNotification from '~/views/Me/Settings/Notification'

const ProtectedMeSettingsNotification = () => (
  <Protected>
    <MeSettingsNotification />
  </Protected>
)

export default ProtectedMeSettingsNotification

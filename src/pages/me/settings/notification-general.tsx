import NotificationGeneralSettings from '~/views/Me/Settings/Notification/General'

import { Protected } from '~/components'

const ProtectedMeSettingsNotification = () => (
  <Protected>
    <NotificationGeneralSettings />
  </Protected>
)

export default ProtectedMeSettingsNotification

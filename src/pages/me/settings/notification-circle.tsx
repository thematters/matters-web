import NotificationCircleSettings from '~/views/Me/Settings/Notification/Circle'

import { Protected } from '~/components'

const ProtectedMeSettingsNotification = () => (
  <Protected>
    <NotificationCircleSettings />
  </Protected>
)

export default ProtectedMeSettingsNotification

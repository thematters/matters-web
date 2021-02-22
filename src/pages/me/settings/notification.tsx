import MeSettingsNotification from '~/views/Me/Settings/Notification'

import { Protected } from '~/components'

const ProtectedMeSettingsNotification = () => (
  <Protected>
    <MeSettingsNotification />
  </Protected>
)

export default ProtectedMeSettingsNotification

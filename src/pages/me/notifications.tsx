import MeNotifications from '~/views/Me/Notifications'

import { Protected } from '~/components'

const ProtectedMeNotifications = () => (
  <Protected>
    <MeNotifications />
  </Protected>
)

export default ProtectedMeNotifications

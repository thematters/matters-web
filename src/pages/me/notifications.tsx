import { Protected } from '~/components'
import MeNotifications from '~/views/Me/Notifications'

const ProtectedMeNotifications = () => (
  <Protected>
    <MeNotifications />
  </Protected>
)

export default ProtectedMeNotifications

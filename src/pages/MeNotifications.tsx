import MeNotifications from '~/views/Me/Notifications'

import { Protected } from '~/components/Protected'

export default () => (
  <Protected>
    <MeNotifications />
  </Protected>
)

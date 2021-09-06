import MeSubscriptions from '~/views/Me/Subscriptions'

import { Protected } from '~/components'

const ProtectedMeSubscriptions = () => (
  <Protected>
    <MeSubscriptions />
  </Protected>
)

export default ProtectedMeSubscriptions

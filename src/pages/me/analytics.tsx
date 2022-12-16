import MyAnalytics from '~/views/Me/Analytics'

import { Protected } from '~/components'

const ProtectedMyAnalytics = () => (
  <Protected>
    <MyAnalytics />
  </Protected>
)

export default ProtectedMyAnalytics

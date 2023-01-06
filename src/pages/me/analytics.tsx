import { Protected } from '~/components'
import MyAnalytics from '~/views/Me/Analytics'

const ProtectedMyAnalytics = () => (
  <Protected>
    <MyAnalytics />
  </Protected>
)

export default ProtectedMyAnalytics

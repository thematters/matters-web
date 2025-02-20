import { Protected } from '~/components'
import Follow from '~/views/Follow'

const ProtectedFollow = () => (
  <Protected>
    <Follow />
  </Protected>
)

export default ProtectedFollow

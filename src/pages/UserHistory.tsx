import UserHistory from '~/views/User/History'

import { Protected } from '~/components'

export default () => (
  <Protected>
    <UserHistory />
  </Protected>
)

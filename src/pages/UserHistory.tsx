import UserHistory from '~/views/User/History'

import { Protected } from '~/components/Protected'

export default () => (
  <Protected>
    <UserHistory />
  </Protected>
)

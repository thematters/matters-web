import UserDrafts from '~/views/User/Drafts'

import { Protected } from '~/components'

export default () => (
  <Protected>
    <UserDrafts />
  </Protected>
)

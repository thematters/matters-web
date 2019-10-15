import UserDrafts from '~/views/User/Drafts'

import { Protected } from '~/components/Protected'

export default () => (
  <Protected>
    <UserDrafts />
  </Protected>
)

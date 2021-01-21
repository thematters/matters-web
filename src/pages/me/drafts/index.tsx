import MeDrafts from '~/views/Me/Drafts'

import { Protected } from '~/components'

const ProtectedMeDrafts = () => (
  <Protected>
    <MeDrafts />
  </Protected>
)

export default ProtectedMeDrafts

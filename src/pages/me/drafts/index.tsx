import { Protected } from '~/components'
import MeDrafts from '~/views/Me/Drafts'

const ProtectedMeDrafts = () => (
  <Protected>
    <MeDrafts />
  </Protected>
)

export default ProtectedMeDrafts

import { Protected } from '~/components'
import MeDraftDetail from '~/views/Me/DraftDetail'

const ProtectedMeDraftDetail = () => (
  <Protected>
    <MeDraftDetail />
  </Protected>
)

export default ProtectedMeDraftDetail

import MeDraftDetail from '~/views/Me/DraftDetail'

import { Protected } from '~/components'

const ProtectedMeDraftDetail = () => (
  <Protected>
    <MeDraftDetail />
  </Protected>
)

export default ProtectedMeDraftDetail

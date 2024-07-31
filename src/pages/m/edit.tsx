import { Protected } from '~/components'
import MomentDetailEdit from '~/views/MomentDetail/Edit'

const ProtectedMomentDetailEdit = () => (
  <Protected>
    <MomentDetailEdit />
  </Protected>
)

export default ProtectedMomentDetailEdit

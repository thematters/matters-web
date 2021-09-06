import MeComments from '~/views/Me/Comments'

import { Protected } from '~/components'

const ProtectedMeComments = () => (
  <Protected>
    <MeComments />
  </Protected>
)

export default ProtectedMeComments

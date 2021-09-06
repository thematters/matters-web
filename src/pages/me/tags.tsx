import MeTags from '~/views/Me/Tags'

import { Protected } from '~/components'

const ProtectedMeTags = () => (
  <Protected>
    <MeTags />
  </Protected>
)

export default ProtectedMeTags

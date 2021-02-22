import OAuthAuthorize from '~/views/OAuth/Authorize'

import { Protected } from '~/components'

const ProtectedOAuthAuthorize = () => (
  <Protected>
    <OAuthAuthorize />
  </Protected>
)

export default ProtectedOAuthAuthorize

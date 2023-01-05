import { Protected } from '~/components'
import OAuthAuthorize from '~/views/OAuth/Authorize'

const ProtectedOAuthAuthorize = () => (
  <Protected>
    <OAuthAuthorize />
  </Protected>
)

export default ProtectedOAuthAuthorize

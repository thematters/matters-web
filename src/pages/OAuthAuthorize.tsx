import OAuthAuthorize from '~/views/OAuth/Authorize'

import { Protected } from '~/components/Protected'

export default () => (
  <Protected>
    <OAuthAuthorize />
  </Protected>
)

import OAuthAuthorize from '~/views/OAuth/Authorize';

import { Protected } from '~/components';

export default () => (
  <Protected>
    <OAuthAuthorize />
  </Protected>
);

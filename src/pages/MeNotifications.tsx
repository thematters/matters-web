import MeNotifications from '~/views/Me/Notifications';

import { Protected } from '~/components';

export default () => (
  <Protected>
    <MeNotifications />
  </Protected>
);

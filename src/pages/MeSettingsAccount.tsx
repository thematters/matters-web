import MeSettingsAccount from '~/views/Me/Settings/Account'

import { Protected } from '~/components/Protected'

export default () => (
  <Protected>
    <MeSettingsAccount />
  </Protected>
)

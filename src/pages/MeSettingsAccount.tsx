import MeSettingsAccount from '~/views/Me/Settings/Account'

import { Protected } from '~/components'

export default () => (
  <Protected>
    <MeSettingsAccount />
  </Protected>
)

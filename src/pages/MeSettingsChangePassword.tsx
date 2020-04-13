import MeSettingsChangePassword from '~/views/Me/Settings/ChangePassword'

import { Protected } from '~/components'

export default () => (
  <Protected>
    <MeSettingsChangePassword />
  </Protected>
)

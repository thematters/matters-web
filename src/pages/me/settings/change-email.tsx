import MeSettingsChangeEmail from '~/views/Me/Settings/ChangeEmail'

import { Protected } from '~/components'

const ProtectedMeSettingsChangeEmail = () => (
  <Protected>
    <MeSettingsChangeEmail />
  </Protected>
)

export default ProtectedMeSettingsChangeEmail

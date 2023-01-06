import { Protected } from '~/components'
import MeSettingsChangeEmail from '~/views/Me/Settings/ChangeEmail'

const ProtectedMeSettingsChangeEmail = () => (
  <Protected>
    <MeSettingsChangeEmail />
  </Protected>
)

export default ProtectedMeSettingsChangeEmail

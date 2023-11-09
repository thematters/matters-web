import { Protected } from '~/components'
import MeSettingsAccount from '~/views/Me/Settings/Account'

const ProtectedMeSettings = () => (
  <Protected>
    <MeSettingsAccount />
  </Protected>
)

export default ProtectedMeSettings

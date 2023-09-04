import { Protected } from '~/components'
import MeSettingsAccount from '~/views/Me/Settings/Account'

const ProtectedMeSettingsAccount = () => (
  <Protected>
    <MeSettingsAccount />
  </Protected>
)

export default ProtectedMeSettingsAccount

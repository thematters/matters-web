import { Protected } from '~/components'
import MeSettingsBlocked from '~/views/Me/Settings/Blocked'

const ProtectedMeSettingsBlocked = () => (
  <Protected>
    <MeSettingsBlocked />
  </Protected>
)

export default ProtectedMeSettingsBlocked

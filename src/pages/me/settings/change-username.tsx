import { Protected } from '~/components'
import MeSettingsChangeUserName from '~/views/Me/Settings/ChangeUserName'

const ProtectedMeSettingsChangeUserName = () => (
  <Protected>
    <MeSettingsChangeUserName />
  </Protected>
)

export default ProtectedMeSettingsChangeUserName

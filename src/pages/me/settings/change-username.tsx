import MeSettingsChangeUserName from '~/views/Me/Settings/ChangeUserName'

import { Protected } from '~/components'

const ProtectedMeSettingsChangeUserName = () => (
  <Protected>
    <MeSettingsChangeUserName />
  </Protected>
)

export default ProtectedMeSettingsChangeUserName

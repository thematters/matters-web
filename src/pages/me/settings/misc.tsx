import { Protected } from '~/components'
import MeSettingsMisc from '~/views/Me/Settings/Misc'

const ProtectedMeSettingsMisc = () => (
  <Protected>
    <MeSettingsMisc />
  </Protected>
)

export default ProtectedMeSettingsMisc

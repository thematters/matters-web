import { Protected } from '~/components'
import MeSettings from '~/views/Me/Settings/Settings'

const ProtectedMeSettings = () => (
  <Protected>
    <MeSettings />
  </Protected>
)

export default ProtectedMeSettings

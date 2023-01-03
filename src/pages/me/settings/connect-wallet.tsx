import { Protected } from '~/components'
import MeSettingsConnectWallet from '~/views/Me/Settings/ConnectWallet'

const ProtectedMeSettingsConnectWallet = () => (
  <Protected>
    <MeSettingsConnectWallet />
  </Protected>
)

export default ProtectedMeSettingsConnectWallet

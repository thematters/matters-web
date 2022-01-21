import MeSettingsConnectWallet from '~/views/Me/Settings/ConnectWallet'

import { Protected } from '~/components'

const ProtectedMeSettingsConnectWallet = () => (
  <Protected>
    <MeSettingsConnectWallet />
  </Protected>
)

export default ProtectedMeSettingsConnectWallet

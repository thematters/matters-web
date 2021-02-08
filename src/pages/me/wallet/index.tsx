import MeWallet from '~/views/Me/Wallet'

import { Protected } from '~/components'

const ProtectedMeWallet = () => (
  <Protected>
    <MeWallet />
  </Protected>
)

export default ProtectedMeWallet

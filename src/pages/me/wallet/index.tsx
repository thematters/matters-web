import { Protected } from '~/components'
import MeWallet from '~/views/Me/Wallet'

const ProtectedMeWallet = () => (
  <Protected>
    <MeWallet />
  </Protected>
)

export default ProtectedMeWallet

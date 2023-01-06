import { Protected } from '~/components'
import MeTransactions from '~/views/Me/Transactions'

const ProtectedMeTransactions = () => (
  <Protected>
    <MeTransactions />
  </Protected>
)

export default ProtectedMeTransactions

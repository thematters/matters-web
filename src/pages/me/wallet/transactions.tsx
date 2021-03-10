import MeTransactions from '~/views/Me/Transactions'

import { Protected } from '~/components'

const ProtectedMeTransactions = () => (
  <Protected>
    <MeTransactions />
  </Protected>
)

export default ProtectedMeTransactions

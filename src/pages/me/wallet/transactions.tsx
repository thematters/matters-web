import MeTransactions from '~/views/Me/Transactions'

import { Protected } from '~/components'

export default () => (
  <Protected>
    <MeTransactions />
  </Protected>
)

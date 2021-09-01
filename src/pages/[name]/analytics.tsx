import UserAnalytics from '~/views/User/Analytics'

import { Protected } from '~/components'

const NameUserAnalytics = () => {
  return (
    <Protected>
      <UserAnalytics />
    </Protected>
  )
}

export default NameUserAnalytics

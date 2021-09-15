import UserEditTopics from '~/views/User/EditTopics'

import { Protected } from '~/components'

const NameUserEditTopics = () => {
  return (
    <Protected>
      <UserEditTopics />
    </Protected>
  )
}

export default NameUserEditTopics

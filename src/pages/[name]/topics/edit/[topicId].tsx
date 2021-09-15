import UserEditTopicsTopic from '~/views/User/EditTopics/Topic'

import { Protected } from '~/components'

const NameUserEditTopicsTopic = () => {
  return (
    <Protected>
      <UserEditTopicsTopic />
    </Protected>
  )
}

export default NameUserEditTopicsTopic

import UserEditTopicsChapter from '~/views/User/EditTopics/EditChapter'

import { Protected } from '~/components'

const NameUserEditTopicsChapter = () => {
  return (
    <Protected>
      <UserEditTopicsChapter />
    </Protected>
  )
}

export default NameUserEditTopicsChapter

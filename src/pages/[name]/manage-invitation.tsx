import UserManageCircleInvitation from '~/views/User/ManageCircleInvitation'

import { Protected } from '~/components'

const NameSettingsManageCircleInvitation = () => {
  return (
    <Protected>
      <UserManageCircleInvitation />
    </Protected>
  )
}

export default NameSettingsManageCircleInvitation

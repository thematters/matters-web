import CircleSettingsManageInvitation from '~/views/Circle/Settings/ManageInvitation'

import { EmptyLayout, Protected, Throw404, useRoute } from '~/components'

const NameSettingsManageInvitation = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/~', true)) {
    return (
      <Protected>
        <CircleSettingsManageInvitation />
      </Protected>
    )
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameSettingsManageInvitation

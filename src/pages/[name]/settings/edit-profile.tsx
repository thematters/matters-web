import { EmptyLayout, Protected, Throw404, useRoute } from '~/components'
import CircleSettingsEditProfile from '~/views/Circle/Settings/EditProfile'

const NameSettingsEditProfile = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/~', true)) {
    return (
      <Protected>
        <CircleSettingsEditProfile />
      </Protected>
    )
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameSettingsEditProfile

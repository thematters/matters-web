import { useRouter } from 'next/router'
import CircleSettingsEditProfile from '~/views/Circle/Settings/EditProfile'

import { EmptyLayout, Protected, Throw404 } from '~/components'

import { getNameType } from '~/common/utils'

const NameSettingsEditProfile = () => {
  const router = useRouter()
  const nameType = getNameType({ router })

  if (nameType === 'circle') {
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

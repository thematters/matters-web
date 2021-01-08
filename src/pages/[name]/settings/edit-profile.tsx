import { useRouter } from 'next/router'
import CircleSettingsEditProfile from '~/views/Circle/Settings/EditProfile'

import { Layout, Protected, Throw404 } from '~/components'

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
    <Layout.Main>
      <Throw404 />
    </Layout.Main>
  )
}

export default NameSettingsEditProfile

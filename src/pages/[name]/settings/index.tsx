import { useRouter } from 'next/router'
import CircleSettings from '~/views/Circle/Settings'

import { EmptyLayout, Protected, Throw404 } from '~/components'

import { getNameType } from '~/common/utils'

const NameSettings = () => {
  const router = useRouter()
  const nameType = getNameType({ router })

  if (nameType === 'circle') {
    return (
      <Protected>
        <CircleSettings />
      </Protected>
    )
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameSettings

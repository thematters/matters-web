import { useRouter } from 'next/router'
import CircleSettings from '~/views/Circle/Settings'

import { Protected } from '~/components'

import { getNameType } from '~/common/utils'

const NameIndex = () => {
  const router = useRouter()
  const nameType = getNameType({ router })

  if (nameType === 'circle') {
    return (
      <Protected>
        <CircleSettings />
      </Protected>
    )
  }

  return null
}

export default NameIndex

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Spinner } from '~/components'

import { getNameType } from '~/common/utils'

const DynamicUserArticles = dynamic(() => import('~/views/User/Articles'), {
  ssr: true,
  loading: Spinner,
})

const NameIndex = () => {
  const router = useRouter()
  const nameType = getNameType({ router })

  if (nameType === 'user') {
    return <DynamicUserArticles />
  } else if (nameType === 'circle') {
    // TODO
    return <h1>Circle</h1>
  }

  return null
}

export default NameIndex

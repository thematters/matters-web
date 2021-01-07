import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Spinner, Throw404 } from '~/components'

import { getNameType } from '~/common/utils'

const DynamicUserArticles = dynamic(() => import('~/views/User/Articles'), {
  ssr: true,
  loading: Spinner,
})

const DynamicCircleDetail = dynamic(() => import('~/views/Circle/Detail'), {
  ssr: true,
  loading: Spinner,
})

const NameIndex = () => {
  const router = useRouter()
  const nameType = getNameType({ router })

  if (nameType === 'user') {
    return <DynamicUserArticles />
  } else if (nameType === 'circle') {
    return <DynamicCircleDetail />
  }

  return <Throw404 />
}

export default NameIndex

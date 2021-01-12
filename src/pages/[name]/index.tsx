import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { EmptyLayout, Spinner, Throw404 } from '~/components'

import { getNameType } from '~/common/utils'

const DynamicUserArticles = dynamic(() => import('~/views/User/Articles'), {
  ssr: true,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const DynamicCircleDetail = dynamic(() => import('~/views/Circle/Detail'), {
  ssr: true,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const NameIndex = () => {
  const router = useRouter()
  const nameType = getNameType({ router })

  if (nameType === 'user') {
    return <DynamicUserArticles />
  } else if (nameType === 'circle') {
    return <DynamicCircleDetail />
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameIndex

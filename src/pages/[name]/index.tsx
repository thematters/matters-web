import dynamic from 'next/dynamic'

import { EmptyLayout, Spinner, Throw404, useRoute } from '~/components'

const DynamicUserArticles = dynamic(() => import('~/views/User/Articles'), {
  ssr: true,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const DynamicCircleWorks = dynamic(() => import('~/views/Circle/Works'), {
  ssr: true,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const NameIndex = () => {
  const { isPathStartWith } = useRoute()

  if (isPathStartWith('/@', true)) {
    return <DynamicUserArticles />
  } else if (isPathStartWith('/~', true)) {
    return <DynamicCircleWorks />
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameIndex

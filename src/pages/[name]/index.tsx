import dynamic from 'next/dynamic'

import { EmptyLayout, Spinner, Throw404, useRoute } from '~/components'

const DynamicUserLanding = dynamic(() => import('~/views/User/Landing'), {
  ssr: true,
  loading: () => (
    <EmptyLayout>
      <Spinner />
    </EmptyLayout>
  ),
})

const DynamicCircleLanding = dynamic(() => import('~/views/Circle/Landing'), {
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
    return <DynamicUserLanding />
  } else if (isPathStartWith('/~', true)) {
    return <DynamicCircleLanding />
  }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameIndex

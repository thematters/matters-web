import { EmptyLayout, Throw404 } from '~/components'
// import { Protected, useRoute } from '~/components'
// import CircleSettings from '~/views/Circle/Settings'

const NameSettings = () => {
  // const { isPathStartWith } = useRoute()
  //
  // if (isPathStartWith('/~', true)) {
  //   return (
  //     <Protected>
  //       <CircleSettings />
  //     </Protected>
  //   )
  // }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameSettings

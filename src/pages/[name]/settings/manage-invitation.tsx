import { EmptyLayout, Throw404 } from '~/components'
// import { Protected, useRoute } from '~/components'
// import CircleSettingsManageInvitation from '~/views/Circle/Settings/ManageInvitation'

const NameSettingsManageInvitation = () => {
  // const { isPathStartWith } = useRoute()
  //
  // if (isPathStartWith('/~', true)) {
  //   return (
  //     <Protected>
  //       <CircleSettingsManageInvitation />
  //     </Protected>
  //   )
  // }

  return (
    <EmptyLayout>
      <Throw404 />
    </EmptyLayout>
  )
}

export default NameSettingsManageInvitation

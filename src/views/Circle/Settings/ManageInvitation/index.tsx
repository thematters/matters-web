import { Head, Layout } from '~/components'

import CircleInvitationAddButton from './AddButton'
import Invitations from './Invitations'

const ManageInvitation = () => (
  <Layout.Main bgColor="grey-lighter">
    <Layout.Header
      left={<Layout.Header.BackButton />}
      right={
        <>
          <Layout.Header.Title id="manageCircleInvitation" />
          <CircleInvitationAddButton />
        </>
      }
    />

    <Head title={{ id: 'manageCircleInvitation' }} />

    <Invitations />
  </Layout.Main>
)

export default ManageInvitation

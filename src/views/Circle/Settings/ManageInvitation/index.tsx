import { Head, Layout } from '~/components'

import CircleInvitationAddButton from './AddButton'
import InvitesFeed from './Invites'

const ManageInvitation = () => (
  <Layout.Main>
    <Layout.Header
      right={
        <>
          <Layout.Header.Title id="manageCircleInvitation" />
          <CircleInvitationAddButton />
        </>
      }
    />

    <Head title={{ id: 'manageCircleInvitation' }} />

    <InvitesFeed />
  </Layout.Main>
)

export default ManageInvitation

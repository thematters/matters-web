import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Spacer, Tabs } from '~/components'

import AcceptedInvites from './Accepted'
import PendingInvites from './Pending'

type InvitesType = 'accepted' | 'pending'

const InvitesFeed: React.FC = () => {
  const [type, setType] = useState<InvitesType>('pending')

  const isPending = type === 'pending'
  const isAccepted = type === 'accepted'

  return (
    <>
      <Spacer size="xtight" />

      <Tabs sticky>
        <Tabs.Tab onClick={() => setType('pending')} selected={isPending}>
          <FormattedMessage
            defaultMessage="Pending"
            description="src/views/Circle/Settings/ManageInvitation/Invites/index.tsx"
          />
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setType('accepted')} selected={isAccepted}>
          <FormattedMessage
            defaultMessage="Accepted"
            description="src/views/Circle/Settings/ManageInvitation/Invites/index.tsx"
          />
        </Tabs.Tab>
      </Tabs>

      {isPending && <PendingInvites />}
      {isAccepted && <AcceptedInvites />}
    </>
  )
}

export default InvitesFeed

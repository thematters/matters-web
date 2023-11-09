import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { SegmentedTabs } from '~/components'

import AcceptedInvites from './Accepted'
import PendingInvites from './Pending'

type InvitesType = 'accepted' | 'pending'

const InvitesFeed: React.FC = () => {
  const [type, setType] = useState<InvitesType>('pending')

  const isPending = type === 'pending'
  const isAccepted = type === 'accepted'

  return (
    <>
      <SegmentedTabs sticky>
        <SegmentedTabs.Tab
          onClick={() => setType('pending')}
          selected={isPending}
        >
          <FormattedMessage
            defaultMessage="Pending"
            id="fWDtpq"
            description="src/views/Circle/Settings/ManageInvitation/Invites/index.tsx"
          />
        </SegmentedTabs.Tab>

        <SegmentedTabs.Tab
          onClick={() => setType('accepted')}
          selected={isAccepted}
        >
          <FormattedMessage
            defaultMessage="Accepted"
            id="JpS59y"
            description="src/views/Circle/Settings/ManageInvitation/Invites/index.tsx"
          />
        </SegmentedTabs.Tab>
      </SegmentedTabs>

      {isPending && <PendingInvites />}
      {isAccepted && <AcceptedInvites />}
    </>
  )
}

export default InvitesFeed

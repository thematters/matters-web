import { useState } from 'react'
import { useIntl } from 'react-intl'

import { SquareTabs } from '~/components'

import AcceptedInvites from './Accepted'
import PendingInvites from './Pending'

type InvitesType = 'accepted' | 'pending'

const InvitesFeed: React.FC = () => {
  const intl = useIntl()
  const [type, setType] = useState<InvitesType>('pending')

  const isPending = type === 'pending'
  const isAccepted = type === 'accepted'

  return (
    <>
      <SquareTabs sticky spacing="sm">
        <SquareTabs.Tab
          onClick={() => setType('pending')}
          selected={isPending}
          title={intl.formatMessage({
            defaultMessage: 'Pending',
            id: 'fWDtpq',
            description:
              'src/views/Circle/Settings/ManageInvitation/Invites/index.tsx',
          })}
        />

        <SquareTabs.Tab
          onClick={() => setType('accepted')}
          selected={isAccepted}
          title={intl.formatMessage({
            defaultMessage: 'Accepted',
            id: 'JpS59y',
            description:
              'src/views/Circle/Settings/ManageInvitation/Invites/index.tsx',
          })}
        />
      </SquareTabs>

      {isPending && <PendingInvites />}
      {isAccepted && <AcceptedInvites />}
    </>
  )
}

export default InvitesFeed

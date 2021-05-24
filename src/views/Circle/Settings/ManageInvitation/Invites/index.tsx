import { useState } from 'react'

import { Spacer, Tabs, Translate } from '~/components'

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
          <Translate zh_hant="邀請中" zh_hans="邀请中" en="Pending" />
        </Tabs.Tab>

        <Tabs.Tab onClick={() => setType('accepted')} selected={isAccepted}>
          <Translate zh_hant="已接受" zh_hans="已接受" en="Accepted" />
        </Tabs.Tab>
      </Tabs>

      {isPending && <PendingInvites />}
      {isAccepted && <AcceptedInvites />}
    </>
  )
}

export default InvitesFeed

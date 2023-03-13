import { useApolloClient, useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
import _some from 'lodash/some'
import { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { ADD_TOAST, STORAGE_KEY_ANNOUNCEMENT } from '~/common/enums'
import { storage } from '~/common/utils'
import { VisibleAnnouncementsQuery } from '~/gql/graphql'

import Carousel from './Carousel'
import { VISIBLE_ANNOUNCEMENTS } from './gql'

type BaseAnnouncementsProps = {
  hide: () => void
}

const BaseAnnouncements = ({ hide }: BaseAnnouncementsProps) => {
  const { data, error, loading } = useQuery<VisibleAnnouncementsQuery>(
    VISIBLE_ANNOUNCEMENTS,
    { variables: { input: { visible: true } } }
  )
  const [type, setType] = useState('all')

  if (loading || error) {
    return null
  }

  const allItems = _get(
    data,
    'official.announcements',
    []
  ) as VisibleAnnouncementsQuery['official']['announcements']

  if (!allItems || allItems.length === 0) {
    return null
  }

  // check controls
  const hasCommunity = _some(allItems, { type: 'community' })
  const hasProduct = _some(allItems, { type: 'product' })
  const hasSeminar = _some(allItems, { type: 'seminar' })

  let items = allItems

  if (type !== 'all') {
    items = items.filter((item) => item.type === type)
  }

  return (
    <Carousel
      type={type}
      setType={setType}
      items={items}
      hide={hide}
      hasCommunity={hasCommunity}
      hasProduct={hasProduct}
      hasSeminar={hasSeminar}
    />
  )
}

const Announcements = () => {
  const client = useApolloClient()

  const hide = () => {
    const now = Date.now()
    storage.set(STORAGE_KEY_ANNOUNCEMENT, now)
    client.writeData({
      id: 'ClientPreference:local',
      data: {
        announcement: now,
      },
    })

    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <FormattedMessage
              defaultMessage="You won't see announcements for 7 days"
              description="src/views/Home/Announcements/index.tsx"
            />
          ),
          buttonPlacement: 'center',
        },
      })
    )
  }

  return <BaseAnnouncements hide={hide} />
}

export default Announcements

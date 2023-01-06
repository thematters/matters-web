import { useQuery } from '@apollo/react-hooks'
import differenceInDays from 'date-fns/differenceInDays'
import _get from 'lodash/get'
import _some from 'lodash/some'
import { useState } from 'react'

import { ADD_TOAST, STORAGE_KEY_ANNOUNCEMENT } from '~/common/enums'
import { storage } from '~/common/utils'
import { QueryError, Spinner, Translate } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { ClientPreferenceQuery, VisibleAnnouncementsQuery } from '~/gql/graphql'

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

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <QueryError error={error} />
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
  const { data, client } = useQuery<ClientPreferenceQuery>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })

  // determine whether announcement should be shown or not
  const storedValue = storage.get(STORAGE_KEY_ANNOUNCEMENT)
  const storedTime =
    typeof storedValue === 'number'
      ? storedValue
      : data?.clientPreference?.announcement || 0
  const enabled = differenceInDays(Date.now(), storedTime) > 7

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
            <Translate
              zh_hant="暫時隱藏公告欄 7 天"
              zh_hans="暂时隐藏公告栏 7 天"
              en="You won't see announcements for 7 days"
            />
          ),
          buttonPlacement: 'center',
        },
      })
    )
  }

  if (!enabled) {
    return null
  }

  return <BaseAnnouncements hide={hide} />
}

export default Announcements

import { useApolloClient, useQuery } from '@apollo/react-hooks'
import _get from 'lodash/get'
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

  if (loading || error) {
    return null
  }

  const items = _get(
    data,
    'official.announcements',
    []
  ) as VisibleAnnouncementsQuery['official']['announcements']

  if (!items || items.length === 0) {
    return null
  }

  return <Carousel items={items} hide={hide} />
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

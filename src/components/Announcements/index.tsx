import { useQuery } from '@apollo/client'
import _get from 'lodash/get'
import { memo } from 'react'

import { useRoute } from '~/components'
import { VisibleAnnouncementsQuery } from '~/gql/graphql'

import Carousel from './Carousel'
import { VISIBLE_ANNOUNCEMENTS } from './gql'
import Placeholder from './Placeholder'

export const Announcements = memo(() => {
  const { isInPath, getQuery } = useRoute()
  const isInChannel = isInPath('CHANNEL')
  const shortHash = getQuery('shortHash')

  const { data, error, loading } = useQuery<VisibleAnnouncementsQuery>(
    VISIBLE_ANNOUNCEMENTS,
    {
      variables: {
        input: isInChannel
          ? { visible: true, channel: { shortHash } }
          : { visible: true },
      },
    }
  )

  if (error) {
    return null
  }

  if (loading) {
    return <Placeholder />
  }

  const items = _get(
    data,
    'official.announcements',
    []
  ) as VisibleAnnouncementsQuery['official']['announcements']

  if (!items || items.length === 0) {
    return null
  }

  return <Carousel items={items} />
})

Announcements.displayName = 'Announcements'

export default Announcements

import { useQuery } from '@apollo/client'
import _get from 'lodash/get'

import { VisibleAnnouncementsQuery } from '~/gql/graphql'

import Carousel from './Carousel'
import { VISIBLE_ANNOUNCEMENTS } from './gql'

const Announcements = () => {
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

  return <Carousel items={items} />
}

export default Announcements

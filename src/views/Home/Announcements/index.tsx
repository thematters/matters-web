import _get from 'lodash/get'
import _some from 'lodash/some'
import { useState } from 'react'

import { QueryError, Spinner, usePublicQuery } from '~/components'

import Carousel from './Carousel'
import { ANNOUNCEMENTS_PUBLIC } from './gql'

import {
  AnnouncementsPublic,
  AnnouncementsPublic_official_announcements as AnnouncementPublicType,
} from './__generated__/AnnouncementsPublic'

const Announcements = () => {
  const { data, error, loading } =
    usePublicQuery<AnnouncementsPublic>(ANNOUNCEMENTS_PUBLIC)

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
  ) as AnnouncementPublicType[]

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
      hasCommunity={hasCommunity}
      hasProduct={hasProduct}
      hasSeminar={hasSeminar}
    />
  )
}

export default Announcements

import { useContext, useEffect, useState } from 'react'

import {
  LanguageContext,
  Layout,
  Media,
  Spacer,
  useNativeEventListener,
  usePublicQuery,
  useRoute,
} from '~/components'
import { CHANNELS } from '~/components/GQL/queries/channels'
import { ChannelsQuery } from '~/gql/graphql'

import DropdownDialog from '../Channel/DropdownDialog'
import ChannelCarousel from '../Channel/Page/Carousel'
import CarouselPlaceHolder from '../Channel/Page/Carousel/PlaceHolder'
import SingleLine from '../Channel/SingleLine'
import MainFeed from './MainFeed'
import MainFeedPlaceholder from './MainFeed/Placeholder'
import { HomeFeedType } from './SortBy'

const HomeFeed = () => {
  const { getQuery } = useRoute()
  const qsType = getQuery('type') as HomeFeedType

  const [feedType] = useState<HomeFeedType>(qsType || 'hottest')

  // const changeFeed = (newType: HomeFeedType) => {
  //   setQuery('type', newType === 'hottest' ? '' : newType)
  //   setFeedType(newType)
  // }

  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showDropdown])

  const [showSingleLine, setShowSingleLine] = useState(false)

  useNativeEventListener('scroll', () => {
    if (window.scrollY > 85) {
      setShowSingleLine(true)
    } else {
      setShowSingleLine(false)
    }
  })

  const { lang } = useContext(LanguageContext)

  const { data: channelsData, loading: channelsLoading } =
    usePublicQuery<ChannelsQuery>(CHANNELS, {
      variables: { userLanguage: lang },
    })

  if (channelsLoading) {
    return (
      <>
        <Media lessThan="md">
          <CarouselPlaceHolder />
        </Media>
        <MainFeedPlaceholder />
      </>
    )
  }

  const channels = channelsData?.channels || []

  return (
    <>
      {/* <SortBy feedType={feedType} setFeedType={changeFeed} /> */}

      <Layout.Main.Spacing hasVertical={false}>
        <Media greaterThan="sm">
          <Spacer size="sp32" />
        </Media>
        <Media lessThan="lg">
          <ChannelCarousel channels={channels} />
          {showSingleLine && (
            <SingleLine channels={channels} toggleDropdown={toggleDropdown} />
          )}
          {showDropdown && (
            <DropdownDialog
              channels={channels}
              toggleDropdown={toggleDropdown}
            />
          )}
        </Media>
        <MainFeed feedSortType={feedType} />
      </Layout.Main.Spacing>
    </>
  )
}

export default HomeFeed

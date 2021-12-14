import { useQuery } from '@apollo/react-hooks'

import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'

import MainFeed from './MainFeed'
import SortBy, { SortByType } from './SortBy'

import { ClientPreference } from '~/components/GQL/queries/__generated__/ClientPreference'

const HomeFeed = () => {
  const { data, client } = useQuery<ClientPreference>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const { feedSortType } = data?.clientPreference || {
    feedSortType: 'hottest',
  }
  const setSortBy = (type: SortByType) => {
    if (client) {
      client.writeData({
        id: 'ClientPreference:local',
        data: { feedSortType: type },
      })
    }
  }

  return (
    <>
      <SortBy sortBy={feedSortType as SortByType} setSortBy={setSortBy} />
      <MainFeed feedSortType={feedSortType as SortByType} />
    </>
  )
}

export default HomeFeed

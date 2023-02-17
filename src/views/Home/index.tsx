import { useQuery } from '@apollo/react-hooks'
import differenceInDays from 'date-fns/differenceInDays'
import _get from 'lodash/get'
import _some from 'lodash/some'
import dynamic from 'next/dynamic'

import { STORAGE_KEY_ANNOUNCEMENT } from '~/common/enums'
import { storage } from '~/common/utils'
import { Layout, Spacer } from '~/components'
import CLIENT_PREFERENCE from '~/components/GQL/queries/clientPreference'
import { ClientPreferenceQuery } from '~/gql/graphql'

import Feed from './Feed'
import Sidebar from './Sidebar'

const DynamicAnnouncements = dynamic(() => import('./Announcements'), {
  ssr: true, // enable for first screen
})

const Home = () => {
  // determine whether announcement should be shown or not
  const { data } = useQuery<ClientPreferenceQuery>(CLIENT_PREFERENCE, {
    variables: { id: 'local' },
  })
  const storedValue =
    typeof window !== 'undefined' ? storage.get(STORAGE_KEY_ANNOUNCEMENT) : {}
  const storedTime =
    typeof storedValue === 'number'
      ? storedValue
      : data?.clientPreference?.announcement || 0
  const showAnnouncement = differenceInDays(Date.now(), storedTime) > 7

  return (
    <Layout.Main
      aside={
        <>
          <Sidebar.Tags />
          <Sidebar.Authors />
        </>
      }
    >
      <Layout.AuthHeader title="discover" />

      {showAnnouncement && <DynamicAnnouncements />}

      <Spacer size="xtight" />

      <Feed />
    </Layout.Main>
  )
}

export default Home

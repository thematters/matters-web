import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'

import {
  Layout,
  Spinner,
  useMutation,
  useResponsive,
  ViewerContext,
} from '~/components'
import viewerUnreadFollowing from '~/components/GQL/updates/viewerUnreadFollowing'
import { MeFollowQuery, ReadFollowingFeedMutation } from '~/gql/graphql'

import Feed from './Feed'
import PickAuthors from './PickAuthors'

const READ_FOLLOWING = gql`
  mutation ReadFollowingFeed {
    logRecord(input: { type: ReadFollowingFeed })
  }
`

const ME_FOLLOW = gql`
  query MeFollow {
    viewer {
      id
      following {
        users(input: { first: 0 }) {
          totalCount
        }
      }
    }
  }
`

const BaseFollow = () => {
  const viewer = useContext(ViewerContext)
  const [readFollowing] = useMutation<ReadFollowingFeedMutation>(
    READ_FOLLOWING,
    {
      update: viewerUnreadFollowing,
    }
  )
  const { data, loading } = useQuery<MeFollowQuery>(ME_FOLLOW)

  useEffect(() => {
    if (viewer.isAuthed) {
      readFollowing()
    }
  }, [])

  if (loading || !viewer.privateFetched) {
    return <Spinner />
  }

  if (!data) {
    return null
  }

  const followeeCount = data?.viewer?.following.users.totalCount || 0

  if (followeeCount < 5) {
    return <PickAuthors />
  } else {
    return <Feed />
  }
}

const Follow = () => {
  const isSmallUp = useResponsive('sm-up')

  return (
    <Layout.Main>
      <Layout.Header
        left={
          isSmallUp ? <Layout.Header.BackButton /> : <Layout.Header.MeButton />
        }
        right={<Layout.Header.Title id="following" />}
      />

      <BaseFollow />
    </Layout.Main>
  )
}

export default Follow

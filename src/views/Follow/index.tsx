import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'

import {
  Layout,
  Media,
  Spacer,
  Spinner,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateViewerUnreadFollowing } from '~/components/GQL'
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
      update: updateViewerUnreadFollowing,
    }
  )
  const { data, loading } = useQuery<MeFollowQuery>(ME_FOLLOW)

  useEffect(() => {
    if (viewer.isAuthed) {
      readFollowing()
    }
  }, [])

  if (loading) {
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
  return (
    <Layout.Main>
      <Media at="sm">
        <Layout.Header
          left={<Layout.Header.MeButton />}
          right={<Layout.Header.Title id="following" />}
        />
      </Media>
      <Media greaterThan="sm">
        <Spacer size="base" />
      </Media>

      <Layout.Main.Spacing hasVertical={false}>
        <BaseFollow />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Follow

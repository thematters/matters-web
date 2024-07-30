import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Layout,
  Media,
  Spacer,
  SpinnerBlock,
  useMutation,
  ViewerContext,
} from '~/components'
import { updateViewerUnreadFollowing } from '~/components/GQL'
import { MeFollowQuery, ReadFollowingFeedMutation } from '~/gql/graphql'

import Feed from './Feed'

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
    return <SpinnerBlock />
  }

  if (!data) {
    return null
  }

  return <Feed />
}

const Follow = () => {
  return (
    <Layout.Main>
      <Media at="sm">
        <Layout.Header
          left={
            <Layout.Header.Title>
              <FormattedMessage defaultMessage="Following" id="cPIKU2" />
            </Layout.Header.Title>
          }
        />
      </Media>
      <Media greaterThan="sm">
        <Spacer size="sp16" />
      </Media>

      <Layout.Main.Spacing hasVertical={false}>
        <BaseFollow />
      </Layout.Main.Spacing>
    </Layout.Main>
  )
}

export default Follow

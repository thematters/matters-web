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
import viewerUnreadFolloweeArticles from '~/components/GQL/updates/viewerUnreadFolloweeArticles'

import Feed from './Feed'
import PickAuthors from './PickAuthors'

import { MeFollow } from './__generated__/MeFollow'
import { ReadFolloweeArticles } from './__generated__/ReadFolloweeArticles'

const READ_FOLLOWEE_ARTICLES = gql`
  mutation ReadFolloweeArticles {
    logRecord(input: { type: ReadFolloweeArticles })
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
  const [readFolloweeArticles] = useMutation<ReadFolloweeArticles>(
    READ_FOLLOWEE_ARTICLES,
    {
      update: viewerUnreadFolloweeArticles,
    }
  )
  const { data, loading } = useQuery<MeFollow>(ME_FOLLOW)

  useEffect(() => {
    if (viewer.isAuthed) {
      readFolloweeArticles()
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
        right={<Layout.Header.Title id="follow" />}
      />

      <BaseFollow />
    </Layout.Main>
  )
}

export default Follow

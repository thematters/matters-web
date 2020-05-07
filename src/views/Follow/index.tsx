import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'

import { Layout, useResponsive, ViewerContext } from '~/components'
import { useMutation } from '~/components/GQL'
import viewerUnreadFolloweeArticles from '~/components/GQL/updates/viewerUnreadFolloweeArticles'

import FollowFeed from './FollowFeed'
import PickAuthors from './PickAuthors'

import { ReadFolloweeArticles } from './__generated__/ReadFolloweeArticles'

const READ_FOLLOWEE_ARTICLES = gql`
  mutation ReadFolloweeArticles {
    logRecord(input: { type: ReadFolloweeArticles })
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

  useEffect(() => {
    if (viewer.isAuthed) {
      readFolloweeArticles()
    }
  }, [])

  const followeeCount = viewer?.followees.totalCount || 0

  if (followeeCount < 5) {
    return <PickAuthors />
  } else {
    return <FollowFeed />
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

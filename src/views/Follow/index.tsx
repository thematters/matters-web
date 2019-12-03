import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useContext, useEffect } from 'react'

import { Footer, Spinner } from '~/components'
import { useMutation } from '~/components/GQL'
import viewerUnreadFolloweeArticles from '~/components/GQL/updates/viewerUnreadFolloweeArticles'
import { ViewerContext } from '~/components/Viewer'

import { MeFollow } from './__generated__/MeFollow'
import { ReadFolloweeArticles } from './__generated__/ReadFolloweeArticles'
import FollowFeed from './FollowFeed'
import PickAuthors from './PickAuthors'

const READ_FOLLOWEE_ARTICLES = gql`
  mutation ReadFolloweeArticles {
    logRecord(input: { type: ReadFolloweeArticles })
  }
`

const ME_FOLLOW = gql`
  query MeFollow {
    viewer {
      id
      ...FolloweeCountUser
    }
  }
  ${PickAuthors.fragments.user}
`

const Follow = () => {
  const viewer = useContext(ViewerContext)
  const [readFolloweeArticles] = useMutation<ReadFolloweeArticles>(
    READ_FOLLOWEE_ARTICLES,
    {
      update: viewerUnreadFolloweeArticles
    }
  )
  const { data, loading } = useQuery<MeFollow>(ME_FOLLOW)

  useEffect(() => {
    if (viewer.isAuthed) {
      readFolloweeArticles()
    }
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (!data) {
    return null
  }

  const followeeCount = data?.viewer?.followees.totalCount || 0

  if (followeeCount < 5) {
    return <PickAuthors viewer={data.viewer} />
  } else {
    return <FollowFeed />
  }
}

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Follow />
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Footer />
    </aside>
  </main>
)

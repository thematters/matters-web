import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import { Footer, Spinner } from '~/components'
import viewerUnreadFolloweeArticles from '~/components/GQL/updates/viewerUnreadFolloweeArticles'
import Throw404 from '~/components/Throw404'
import { ViewerContext } from '~/components/Viewer'

import { MeFollow } from './__generated__/MeFollow'
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
  const [readFolloweeArticles] = useMutation(READ_FOLLOWEE_ARTICLES, {
    update: viewerUnreadFolloweeArticles
  })
  const { data, loading } = useQuery<MeFollow>(ME_FOLLOW)

  if (loading) {
    return <Spinner />
  }

  if (!data) {
    return <Throw404 />
  }

  useEffect(() => {
    if (viewer.isAuthed) {
      readFolloweeArticles()
    }
  }, [])

  const followeeCount = _get(data, 'viewer.followees.totalCount', 0)

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

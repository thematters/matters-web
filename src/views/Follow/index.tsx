import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useContext, useEffect } from 'react'
import { QueryResult } from 'react-apollo'

import { Footer, Spinner } from '~/components'
import { Mutation, Query } from '~/components/GQL'
import viewerUnreadFolloweeArticles from '~/components/GQL/updates/viewerUnreadFolloweeArticles'
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

export default () => {
  const viewer = useContext(ViewerContext)

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Mutation
          mutation={READ_FOLLOWEE_ARTICLES}
          update={viewerUnreadFolloweeArticles}
        >
          {readFolloweeArticles => (
            <Query query={ME_FOLLOW}>
              {({ data, loading, error }: QueryResult & { data: MeFollow }) => {
                if (loading) {
                  return <Spinner />
                }

                useEffect(() => {
                  if (viewer.isAuthed) {
                    readFolloweeArticles()
                  }
                }, [])

                const followeeCount = _get(
                  data,
                  'viewer.followees.totalCount',
                  0
                )

                if (followeeCount < 5) {
                  return <PickAuthors viewer={data.viewer} />
                } else {
                  return <FollowFeed />
                }
              }}
            </Query>
          )}
        </Mutation>
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>
    </main>
  )
}

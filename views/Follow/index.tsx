import gql from 'graphql-tag'
import _get from 'lodash/get'
import { QueryResult } from 'react-apollo'

import { Footer, Spinner } from '~/components'
import { Query } from '~/components/GQL'

import { MeFollow } from './__generated__/MeFollow'
import FollowFeed from './FollowFeed'
import PickAuthors from './PickAuthors'

const ME_FOLLOW = gql`
  query MeFollow {
    viewer {
      id
      ...FolloweeCountUser
    }
  }
  ${PickAuthors.fragments.user}
`

export default () => (
  <main className="l-row">
    <article className="l-col-4 l-col-md-5 l-col-lg-8">
      <Query query={ME_FOLLOW}>
        {({ data, loading, error }: QueryResult & { data: MeFollow }) => {
          if (loading) {
            return <Spinner />
          }

          const followeeCount = _get(data, 'viewer.followees.totalCount', 0)

          if (followeeCount < 5) {
            return <PickAuthors viewer={data.viewer} />
          } else {
            return <FollowFeed />
          }
        }}
      </Query>
    </article>

    <aside className="l-col-4 l-col-md-3 l-col-lg-4">
      <Footer />
    </aside>
  </main>
)

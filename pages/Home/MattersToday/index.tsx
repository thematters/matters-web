import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest, Placeholder } from '~/components'

import { HomeToday } from './__generated__/HomeToday'
import styles from './styles.css'

const HOME_TODAY = gql`
  query HomeToday {
    viewer {
      id
      recommendation {
        today {
          ...TodayDigestArticle
        }
      }
    }
  }
  ${ArticleDigest.Feature.fragments.today}
`

export default () => (
  <>
    <Query query={HOME_TODAY}>
      {({ data, loading, error }: QueryResult & { data: HomeToday }) => {
        if (loading) {
          return <Placeholder.Sidebar />
        }

        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        return (
          <>
            <ArticleDigest.Feature article={data.viewer.recommendation.today} />
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)

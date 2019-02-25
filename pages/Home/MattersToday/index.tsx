import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest, Error, Placeholder } from '~/components'

import { HomeToday } from './__generated__/HomeToday'
import styles from './styles.css'

const HOME_TODAY = gql`
  query HomeToday(
    $hasArticleDigestActionAuthor: Boolean = true
    $hasArticleDigestActionDateTime: Boolean = true
  ) {
    viewer {
      id
      recommendation {
        today {
          ...TodayDigestArticle
        }
      }
    }
  }
  ${ArticleDigest.Feature.fragments.article}
`

export default () => (
  <>
    <Query query={HOME_TODAY}>
      {({ data, loading, error }: QueryResult & { data: HomeToday }) => {
        if (loading) {
          return <Placeholder.Sidebar />
        }

        if (error) {
          return <Error error={error} />
        }

        return (
          <>
            <ArticleDigest.Feature
              article={data.viewer.recommendation.today}
              hasAuthor
              hasDateTime
              hasBookmark
            />
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)

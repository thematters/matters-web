import gql from 'graphql-tag'
import { Query, QueryResult } from 'react-apollo'

import { ArticleDigest, Placeholder } from '~/components'

import { Today } from './__generated__/Today'
import styles from './styles.css'

const TODAY = gql`
  query Today {
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
    <Query query={TODAY}>
      {({ data, loading, error }: QueryResult & { data: Today }) => {
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

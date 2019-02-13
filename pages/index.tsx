import gql from 'graphql-tag'
import Link from 'next/link'
import { Query } from 'react-apollo'

import { toPath } from '~/common/utils'

const HOME_FEED = gql`
  query HomeFeed {
    viewer {
      id
      recommendation {
        hottest(input: { first: 10 }) {
          edges {
            node {
              title
              author {
                userName
                avatar
              }
              summary
            }
          }
        }
      }
    }
  }
`

const TEST_ARTICLE_DETAIL_PATHS = toPath({
  page: 'articleDetail',
  userName: 'matty',
  slug: '佳禾-繁體中文電子書短期內有機會出現-game-changer-嗎',
  mediaHash: 'Qme3jGoqJWSr9eNiwMxiNonFtEHLgPeANaHtJ2GoEXhWhT'
})

export default () => (
  <div>
    <p>Homepage</p>
    <Link
      href={TEST_ARTICLE_DETAIL_PATHS.fs}
      as={TEST_ARTICLE_DETAIL_PATHS.url}
    >
      <a>Goto: 《佳禾: 繁體中文電子書短期內有機會出現 game changer 嗎？》</a>
    </Link>
    <Query query={HOME_FEED}>
      {({ data }) => {
        console.log(data)
        return <div />
      }}
    </Query>
  </div>
)

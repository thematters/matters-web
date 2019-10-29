import gql from 'graphql-tag'
import { useQuery } from 'react-apollo'

import { Label, Placeholder, Translate } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import { SidebarIcymi } from './__generated__/SidebarIcymi'

export const SIDEBAR_ICYMI = gql`
  query SidebarIcymi(
    $hasArticleDigestActionAuthor: Boolean = false
    $hasArticleDigestActionBookmark: Boolean = false
    $hasArticleDigestCover: Boolean = true
    $hasArticleDigestActionTopicScore: Boolean = false
  ) {
    viewer {
      id
      recommendation {
        icymi(input: { first: 5 }) {
          edges {
            cursor
            node {
              ...SidebarDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Sidebar.fragments.article}
`

const ICYMI = () => {
  const { data, loading } = useQuery<SidebarIcymi>(SIDEBAR_ICYMI)
  const edges = data && data.viewer && data.viewer.recommendation.icymi.edges

  if (loading) {
    return <Placeholder.Sidebar />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <>
      <header>
        <Label>
          <Translate zh_hant="不要錯過" zh_hans="不要错过" />
        </Label>
      </header>

      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li
            key={cursor}
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.ICYMI,
                location: i
              })
            }
          >
            <ArticleDigest.Sidebar article={node} hasCover />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ICYMI

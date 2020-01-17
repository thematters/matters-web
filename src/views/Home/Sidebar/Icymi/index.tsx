import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { Placeholder } from '~/components'
import { ArticleDigest } from '~/components/ArticleDigest'

import { ANALYTICS_EVENTS, FEED_TYPE } from '~/common/enums'
import { analytics } from '~/common/utils'

import SidebarHeader from '../SidebarHeader'

import { SidebarIcymi } from './__generated__/SidebarIcymi'

export const SIDEBAR_ICYMI = gql`
  query SidebarIcymi {
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
  const edges = data?.viewer?.recommendation.icymi.edges

  if (loading) {
    return <Placeholder.Sidebar />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section>
      <SidebarHeader type="icymi" />

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
    </section>
  )
}

export default ICYMI

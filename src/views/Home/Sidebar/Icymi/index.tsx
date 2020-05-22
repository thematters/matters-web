import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ArticleDigestSidebar, List, Spinner } from '~/components'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'

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
              ...ArticleDigestSidebarArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigestSidebar.fragments.article}
`

const ICYMI = () => {
  const { data, loading } = useQuery<SidebarIcymi>(SIDEBAR_ICYMI)
  const edges = data?.viewer?.recommendation.icymi.edges

  if (loading) {
    return <Spinner />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section>
      <SectionHeader type="icymi" />

      <List spacing={['loose', 0]} hasBorder={false}>
        {edges.map(({ node, cursor }, i) => (
          <List.Item key={cursor}>
            <ArticleDigestSidebar
              article={node}
              titleTextSize="sm"
              hasCover
              onClick={() =>
                analytics.trackEvent('click_feed', {
                  type: 'icymi',
                  styleType: 'small_cover',
                  contentType: 'article',
                  location: i,
                })
              }
            />
          </List.Item>
        ))}
      </List>
    </section>
  )
}

export default ICYMI

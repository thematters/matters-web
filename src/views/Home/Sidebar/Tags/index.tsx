import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

import { analytics } from '~/common/utils'
import {
  ArticleTag,
  List,
  QueryError,
  SpinnerBlock,
  TagDigest,
  usePublicQuery,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { LastFetchRandomQuery, SidebarTagsPublicQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import styles from './styles.module.css'

const SIDEBAR_TAGS = gql`
  query SidebarTagsPublic(
    $random: random_Int_min_0_max_49
    $first: first_Int_min_0
  ) {
    viewer @connection(key: "viewerSidebarTags") {
      id
      recommendation {
        tags(input: { first: $first, filter: { random: $random } }) {
          totalCount
          edges {
            cursor
            node {
              id
              ...TagDigestSidebarTag
            }
          }
        }
      }
    }
  }
  ${TagDigest.Sidebar.fragments.tag}
`

const Tags = () => {
  const { data: lastFetchRandom } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.sidebarTags // last Random
  const perPage = 6
  const { data, loading, error } = usePublicQuery<SidebarTagsPublicQuery>(
    SIDEBAR_TAGS,
    { variables: { random: lastRandom || 0, first: perPage } }
  )
  const edges = data?.viewer?.recommendation.tags.edges

  if (error) {
    return <QueryError error={error} />
  }

  // hide the tag list if we don't get a result from the response
  if (!loading && (!edges || edges.length <= 0)) {
    return null
  }

  return (
    <section className={styles.container}>
      <SectionHeader type="tags" viewAll={true} />

      {loading && <SpinnerBlock />}

      {!loading && (
        <List hasBorder={false} className={styles.list}>
          {edges &&
            edges.map(({ node, cursor }, i) => (
              <List.Item key={node.id}>
                <ArticleTag
                  tag={node}
                  canClamp
                  onClick={() =>
                    analytics.trackEvent('click_feed', {
                      type: 'tags',
                      contentType: 'tag',
                      location: i,
                      id: node.id,
                    })
                  }
                />
              </List.Item>
            ))}
        </List>
      )}
    </section>
  )
}

export default Tags

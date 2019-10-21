import gql from 'graphql-tag'

import { Label, Spinner, Tag, Translate } from '~/components'
import { useQuery } from '~/components/GQL'

import { ANALYTICS_EVENTS, FEED_TYPE, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import ViewAllLink from '../ViewAllLink'
import { SidebarTags } from './__generated__/SidebarTags'
import styles from './styles.css'

const SIDEBAR_TAGS = gql`
  query SidebarTags {
    viewer {
      id
      recommendation {
        tags(input: { first: 8 }) {
          edges {
            cursor
            node {
              ...DigestTag
            }
          }
        }
      }
    }
  }
  ${Tag.fragments.tag}
`

export default () => {
  const { data, loading } = useQuery<SidebarTags>(SIDEBAR_TAGS)
  const edges = data && data.viewer && data.viewer.recommendation.tags.edges

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <>
      <header>
        <Label>
          <Translate zh_hant={TEXT.zh_hant.tag} zh_hans={TEXT.zh_hans.tag} />
        </Label>
        <ViewAllLink type="tags" />
      </header>

      {loading && <Spinner />}

      <ul>
        {edges.map(({ node, cursor }, i) => (
          <li
            key={cursor}
            onClick={() =>
              analytics.trackEvent(ANALYTICS_EVENTS.CLICK_FEED, {
                type: FEED_TYPE.TAGS,
                location: i
              })
            }
          >
            <Tag tag={node} size="small" type="count-fixed" />
          </li>
        ))}
      </ul>

      <style jsx>{styles}</style>
    </>
  )
}

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import {
  Button,
  IconReload,
  List,
  Spinner,
  TextIcon,
  Translate,
  UserDigest,
} from '~/components'
import { QueryError } from '~/components/GQL'

import { analytics } from '~/common/utils'

import SectionHeader from '../../SectionHeader'

import { SidebarAuthors } from './__generated__/SidebarAuthors'

const SIDEBAR_AUTHORS = gql`
  query SidebarAuthors {
    viewer {
      id
      recommendation {
        authors(
          input: { first: 5, filter: { random: true, followed: false } }
        ) {
          edges {
            cursor
            node {
              ...UserDigestRichUser
            }
          }
        }
      }
    }
  }
  ${UserDigest.Rich.fragments.user}
`

const Authors = () => {
  const { data, loading, error, refetch } = useQuery<SidebarAuthors>(
    SIDEBAR_AUTHORS,
    { notifyOnNetworkStatusChange: true }
  )
  const edges = data?.viewer?.recommendation.authors.edges

  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <section>
      <SectionHeader
        type="authors"
        rightButton={
          <Button
            size={[null, '1.25rem']}
            spacing={[0, 'xtight']}
            bgActiveColor="grey-lighter"
            onClick={() => refetch()}
          >
            <TextIcon
              icon={<IconReload size="xs" />}
              color="grey-dark"
              size="xs"
              weight="md"
            >
              <Translate id="shuffle" />
            </TextIcon>
          </Button>
        }
      />

      {loading && <Spinner />}

      {!loading && (
        <List hasBorder={false}>
          {edges.map(({ node, cursor }, i) => (
            <List.Item key={cursor}>
              <UserDigest.Rich
                user={node}
                spacing={['tight', 0]}
                bgColor="none"
                onClick={() =>
                  analytics.trackEvent('click_feed', {
                    type: 'authors',
                    contentType: 'user',
                    styleType: 'card',
                    location: i,
                  })
                }
                hasState={false}
              />
            </List.Item>
          ))}
        </List>
      )}
    </section>
  )
}

export default Authors

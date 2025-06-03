import classNames from 'classnames'
import _chunk from 'lodash/chunk'
import { FormattedMessage } from 'react-intl'

import { analytics } from '~/common/utils'
import { List, Slides, usePublicQuery, UserDigest } from '~/components'
import { TagDetailRecommendedAuthorsQuery } from '~/gql/graphql'

import { RECOMMENDED_AUTHORS } from './gql'
import styles from './styles.module.css'

interface RecommendedAuthorsProps {
  tagId: string
  inSidebar?: boolean
}

const RecommendedAuthorsHeader = () => {
  return (
    <section className={styles.header}>
      <FormattedMessage
        defaultMessage="Tag active authors"
        id="IUS82d"
        description="src/views/TagDetail/RecommendedAuthors/index.tsx"
      />
    </section>
  )
}

const RecommendedAuthors: React.FC<RecommendedAuthorsProps> = ({
  tagId,
  inSidebar,
}) => {
  const perColumn = 3
  const { data } = usePublicQuery<TagDetailRecommendedAuthorsQuery>(
    RECOMMENDED_AUTHORS,
    {
      variables: { id: tagId },
    }
  )

  const { edges } =
    (data?.node?.__typename === 'Tag' && data.node.recommendedAuthors) || {}

  const trackRecommendedAuthors = (i: number, id: string) => () =>
    analytics.trackEvent('click_feed', {
      type: 'tag_detail_recommended_authors',
      contentType: 'user',
      location: i,
      id,
    })

  if (!edges || edges.length <= 0) {
    return null
  }

  const recommendedAuthorsClasses = classNames({
    [styles.recommendedAuthors]: true,
    [styles.inSidebar]: inSidebar,
  })

  if (inSidebar) {
    return (
      <section className={recommendedAuthorsClasses}>
        <RecommendedAuthorsHeader />
        <section className={styles.users}>
          <List hasBorder={false}>
            {edges.map(({ node }, i) => (
              <List.Item key={node.id}>
                <UserDigest.Rich
                  user={node}
                  spacing={[0, 0]}
                  bgColor="none"
                  onClick={() => trackRecommendedAuthors(i, node.id)}
                  hasFollow={false}
                  hasState={false}
                />
              </List.Item>
            ))}
          </List>
        </section>
      </section>
    )
  }

  return (
    <section className={recommendedAuthorsClasses}>
      <Slides header={<RecommendedAuthorsHeader />}>
        {_chunk(edges, perColumn).map((chunks, i) => (
          <Slides.Item size="xs" key={i}>
            {chunks.map(({ node }) => (
              <UserDigest.Rich
                key={node.id}
                user={node}
                spacing={[12, 0]}
                bgColor="none"
                onClick={() => trackRecommendedAuthors(i, node.id)}
                hasFollow={false}
                hasState={false}
              />
            ))}
          </Slides.Item>
        ))}
      </Slides>
    </section>
  )
}

export default RecommendedAuthors

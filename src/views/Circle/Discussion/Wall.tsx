import { useIntl } from 'react-intl'

import IMAGE_CIRCLE_DISCUSSION_WALL from '@/public/static/images/circle-discussion-wall.svg?url'
import IMAGE_CIRCLE_DISCUSSION_WALL_SM from '@/public/static/images/circle-discussion-wall-sm.svg?url'
import { Translate } from '~/components'
import { DiscussionPublicQuery } from '~/gql/graphql'

import styles from './styles.module.css'

type WallProps = {
  circle: NonNullable<DiscussionPublicQuery['circle']>
}

const Wall = ({ circle }: WallProps) => {
  const intl = useIntl()
  const discussionCount = circle.discussionCount || 0
  const discussionThreadCount = circle.discussionThreadCount || 0

  return (
    <section
      className={styles.wall}
      aria-label={intl.formatMessage({
        defaultMessage: 'Subscribe circle and chat together!',
        id: 'FuYW4i',
      })}
    >
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={IMAGE_CIRCLE_DISCUSSION_WALL}
        />

        <img src={IMAGE_CIRCLE_DISCUSSION_WALL_SM} alt="illustration" />
      </picture>

      <section className={styles.brief}>
        {discussionThreadCount > 0 && (
          <p>
            <Translate
              zh_hant={`聽說目前共累積 ${discussionThreadCount} 串討論，${discussionCount} 則迴響`}
              zh_hans={`听说目前共累积 ${discussionThreadCount} 串讨论，${discussionCount} 则回响`}
            />
          </p>
        )}
      </section>
    </section>
  )
}

export default Wall
